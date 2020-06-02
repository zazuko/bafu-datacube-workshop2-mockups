<template>
  <b-tooltip :label="title" type="is-light" :delay="200" size="is-small">
    <b-button :type="type" size="is-small" :icon-left="icon" v-bind="$attrs" v-on="$listeners">
      <slot />
    </b-button>
  </b-tooltip>
</template>

<script>
export default {
  name: 'Button',
  props: ['title', 'type', 'icon']
}
</script>
