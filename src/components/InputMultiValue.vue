<template>
  <b-field :label="label" :addons="false">
    <b-field v-for="(subValue, index) in value" :key="index">
      <b-input v-model="subValue.value" class="is-expanded" :type="inputType" />
      <InputLanguage v-model="subValue.language" v-if="showLanguage" />
      <b-button icon-left="times" title="Remove value" @click="removeValue(index)" />
    </b-field>
    <b-button icon-left="plus" title="Add a value" type="is-white" @click="addValue" />
  </b-field>
</template>

<script>
import InputLanguage from './InputLanguage.vue'

export default {
  name: 'InputMultiValue',
  props: ['value', 'label', 'input-type', 'disable-language'],
  components: { InputLanguage },

  data () {
    return {
      isEmptyOnLoad: this.value.length === 0,
    }
  },

  computed: {
    showLanguage () {
      return !this.disableLanguage && (
        this.isEmptyOnLoad ||
        Object.prototype.hasOwnProperty.call(this.value[0], 'language')
      )
    }
  },

  methods: {
    addValue () {
      this.value.push({ value: '' })
    },

    removeValue (index) {
      this.value.splice(index, 1)
    }
  }
}
</script>
