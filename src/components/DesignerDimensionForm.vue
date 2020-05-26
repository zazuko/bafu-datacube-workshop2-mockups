<template>
  <form class="form">
    <b-field label="Label" :addons="false">
      <b-field v-for="(label, index) in value.label" :key="index">
        <b-input v-model="label.value" class="is-expanded" />
        <InputLanguage v-model="label.language" />
      </b-field>
      <b-button icon-left="plus" title="Add a value" type="is-white" />
    </b-field>

    <b-field label="Description" :addons="false">
      <b-field v-for="(description, index) in value.description" :key="index">
        <b-input v-model="description.value" type="textarea" class="is-expanded" />
        <InputLanguage v-model="description.language" />
      </b-field>
      <b-button icon-left="plus" title="Add a value" type="is-white" />
    </b-field>

    <b-field label="Scale of measure" :addons="false">
      <InputScaleOfMeasure v-model="value.scaleOfMeasure" />
    </b-field>

    <b-field label="Special actions" v-if="value.scaleOfMeasure === 'concept'">
      <b-button icon-left="link" type="is-info">
        Map to managed dimension
      </b-button>
    </b-field>
  </form>
</template>

<script>
import InputLanguage from './InputLanguage.vue'
import InputScaleOfMeasure from './InputScaleOfMeasure.vue'

export default {
  name: 'DesignerDimensionForm',
  components: { InputLanguage, InputScaleOfMeasure },
  props: ['value'],
}
</script>
