<template>
  <section class="section">
    <h2 class="title">Managed dimensions</h2>

    <div class="panel" v-if="dimensions.length > 0">
      <router-link
        v-for="dimension in dimensions"
        :key="dimension.uri"
        :to="{ name: 'ManagedDimension', params: { uri: dimension.uri } }"
        class="panel-block"
      >
        <ResourceLabel :resource="dimension" :language="selectedLanguage" />
      </router-link>
    </div>
    <div v-else>
      <div class="content has-text-grey has-text-centered">
        <p>You don't have any dimensions yet.</p>
      </div>
    </div>
  </section>
</template>

<script>
import ResourceLabel from '@/components/ResourceLabel'
import data from '@/data'

export default {
  name: 'DimensionManager',
  components: { ResourceLabel },

  data () {
    return {
      dimensions: data.managedDimensions,
      selectedLanguage: 'en',
    }
  }
}
</script>
