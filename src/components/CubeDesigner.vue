<template>
  <div class="CubeDesigner">
    <table class="table is-condensed is-bordered">
      <thead>
        <tr class="cube-row">
          <th :colspan="cube.dimensions.length">
            <div class="cell-content">
              <ButtonEdit title="Edit cube metadata" @click="editCube(cube)" />
              <ResourceLabel :resource="cube" :language="selectedLanguage" missing="Untitled Cube" />
              <InputLanguage v-model="selectedLanguage" size="is-small" />
            </div>
          </th>
        </tr>
        <tr class="dimensions-row">
          <th v-for="dimension in cube.dimensions" :key="dimension.uri" :class="'scale-' + dimension.scaleOfMeasure" align>
            <div class="cell-content">
              <ResourceLabel :resource="dimension" :language="selectedLanguage" />
              <div class="dimension-infos">
                <b-tooltip v-if="dimension.scaleOfMeasure !== 'none'" :label="dimension.scaleOfMeasure" type="is-light" :delay="200" size="is-small">
                  <b-icon :icon="getScaleOfMeasure(dimension.scaleOfMeasure).icon" />
                </b-tooltip>
                <b-tooltip v-if="getDescription(dimension)" :label="getDescription(dimension)" type="is-light" :delay="200" size="is-small">
                  <b-icon icon="comment-alt" pack="far" />
                </b-tooltip>
                <b-tooltip v-if="dimension.isManaged" label="Linked to managed dimension" type="is-light" :delay="200" size="is-small">
                  <b-button icon-left="external-link-square-alt" size="is-small" type="is-white is-icon" @click="editMapping(dimension.mappedTo)" />
                </b-tooltip>
              </div>
            </div>
            <div class="dimension-actions">
              <ButtonEdit @click="editDimension(dimension)" title="Edit dimension" />
              <b-dropdown>
                <b-tooltip slot="trigger" label="Filter dimension" type="is-light" :delay="200" size="is-small">
                  <b-button type="is-white" class="has-text-grey" size="is-small" icon-left="filter">
                  </b-button>
                </b-tooltip>
                <div class="dimension-filter">
                  <FiltersContinuous v-if="dimension.scaleOfMeasure === 'continuous'" :dimension="dimension" />
                  <FiltersTemporal v-else-if="dimension.scaleOfMeasure === 'temporal'" :dimension="dimension" />
                  <FiltersNominal v-else-if="dimension.scaleOfMeasure === 'nominal'" :dimension="dimension" />
                  <p v-else>Cannot filter this type of dimension</p>
                </div>
              </b-dropdown>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in cube.data" :key="index">
          <td v-for="dimension in cube.dimensions" :key="dimension.uri" :class="'scale-' + dimension.scaleOfMeasure">
            <div class="cell-content">
              <DesignerDimensionValue
                :resource="row"
                :dimension="dimension"
                :language="selectedLanguage"
                :cube="cube"
                @editResource="editResource"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <SidePane :isOpen="showSidePane" :title="sidePanelTitle" @close="onCloseSidePane">
      <DesignerCubeForm v-if="edited && edited.type === 'cube'" :value="edited" />
      <DesignerDimensionForm v-else-if="edited && edited.type === 'dimension'" :value="edited" @editMapping="editMapping" />
      <DesignerResourceForm v-else-if="edited && edited.type === 'resource'" :value="edited" />
      <DesignerMappingForm v-else-if="edited && edited.type === 'mapping'" :value="edited" :cube="cube" />
      <p v-else>Unsupported type</p>
    </SidePane>
  </div>
</template>

<style scoped>
.table {
  min-width: 40rem;
}

tr > td,
tr > th {
  padding: 0;
}

.cell-content {
  display: flex;
  align-items: center;

  padding: 0.2rem;
}

.cube-row th {
  padding: 0.3rem 0;
}

.cube-row .cell-content {
  justify-content: space-between;
}

