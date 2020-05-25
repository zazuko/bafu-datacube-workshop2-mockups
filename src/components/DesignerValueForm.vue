<template>
  <form class="form">
    <b-field label="Value" :addons="false">
      <b-field>
        <b-input v-model="actualValue.value" class="is-expanded" />
        <InputLanguage v-model="actualValue.language" />
      </b-field>
      <b-button icon-left="plus" title="Add a value" type="is-white" />
    </b-field>
  </form>
</template>

<script>
import InputLanguage from './InputLanguage.vue'

export default {
  name: 'DesignerValueForm',
  components: { InputLanguage },
  props: ['value'],

  computed: {
    actualValue () {
      return this.value.row[this.value.property]
    }
  }
}
</script>
