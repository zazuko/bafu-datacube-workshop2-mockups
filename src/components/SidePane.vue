<template>
  <div class="quickview" :class="{ 'is-active': isOpen }">
    <header class="quickview-header">
      <h2 class="title">{{ title }}</h2>
      <button class="delete" @click="$emit('close')"></button>
    </header>

    <div class="quickview-body">
      <slot />
    </div>
    <footer class="quickview-footer"></footer>
  </div>
</template>

<script>
import Quickview from 'bulma-quickview/dist/js/bulma-quickview'
import 'bulma-quickview/dist/css/bulma-quickview.min.css'

export default {
  name: 'SidePane',
  props: ['isOpen', 'title'],

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
