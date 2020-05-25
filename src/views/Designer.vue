<template>
  <div class="Designer">
    <table class="table is-condensed is-bordered">
      <thead>
        <tr>
          <th :colspan="columns.length">
            <div class="cell-content">
              <ButtonEdit title="Edit cube metadata" @click="editCube(cube)" />
              {{ cube.label }}
              <b-select v-model="selectedLanguage">
                <option v-for="language in languages" :key="language.code" :value="language.code">
                  {{ language.label }}
                </option>
              </b-select>
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
              <ButtonEdit @click="editValue(row, column.uri)" title="Edit value" />
              <span class="value">
                <small v-if="getValue(row, column).unit" class="unit has-text-grey">
                  {{ getValue(row, column).unit }}
                </small>
                {{ getValue(row, column).value }}
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
  justify-content: space-between;
  align-items: center;

  padding: 0.2rem;
}

.scale-concept .cell-content {
  justify-content: flex-start;
}

.scale-concept .value {
  border: 1px solid rgb(55, 55, 150);
  border-radius: 15px;
  padding: 0 5px;
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

export default {
  name: 'Designer',
  components: {
    ButtonEdit,
    SidePane,
    DesignerCubeForm,
    DesignerDimensionForm,
    DesignerValueForm
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
