<template>
  <span class="ResourceLabel">
    <span v-if="label">{{ label }}</span>
    <span v-else class="has-text-grey">{{ missing || 'Missing label' }}</span>
  </span>
</template>

<script>
export default {
  name: 'ResourceLabel',
  props: ['resource', 'language', 'missing'],

  computed: {
    label () {
      const labels = this.resource.label || this.resource['rdfs:label']
      const label = labels.find(({ language }) => language === this.language)
      return label ? label.value : ''
    }
  },
}
</script>
