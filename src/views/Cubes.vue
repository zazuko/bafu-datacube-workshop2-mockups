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
    </div>
  </section>
</template>

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
