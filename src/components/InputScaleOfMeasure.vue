<template>
  <b-dropdown v-bind="$attrs" v-on="$listeners" aria-role="select">
    <button class="button" type="button" slot="trigger">
      <template>
          <b-icon :icon="selectedScale.icon" size="is-small"></b-icon>
          <span>{{ selectedScale.label }}</span>
      </template>
      <b-icon icon="chevron-down" size="is-small" type="is-primary"></b-icon>
    </button>
    <b-dropdown-item
      v-for="scale in scales"
      :key="scale.uri"
      :value="scale.uri" aria-role="option">
      <div class="media">
        <b-icon class="media-left" :icon="scale.icon" size="is-small" />
        <div class="media-content">
          <p>{{ scale.label }}</p>
        </div>
      </div>
    </b-dropdown-item>
  </b-dropdown>
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
    selectedScale () {
      const value = this.$attrs.value
      return this.scales.find(({ uri }) => uri === value)
    },
  }
}
</script>
