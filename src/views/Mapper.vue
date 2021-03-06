<template>
  <div class="Mapper">
    <div class="mapping page">
      <h2 class="title is-4">
        <ResourceLabel :resource="cube" :language="selectedLanguage" />
      </h2>

      <div class="columns">
        <div class="column">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <h2 class="title is-6">Input CSV files</h2>
                <b-tooltip label="Adjust sources settings" type="is-light" :delay="200" size="is-small">
                  <b-button tag="router-link" :to="{ name: 'SourcesSettings' }" type="is-white" class="has-text-grey" size="is-small" icon-left="cog" />
                </b-tooltip>
              </div>
            </div>
            <div class="level-right">
              <p class="level-item">Filter columns:</p>
              <b-field class="level-item">
                <b-radio-button v-model="columnFilter" native-value="all" size="is-small">
                  All
                </b-radio-button>
                <b-radio-button v-model="columnFilter" native-value="mapped" size="is-small">
                  Mapped
                </b-radio-button>
                <b-radio-button v-model="columnFilter" native-value="not-mapped" size="is-small">
                  Not mapped
                </b-radio-button>
              </b-field>
            </div>
          </div>
        </div>
        <div class="column is-1">
          <p class="has-text-centered"><b-icon icon="arrow-right" size="is-small" /></p>
        </div>
        <div class="column">
          <h2 class="title is-6">Output tables</h2>
        </div>
      </div>

      <div class="mapping-sources">
        <div class="source-mapping columns" v-for="(source, sourceIndex) in cube.sources" :key="source.uri">
          <div class="column">
            <div class="source panel">
              <div class="panel-heading">
                <div class="level">
                  <div class="level-left">
                    {{ source.label }}
                  </div>
                  <div class="level-right">
                    <b-button :disabled="selectedColumns[source.uri].length === 0">
                      Create table from selected columns
                    </b-button>
                  </div>
                </div>
              </div>
              <div v-for="column in source.columns" :key="column.uri" class="panel-block">
                <b-checkbox v-model="selectedColumns[source.uri]" :native-value="column.uri">
                  {{ column.uri }}
                  <span class="has-text-grey">
                    ({{ column.data.join(', ') }})
                  </span>
                </b-checkbox>
                <div class="column-mapped-attributes">
                  <b-tooltip
                    v-for="attribute in getMappedAttributes(source, column)"
                    :key="attribute.uri"
                    class="column-mapped-attribute"
                    :style="{ 'background-color': attribute.table.color }"
                    :label="getLabel(attribute.table) + ' -> ' + getLabel(attribute)"
                    type="is-light"
                    :delay="200"
                    size="is-small"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="column is-1"></div>
          <div class="column">
            <div v-for="table in getSourceTables(source)" :key="table.uri" class="table panel">
              <div class="panel-heading" :style="{ 'background-color': table.color }">
                <div class="level">
                  <div class="level-left">
                    <ResourceLabel :resource="table" :language="selectedLanguage" class="level-item" />
                    <b-icon v-if="table.isObservation" icon="eye" size="is-small" class="level-item" title="Observation table" />
                  </div>
                  <div class="level-right actions">
                    <ButtonEdit title="Edit table" @click="editTable(table)" />
                    <ButtonDelete title="Delete table" />
                  </div>
                </div>
              </div>
              <div class="panel-block">
                <span>Identifier template: <code>{{ table.identifierTemplate }}</code></span>
              </div>
              <div v-for="attribute in table.attributes" :key="attribute.uri" class="panel-block">
                <span v-if="attribute.linksTo" class="tag is-rounded" :style="{ 'background-color': getTable(attribute.linksTo).color }">
                  <ResourceLabel :resource="attribute" :language="selectedLanguage" />
                </span>
                <span v-else>
                  <ResourceLabel :resource="attribute" :language="selectedLanguage" />
                </span>
                <div class="actions">
                  <ButtonEdit title="Edit property" @click="editAttribute(attribute)" />
                  <ButtonDelete title="Delete property" />
                </div>
              </div>
              <div class="panel-block">
                <Button icon="plus" title="Add property" @click="addAttribute(table)" />
              </div>
            </div>
            <div v-if="getSourceTables(source).length === 0 && sourceIndex === 0" class="content">
              <p>
                You haven't mapped any table yet.
              </p>
              <p>
                Step 1 is probably to define which columns of your CSV will be dimensions of your cube:
              </p>
              <ol>
                <li>Select columns that will be dimensions of your cube on the CSV file (left column)</li>
                <li>Click "Create table from selected columns"</li>
                <li>Select the type "Observation table" in the form. The Observation table represents the structure of your cube.</li>
                <li>After submitting the form, you should already be able to see a first version of your cube in the "Cube Preview" (bottom of the screen).</li>
              </ol>
              <hr />
            </div>
            <b-field>
              <b-button icon-left="plus">
                Create table from {{ source.label }}
              </b-button>
            </b-field>
          </div>
        </div>
      </div>
    </div>

    <div class="cube-preview" :class="{ 'is-collapsed': !showPreview }">
      <header class="cube-preview-header">
        <b-button
          :icon-left="showPreview ? 'chevron-down' : 'chevron-up'"
          type="is-primary"
          size="is-small"
          class="preview-collapse-button"
          @click="togglePreview"
        >
          {{ showPreview ? 'Hide' : 'Show' }}
          Cube preview
        </b-button>
      </header>
      <div class="cube-preview-content">
        <div class="section">
          <CubeDesigner :cube="cube" />
        </div>
      </div>
    </div>

    <SidePane :isOpen="showSidePane" :title="sidePanelTitle" @close="onCloseSidePane">
      <MapperTableForm v-if="edited && edited.type === 'table'" :value="edited" />
      <MapperAttributeForm v-else-if="edited && edited.type === 'attribute'" :value="edited" :cube="cube" />
      <p v-else>Unsupported type</p>
    </SidePane>
  </div>
