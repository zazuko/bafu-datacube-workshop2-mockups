<template>
  <div class="quickview" :class="{ 'is-active': isOpen }">
    <header class="quickview-header">
      <p class="title">Side pane title</p>
      <button class="delete" @click="$emit('close')"></button>
    </header>

    <div class="quickview-body">
      <div class="quickview-block">
        ...
      </div>
    </div>
    <footer class="quickview-footer"></footer>
  </div>
</template>

<script>
import Quickview from 'bulma-quickview/dist/js/bulma-quickview'
import 'bulma-quickview/dist/css/bulma-quickview.min.css'

export default {
  name: 'SidePane',
  props: ['isOpen'],

  data () {
    return {
      quickview: null
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.quickview = new Quickview(this.$el, {})
    })
  }
}
</script>
