<template>
  <form class="form">
    <b-field label="Managed dimension">
      <b-select v-model="value.managedDimension">
        <option v-for="dimension in managedDimensions" :key="dimension.uri" :value="dimension.uri">
          <ResourceLabel :resource="dimension" :language="language" />
        </option>
      </b-select>
    </b-field>

    <b-field label="Mapping">
      <table class="table">
        <thead>
          <tr>
            <th>Value</th>
            <th>Mapped resource</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="distinctValue in distinctValues" :key="distinctValue">
            <td>{{ distinctValue }}</td>
            <td>
              <b-dropdown v-model="value.mapping[distinctValue]">
                <button class="button" type="button" slot="trigger">
                  <template>
                    <span>{{ value.mapping[distinctValue] }}</span>
                  </template>
                  <b-icon icon="chevron-down" size="is-small" type="is-primary"></b-icon>
                </button>
                <b-dropdown-item value="" role="option">-</b-dropdown-item>
                <b-dropdown-item
                  v-for="resource in managedDimension.resources"
                  :key="resource.uri"
                  :value="resource.uri" role="option">
                  <ResourceTag :resource="resource" :language="language" :color="managedDimension.color" />
                </b-dropdown-item>
              </b-dropdown>
            </td>
          </tr>
        </tbody>
      </table>
    </b-field>
  </form>
</template>

<script>
import ResourceLabel from './ResourceLabel'
import ResourceTag from './ResourceTag'
import data from '@/data'

export default {
  name: 'DesignerMappingForm',
  components: { ResourceLabel, ResourceTag },
  props: ['value', 'cube'],

  data () {
    const property = this.value.dimension
    const allValues = this.cube.data.map((row) => {
      return row[property].value
    })
    const distinctValues = new Set(allValues)

    return {
      managedDimensions: data.managedDimensions,
      language: 'en',

      distinctValues,
    }
  },

  computed: {
    managedDimension () {
      return this.managedDimensions.find(({ uri }) => this.value.managedDimension === uri)
    }
  }
}
</script>
