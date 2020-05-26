<template>
  <div class="CubeDesigner">
    <table class="table is-condensed is-bordered">
      <thead>
        <tr>
          <th :colspan="cube.dimensions.length">
            <div class="cell-content">
              <ButtonEdit title="Edit cube metadata" @click="editCube(cube)" />
              <span v-if="getLabel(cube)">{{ getLabel(cube) }}</span>
              <span v-else class="has-text-grey">Untitled Cube</span>
              <InputLanguage v-model="selectedLanguage" size="is-small" />
            </div>
          </th>
        </tr>
        <tr>
          <th v-for="dimension in cube.dimensions" :key="dimension.uri" :class="'scale-' + dimension.scaleOfMeasure" align>
            <div class="cell-content">
              <ButtonEdit @click="editDimension(dimension)" title="Edit dimension" />
              <span v-if="getLabel(dimension)">{{ getLabel(dimension) }}</span>
              <span v-else class="has-text-grey">Missing label</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in cube.data" :key="index">
          <td v-for="dimension in cube.dimensions" :key="dimension.uri" :class="'scale-' + dimension.scaleOfMeasure">
            <div class="cell-content">
              <b-button
                v-if="dimension.scaleOfMeasure === 'concept'"
                @click="editValue(row, dimension.uri)"
                title="Edit entity"
                :rounded="true"
                size="is-small"
                icon-left="pen"
                type="is-info"
              >
                {{ getValue(row, dimension).value }}
              </b-button>
              <span v-else class="value">
                {{ getValue(row, dimension).value }}
                <small v-if="getValue(row, dimension).unit" class="unit has-text-grey">
                  {{ getValue(row, dimension).unit }}
                </small>
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <SidePane :isOpen="showSidePane" :title="sidePanelTitle" @close="onCloseSidePane">
      <DesignerCubeForm v-if="edited && edited.type === 'cube'" :value="edited" />
      <DesignerDimensionForm v-else-if="edited && edited.type === 'dimension'" :value="edited" />
      <DesignerValueForm v-else-if="edited && edited.type === 'value'" :value="edited" />
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

thead .cell-content {
  justify-content: space-between;
}

tbody .cell-content {
  justify-content: flex-end;
}

.scale-concept .cell-content {
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
</style>

<script>
import ButtonEdit from '@/components/ButtonEdit.vue'
import SidePane from '@/components/SidePane.vue'
import DesignerCubeForm from '@/components/DesignerCubeForm.vue'
import DesignerDimensionForm from '@/components/DesignerDimensionForm.vue'
import DesignerValueForm from '@/components/DesignerValueForm.vue'
import InputLanguage from '@/components/InputLanguage.vue'

export default {
  name: 'Designer',
  components: {
    ButtonEdit,
    SidePane,
    DesignerCubeForm,
    DesignerDimensionForm,
    DesignerValueForm,
    InputLanguage
  },
  props: ['cube'],

  data () {
    return {
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

    editValue (row, property) {
      this.edited = { type: 'value', row, property }
    },

    onCloseSidePane () {
      this.edited = null
    },

    getValue (row, dimension) {
      return row[dimension.uri]
    },

    getLabel (resource) {
      const label = resource.label.find(({ language }) => language === this.selectedLanguage)
      return label ? label.value : ''
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

      if (this.edited.type === 'value') {
        const value = this.edited.row[this.edited.property]
        return `Edit value ${value.value}`
      }

      return ''
    }
  }
}
</script>
