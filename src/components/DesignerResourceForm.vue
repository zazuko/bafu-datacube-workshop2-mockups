<template>
  <form class="form">
    <b-field v-for="property in properties" :key="property" :label="property" :addons="false">
      <b-field v-for="(propertyValue, index) in value[property]" :key="index">
        <b-input v-model="propertyValue.value" class="is-expanded" />
        <InputLanguage v-model="propertyValue.language" v-if="propertyValue.hasOwnProperty('language')" />
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
    properties () {
      return Object.keys(this.value).filter((property) => property !== 'type')
    }
  }
}
</script>
