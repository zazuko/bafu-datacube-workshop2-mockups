<template>
  <form class="form">
    <div class="level">
      <b-button @click="selectAll">Select all</b-button>
      <b-button @click="deselectAll">Deselect all</b-button>
    </div>
    <ul>
      <li v-for="resource in resources" :key="resource.uri">
        <b-checkbox v-model="selected" :native-value="resource.uri">
          {{ resource.label }}
        </b-checkbox>
      </li>
    </ul>
  </form>
</template>

<style scoped>
.form {
  text-align: left;
}
</style>

<script>
import data from '@/data'

export default {
  name: 'FiltersNominal',
  props: ['dimension'],

  data () {
    const allResources = data.cube.data
      .map((row) => row[this.dimension.uri].value)

    const resources = [...new Set(allResources)]
      .map((value) => ({ uri: value, label: value }))

    return {
      resources,
      selected: resources.map(({ uri }) => uri)
    }
  },

  methods: {
    selectAll () {
      this.selected = this.resources.map(({ uri }) => uri)
    },

    deselectAll () {
      this.selected = []
    }
  }
}
</script>
