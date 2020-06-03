<template>
  <div>
    <b-button
      v-if="value.type === 'resource'"
      @click="$emit('editResource', value)"
      title="View resource"
      :rounded="true"
      size="is-small"
      :style="{ 'background-color': dimension.color}"
    >
      <ResourceLabel :resource="value" :language="language" />
    </b-button>
    <div v-else-if="dimension.isManaged">
      <b-tooltip dashed type="is-light" size="is-small" label="Could not find corresponding value in managed dimension">
        {{ value.value }}
      </b-tooltip>
    </div>
    <span v-else class="value">
      {{ value.value }}
      <small v-if="value.unit" class="unit has-text-grey">
        {{ value.unit }}
      </small>
    </span>
  </div>
</template>

<script>
import data from '@/data'
import ResourceLabel from './ResourceLabel'

export default {
  name: 'DesignerDimensionValue',
  components: { ResourceLabel },
  props: ['resource', 'dimension', 'language', 'cube'],

  data () {
    return {
      managedDimensions: data.managedDimensions
    }
  },

  computed: {
    value () {
      const value = this.resource[this.dimension.uri]

      if (this.dimension.isManaged) {
        const mapping = this.dimension.mappedTo
        const managedDimension = this.managedDimensions.find(({ uri }) => uri === mapping.managedDimension)
        const matchingMapping = mapping.mapping.find((mappedValue) => mappedValue.value === value.value)
        return matchingMapping
          ? managedDimension.resources.find(({ uri }) => uri === matchingMapping.target)
          : value
      }

      if (this.dimension.scaleOfMeasure === 'nominal') {
        return this.cube.resources[value.value]
      }

      return value
    }
  }
}
</script>
