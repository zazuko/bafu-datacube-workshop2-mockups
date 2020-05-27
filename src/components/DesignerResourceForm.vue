<template>
  <form class="form">
    <InputMultiValue
      v-for="property in properties"
      :key="property"
      :label="property"
      v-model="value[property]"
    />
  </form>
</template>

<script>
import InputMultiValue from './InputMultiValue.vue'

export default {
  name: 'DesignerValueForm',
  components: { InputMultiValue },
  props: ['value'],

  computed: {
    properties () {
      return Object.keys(this.value).filter((property) => property !== 'type')
    }
  }
}
</script>
