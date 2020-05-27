<template>
  <form class="form">
    <InputMultiValue label="Title" v-model="value.label" />
    <InputMultiValue label="Description" v-model="value.description" input-type="textarea" />
  </form>
</template>

<script>
import InputMultiValue from './InputMultiValue.vue'

export default {
  name: 'DesignerCubeForm',
  components: { InputMultiValue },
  props: ['value'],
}
</script>
