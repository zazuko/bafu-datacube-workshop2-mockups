<template>
  <div class="Mapper">
    <div class="mapping">
      <header class="columns">
        <div class="column">
          <div class="level">
            <div class="level-left">
              <h2 class="title is-6">Input sources</h2>
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
      </header>

      <div class="source-mapping columns" v-for="source in sources" :key="source.uri">
        <div class="column">
          <div class="source panel">
            <div class="panel-heading">
              <div class="level">
                <div class="level-left">
                  {{ source.label }}
                </div>
                <div class="level-right">
                  <b-button :disabled="selectedColumns.length === 0">
                    Create table from selected columns
                  </b-button>
                </div>
              </div>
            </div>
            <div v-for="column in source.columns" :key="column.uri" class="panel-block">
              <b-checkbox v-model="selectedColumns" :native-value="column.uri">
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
                  :label="attribute.table.label + ' -> ' + attribute.label"
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
                  {{ table.label }}
                </div>
                <div class="level-right actions">
                  <ButtonEdit title="Edit table" />
                  <ButtonDelete title="Delete table" />
                </div>
              </div>
            </div>
            <div v-for="attribute in table.attributes" :key="attribute.uri" class="panel-block">
              {{ attribute.label }}
              <div class="actions">
                <ButtonEdit title="Edit attribute" />
                <ButtonDelete title="Delete attribute" />
              </div>
            </div>
            <div class="panel-block">
              <b-button icon-left="plus" />
            </div>
          </div>
          <b-field>
            <b-button icon-left="plus">
              Add table
            </b-button>
          </b-field>
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
  </div>
</template>

<style scoped>
.mapping {
  padding: 0 1rem;
  max-width: 110rem;
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
  position: absolute;
  bottom: 0;
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
import CubeDesigner from '@/components/CubeDesigner.vue'
import ButtonEdit from '@/components/ButtonEdit.vue'
import ButtonDelete from '@/components/ButtonDelete.vue'
import data from '@/data'

export default {
  name: 'Mapper',
  components: { CubeDesigner, ButtonEdit, ButtonDelete },

  data () {
    return {
      sources: data.sources,
      tables: data.tables,
      cube: data.cube,

      columnFilter: 'all',
      selectedColumns: [],
      showPreview: false,
    }
  },

  methods: {
    togglePreview () {
      this.showPreview = !this.showPreview
    },

    getSourceTables (source) {
      return this.tables.filter((table) => table.source === source.uri)
    },

    getMappedAttributes (source, column) {
      return this.tables.reduce((acc, table) => {
        return acc.concat(table.attributes
          .map((attribute) => ({ ...attribute, table }))
          .filter((attribute) => {
            return table.source === source.uri && attribute.column === column.uri
          }))
      }, [])
    }
  }
}
</script>
