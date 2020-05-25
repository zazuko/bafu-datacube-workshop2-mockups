<template>
  <b-tooltip :label="title" type="is-light" :delay="200" size="is-small">
    <b-button type="is-white" class="has-text-grey" size="is-small" icon-left="pen" v-bind="$attrs" v-on="$listeners">
      <slot />
    </b-button>
  </b-tooltip>
</template>

<script>
export default {
  name: 'ButtonEdit',
  props: ['title']
}
</script>
