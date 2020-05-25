<template>
  <b-tooltip :label="title" type="is-light" :delay="200" size="is-small">
    <b-button type="is-white" size="is-small" icon-left="pen" v-bind="$attrs" v-on="$listeners" />
  </b-tooltip>
</template>

<script>
export default {
  name: 'ButtonEdit',
  props: ['title']
}
</script>
