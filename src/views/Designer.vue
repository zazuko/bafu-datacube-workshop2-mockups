<template>
  <div class="Designer">
    <table class="table is-fullwidth is-condensed">
      <thead>
        <tr>
          <th :colspan="columns.length">
            <div class="level">
              <div class="level-left">
                {{ cube.label }}
                <ButtonEdit title="Edit cube metadata" />
              </div>
              <div class="level-right">
                <b-select v-model="selectedLanguage">
                  <option v-for="language in languages" :key="language.code" :value="language.code">
                    {{ language.label }}
                  </option>
                </b-select>
              </div>
            </div>
          </th>
        </tr>
        <tr>
          <th v-for="column in columns" :key="column.uri">
            {{ column.label }}
            <ButtonEdit @click="editDimension(column)" title="Edit dimension" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index">
          <td v-for="column in columns" :key="column.uri">
            {{ row[column.uri] }}
            <ButtonEdit @click="editValue(row, column.uri)" title="Edit value" />
          </td>
        </tr>
      </tbody>
    </table>

    <SidePane :isOpen="showSidePane" :title="sidePanelTitle" @close="onCloseSidePane">
      Hello
    </SidePane>
  </div>
</template>

<script>
import ButtonEdit from '@/components/ButtonEdit.vue'
import SidePane from '@/components/SidePane.vue'

export default {
  name: 'Designer',
  components: { ButtonEdit, SidePane },

  data () {
    return {
      cube: {
        label: 'Quality of air in Switzerland'
      },
      columns: [
        { label: 'Station', uri: 'station' },
        { label: 'Year', uri: 'year' },
        { label: 'Measurement', uri: 'measurement' }
      ],
      data: [
        { station: 'Basel', year: '2001', measurement: '2.1' },
        { station: 'Basel', year: '2002', measurement: '4.2' },
        { station: 'Basel', year: '2003', measurement: '5.1' }
      ],
      languages: [
        { label: 'English', code: 'en' },
        { label: 'French', code: 'fr' },
        { label: 'German', code: 'de' }
      ],

      selectedLanguage: 'en',
      editedDimension: null,
      editedValue: null
    }
  },

  methods: {
    editDimension (dimension) {
      this.editedDimension = dimension
      this.editedValue = null
    },

    editValue (row, property) {
      this.editedValue = { row, property }
      this.editedDimension = null
    },

    onCloseSidePane () {
      this.editedDimension = null
      this.editedValue = null
    }
  },

  computed: {
    showSidePane () {
      return this.editedDimension || this.editedValue
    },

    sidePanelTitle () {
      if (this.editedDimension) {
        return `Edit dimension ${this.editedDimension.label}`
      }

      if (this.editedValue) {
        const value = this.editedValue.row[this.editedValue.property]
        return `Edit value ${value}`
      }

      return ''
    }
  }
}
</script>
