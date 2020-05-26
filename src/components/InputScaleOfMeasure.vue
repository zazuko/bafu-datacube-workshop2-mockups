<template>
  <b-select v-bind="$attrs" v-on="$listeners" :icon="icon">
    <option v-for="scale in scales" :key="scale.uri" :value="scale.uri">
      <b-icon :icon="scale.icon" />{{ scale.label }}
    </option>
  </b-select>
</template>

<script>
import data from '@/data'

export default {
  name: 'InputScaleOfMeasure',

  data () {
    return {
      scales: data.scaleOfMeasures
    }
  },

  computed: {
    icon () {
      const value = this.$attrs.value
      const scale = this.scales.find(({ uri }) => uri === value)
      return scale ? scale.icon : ''
    }
  }
}
</script>
