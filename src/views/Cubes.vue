<template>
  <section class="section">
    <h2 class="title is-4">Cubes</h2>
    <div class="panel">
      <router-link
        :to="{ name: 'Cube', params: { uri: cube.uri } }"
        class="panel-block"
      >
        <ResourceLabel :resource="cube" :language="language" />
      </router-link>
      <div class="panel-block">
        Food pricing
      </div>
      <div class="panel-block">
        Electricity
      </div>
    </div>
    <b-button icon-left="plus">Add cube</b-button>
  </section>
</template>

<style scoped>
.section {
  max-width: 40rem;
}
</style>

<script>
import ResourceLabel from '@/components/ResourceLabel'
import data from '@/data'

export default {
  name: 'Cubes',
  components: { ResourceLabel },

  data () {
    return {
      cube: data.cube,
      language: 'en',
    }
  }
}
</script>
