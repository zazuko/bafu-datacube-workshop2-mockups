<template>
  <form class="form">
    <b-field label="Label" :addons="false">
      <b-field>
        <b-input v-model="value.label" class="is-expanded" />
        <InputLanguage />
      </b-field>
      <b-button icon-left="plus" title="Add a value" type="is-white" />
    </b-field>

    <b-field label="Description" :addons="false">
      <b-field>
        <b-input type="textarea" v-model="value.description" class="is-expanded" />
        <InputLanguage />
      </b-field>
      <b-button icon-left="plus" title="Add a value" type="is-white" />
    </b-field>

    <b-field label="Scale of measure" :addons="false">
      <b-select v-model="value.scaleOfMeasure">
        <option v-for="scale in scales" :key="scale.uri" :value="scale.uri">
          {{ scale.label }}
        </option>
      </b-select>
    </b-field>
  </form>
</template>

<script>
import InputLanguage from './InputLanguage.vue'

export default {
  name: 'DesignerDimensionForm',
  components: { InputLanguage },
  props: ['value'],

  data () {
    return {
      scales: [
        { uri: 'continuous', label: 'Continuous' },
        { uri: 'concept', label: 'Concept' },
        { uri: 'temporal', label: 'Temporal' }
      ]
    }
  }
}
</script>
