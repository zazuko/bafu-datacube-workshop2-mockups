<template>
  <form class="form">
    <InputMultiValue label="Label" v-model="value.label" />
    <InputMultiValue label="Description" v-model="value.description" input-type="textarea" />

    <b-field label="Scale of measure" :addons="false">
      <InputScaleOfMeasure v-model="value.scaleOfMeasure" />
    </b-field>

    <b-field label="Special actions" v-if="value.scaleOfMeasure === 'nominal' && value.isManaged">
      <b-button icon-left="link" type="is-info" @click="$emit('editMapping', value.mappedTo)">
        Map to managed dimension
      </b-button>
    </b-field>
  </form>
</template>

<script>
import InputMultiValue from './InputMultiValue.vue'
import InputScaleOfMeasure from './InputScaleOfMeasure.vue'

export default {
  name: 'DesignerDimensionForm',
  components: { InputMultiValue, InputScaleOfMeasure },
  props: ['value'],
}
</script>
