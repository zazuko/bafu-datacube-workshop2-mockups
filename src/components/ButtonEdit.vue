<template>
  <Button type="is-white has-text-grey" size="is-small" icon="pen" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
import Button from './Button.vue'

export default {
  name: 'ButtonEdit',
  components: { Button },
}
</script>
