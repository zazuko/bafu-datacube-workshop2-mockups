<template>
  <div class="Designer section">
    <CubeDesigner :cube="cube"/>
  </div>
</template>

<script>
import CubeDesigner from '@/components/CubeDesigner.vue'

export default {
  name: 'Designer',
  components: {
    CubeDesigner
  },

  data () {
    const cube = this.$parent.cube
    return { cube }
  }
}
</script>
