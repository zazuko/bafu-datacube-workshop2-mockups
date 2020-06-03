<template>
  <b-tooltip
    class="tag is-rounded"
    :label="resource.uri"
    type="is-light"
    :delay="200"
    size="is-small"
    :style="{ 'background-color': resource.color }"
  >
    <ResourceLabel :resource="resource" :language="language" />
  </b-tooltip>
</template>

<script>
import ResourceLabel from './ResourceLabel'

export default {
  name: 'ResourceTag',
  components: { ResourceLabel },
  props: ['resource', 'language', 'missing'],
}
</script>
