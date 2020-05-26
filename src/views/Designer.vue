<template>
  <div class="Designer">
    <CubeDesigner :cube="cube"/>
  </div>
</template>

<script>
import CubeDesigner from '@/components/CubeDesigner.vue'
import data from '@/data'

export default {
  name: 'Designer',
  components: {
    CubeDesigner
  },

  data () {
    return { cube: data.cube }
  }
}
</script>