</template>

<style scoped>
.Mapper {
  flex-grow: 1;
  overflow-y: hidden;

  display: flex;
  flex-direction: column;
}

.mapping {
  flex-grow: 1;
  overflow-y: hidden;
  /* padding: 0 1rem; */
  max-width: 100rem;

  display: flex;
  flex-direction: column;
}

.mapping-sources {
  overflow-y: auto;
  flex-grow: 1;
}

.source-mapping:not(:last-child) {
  margin-bottom: 2rem;
}

.source-mapping .panel,
.source-mapping .panel .button {
  font-size: 0.8rem;
}

.source-mapping .panel .panel-block {
  display: flex;
  justify-content: space-between;
}

.cube-preview {
  width: 100%;
  background-color: white;
}

.cube-preview-header {
  display: flex;
  justify-content: center;
}

.cube-preview-header .preview-collapse-button {
  flex-grow: 1;
  border-radius: 0;
}

.cube-preview-content {
  height: 50vh;
  overflow-y: auto;
}

.is-collapsed .cube-preview-content {
  height: 0;
}

.actions > *:not(:last-child) {
  margin-right: 0.2rem;
}

.column-mapped-attribute {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.5rem;
}

.column-mapped-attribute:not(:last-child) {
  margin-right: 0.1rem;
}
</style>

<script>
import { nanoid } from 'nanoid'
import CubeDesigner from '@/components/CubeDesigner.vue'
import Button from '@/components/Button.vue'
import ButtonEdit from '@/components/ButtonEdit.vue'
import ButtonDelete from '@/components/ButtonDelete.vue'
import SidePane from '@/components/SidePane.vue'
import MapperTableForm from '@/components/MapperTableForm.vue'
import MapperAttributeForm from '@/components/MapperAttributeForm.vue'
import ResourceLabel from '@/components/ResourceLabel.vue'

export default {
  name: 'Mapper',
  components: {
    CubeDesigner,
    Button,
    ButtonEdit,
    ButtonDelete,
    MapperTableForm,
    MapperAttributeForm,
    SidePane,
    ResourceLabel,
  },

  data () {
    const cube = this.$parent.cube

    return {
      cube,

      selectedLanguage: 'en',
      columnFilter: 'all',
      selectedColumns: Object.fromEntries(cube.sources.map(({ uri }) => [uri, []])),
      showPreview: false,
      edited: null,
    }
  },

  methods: {
    togglePreview () {
      this.showPreview = !this.showPreview
    },

    getSourceTables (source) {
      return this.cube.tables.filter((table) => table.source === source.uri)
    },

    getMappedAttributes (source, column) {
      return this.cube.tables.reduce((acc, table) => {
        return acc.concat(table.attributes
          .map((attribute) => ({ ...attribute, table }))
          .filter((attribute) => {
            return table.source === source.uri && attribute.column === column.uri
          }))
      }, [])
    },

    getTable (uri) {
      return this.cube.tables.find((table) => table.uri === uri)
    },

    onCloseSidePane () {
      this.edited = null
    },

    editTable (table) {
      this.edited = table
    },

    editAttribute (attribute) {
      this.edited = attribute
    },

    addAttribute (table) {
      const attribute = { type: 'attribute', uri: nanoid(), label: [] }
      table.attributes.push(attribute)
      this.edited = attribute
    },

    getLabel (resource) {
      const label = resource.label.find(({ language }) => language === this.selectedLanguage)
      return label ? label.value : ''
    },
  },

  computed: {
    showSidePane () {
      return !!this.edited
    },

    sidePanelTitle () {
      if (!this.edited) {
        return ''
      }

      if (this.edited.type === 'table') {
        return `Edit resource ${this.getLabel(this.edited)}`
      }

      if (this.edited.type === 'attribute') {
        return `Edit property ${this.getLabel(this.edited)}`
      }

      return ''
    }
  }
}
</script>
