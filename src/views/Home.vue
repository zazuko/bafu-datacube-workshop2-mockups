<template>
  <div class="home">
    <h1>Hello</h1>

    <button class="button is-primary" @click="sidePaneOpen = !sidePaneOpen">Open</button>

    <SidePane :isOpen="sidePaneOpen" @close="sidePaneOpen = false" />
  </div>
</template>

<script>
import SidePane from '@/components/SidePane.vue'

export default {
  name: 'Home',
  components: {
    SidePane
  },

  data () {
    return {
      sidePaneOpen: false
    }
  }
}
</script>