.dimensions-row .cell-content {
  justify-content: flex-start;
}

tbody .cell-content {
  justify-content: flex-end;
}

.scale-none .cell-content {
  justify-content: flex-start;
}

.scale-nominal .cell-content {
  justify-content: flex-start;
}

.scale-continuous .unit {
  margin-right: 0.2rem;
}

.scale-continuous .value {
  font-variant-numeric: lining-nums tabular-nums;
}

.scale-temporal .value {
  font-variant-numeric: lining-nums tabular-nums;
}

.scale-temporal .value {
  text-decoration: underline;
  text-decoration-color: orange;
}

.dimension-infos {
  display: flex;
  align-items: center;
  /* justify-content: flex-end; */
}

.dimension-infos .icon {
  height: 1rem;
  width: 1rem;
  font-size: 0.5rem;
}

.dimension-infos .button.is-icon {
  padding: 0;
}

.dimension-actions {
  display: flex;
  justify-content: flex-start;
}

.dimension-filter {
  padding: 0 1rem;
}
</style>

<script>
import ButtonEdit from '@/components/ButtonEdit.vue'
import SidePane from '@/components/SidePane.vue'
import DesignerCubeForm from '@/components/DesignerCubeForm.vue'
import DesignerDimensionForm from '@/components/DesignerDimensionForm.vue'
import DesignerResourceForm from '@/components/DesignerResourceForm.vue'
import DesignerMappingForm from '@/components/DesignerMappingForm.vue'
import InputLanguage from '@/components/InputLanguage.vue'
import FiltersContinuous from '@/components/FiltersContinuous.vue'
import FiltersTemporal from '@/components/FiltersTemporal.vue'
import FiltersNominal from '@/components/FiltersNominal.vue'
import ResourceLabel from '@/components/ResourceLabel.vue'
import DesignerDimensionValue from '@/components/DesignerDimensionValue.vue'
import data from '@/data'

export default {
  name: 'Designer',
  components: {
    ButtonEdit,
    SidePane,
    DesignerCubeForm,
    DesignerDimensionForm,
    DesignerResourceForm,
    DesignerMappingForm,
    DesignerDimensionValue,
    InputLanguage,
    FiltersContinuous,
    FiltersTemporal,
    FiltersNominal,
    ResourceLabel,
  },
  props: ['cube'],

  data () {
    return {
      scaleOfMeasures: data.scaleOfMeasures,
      managedDimensions: data.managedDimensions,

      selectedLanguage: 'en',
      edited: null,
    }
  },

  methods: {
    editCube (cube) {
      this.edited = cube
    },

    editDimension (dimension) {
      this.edited = dimension
    },

    editResource (resource) {
      this.edited = resource
    },

    editMapping (mapping) {
      this.edited = mapping
    },

    onCloseSidePane () {
      this.edited = null
    },

    getLabel (resource) {
      const labels = resource.label || resource['rdfs:label']
      const label = labels.find(({ language }) => language === this.selectedLanguage)
      return label ? label.value : ''
    },

    getDescription (resource) {
      const description = (resource.description || []).find(({ language }) => language === this.selectedLanguage)
      return description ? description.value : ''
    },

    getScaleOfMeasure (uri) {
      return this.scaleOfMeasures.find((scale) => scale.uri === uri)
    }
  },

  computed: {
    showSidePane () {
      return !!this.edited
    },

    sidePanelTitle () {
      if (!this.edited) {
        return ''
      }

      if (this.edited.type === 'cube') {
        return 'Edit cube metadata'
      }

      if (this.edited.type === 'dimension') {
        return `Edit dimension ${this.getLabel(this.edited)}`
      }

      if (this.edited.type === 'resource') {
        return `View resource ${this.getLabel(this.edited)}`
      }

      if (this.edited.type === 'mapping') {
        return 'Edit managed dimension mapping'
      }

      return ''
    }
  }
}
</script>
