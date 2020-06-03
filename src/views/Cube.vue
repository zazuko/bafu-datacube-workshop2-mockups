<template>
  <section class="Cube">
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
</style>

<script>
import data from '@/data'

export default {
  name: 'Cube',

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
