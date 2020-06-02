<template>
  <form class="form">
    <InputMultiValue label="Label" v-model="value.label" />
    <b-field label="Identifier template">
      <b-input v-model="value.identifierTemplate" />
    </b-field>
    <b-field label="Display color">
      <div class="control has-icons-right is-clearfix">
        <input type="text" v-model="value.color" class="input" disabled>
        <b-icon icon="circle" class="is-right" :style="{ color: value.color }" />
      </div>
    </b-field>
    <InputMultiValue label="Description" v-model="value.description" input-type="textarea" />
  </form>
</template>

<script>
import InputMultiValue from './InputMultiValue.vue'

export default {
  name: 'MapperTableForm',
  components: { InputMultiValue },
  props: ['value'],
}
</script>
