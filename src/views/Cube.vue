<template>
  <section class="Cube">
    <div class="tabs">
      <ul>
        <router-link :to="{ name: 'Mapper' }" v-slot="{ href,  isActive }">
          <li :class="{ 'is-active': isActive }">
            <a :href="href">Mapper</a>
          </li>
        </router-link>
        <router-link :to="{ name: 'Designer' }" v-slot="{ href,  isActive }">
          <li :class="{ 'is-active': isActive }">
            <a :href="href">Designer</a>
          </li>
        </router-link>
      </ul>
    </div>

    <router-view />
  </section>
</template>

<style scoped>
.Cube {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: hidden;
}

.tabs {
  margin-bottom: 0 !important;
  min-height: 41px;
}
</style>

<script>
import ResourceLabel from '@/components/ResourceLabel'
import data from '@/data'

export default {
  name: 'Cube',
  components: { ResourceLabel },

  data () {
    return {
      cube: data.cube,
      language: 'en',
      open: true,
    }
  },

  mounted () {
    this.$router.push({ name: 'Mapper' })
  }
}
</script>
