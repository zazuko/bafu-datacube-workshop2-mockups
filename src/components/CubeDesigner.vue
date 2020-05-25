<template>
  <div class="CubeDesigner">
    <table class="table is-condensed is-bordered">
      <thead>
        <tr>
          <th :colspan="columns.length">
            <div class="cell-content">
              <ButtonEdit title="Edit cube metadata" @click="editCube(cube)" />
              {{ cube.label }}
              <InputLanguage v-model="selectedLanguage" size="is-small" />
            </div>
          </th>
        </tr>
        <tr>
          <th v-for="column in columns" :key="column.uri" :class="'scale-' + column.scaleOfMeasure" align>
            <div class="cell-content">
              <ButtonEdit @click="editDimension(column)" title="Edit dimension" />
              {{ column.label }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index">
          <td v-for="column in columns" :key="column.uri" :class="'scale-' + column.scaleOfMeasure">
            <div class="cell-content">
              <b-button
                v-if="column.scaleOfMeasure === 'concept'"
                @click="editValue(row, column.uri)"
                title="Edit entity"
                :rounded="true"
                size="is-small"
                icon-left="pen"
                type="is-info"
              >
                {{ getValue(row, column).value }}
              </b-button>
              <span v-else class="value">
                {{ getValue(row, column).value }}
                <small v-if="getValue(row, column).unit" class="unit has-text-grey">
                  {{ getValue(row, column).unit }}
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

  data () {
    return {
      cube: {
        type: 'cube',
        label: 'Quality of air in Switzerland'
      },
      columns: [
        { type: 'dimension', label: 'Station', uri: 'station', scaleOfMeasure: 'concept' },
        { type: 'dimension', label: 'Year', uri: 'year', scaleOfMeasure: 'temporal' },
        { type: 'dimension', label: 'Measurement', uri: 'measurement', scaleOfMeasure: 'continuous' },
      ],
      data: [
        {
          station: { value: 'Basel' },
          year: { value: '2001' },
          measurement: { value: '12.1', unit: 'µg/m³' },
        },
        {
          station: { value: 'Basel' },
          year: { value: '2002' },
          measurement: { value: '24.2', unit: 'µg/m³' },
        },
        {
          station: { value: 'Basel' },
          year: { value: '2003' },
          measurement: { value: '5.1', unit: 'µg/m³' },
        }
      ],
      languages: [
        { label: 'English', code: 'en' },
        { label: 'French', code: 'fr' },
        { label: 'German', code: 'de' },
      ],

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

    getValue (row, column) {
      return row[column.uri]
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
        return `Edit dimension ${this.edited.label}`
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
