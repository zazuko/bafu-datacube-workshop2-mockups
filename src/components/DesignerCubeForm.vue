<template>
  <form class="form">
    <b-field label="Title" :addons="false">
      <b-field v-for="(label, index) in value.label" :key="index">
        <b-input v-model="label.value" class="is-expanded" />
        <InputLanguage v-model="label.language" />
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
  </form>
</template>

<script>
import InputLanguage from './InputLanguage.vue'

export default {
  name: 'DesignerCubeForm',
  components: { InputLanguage },
  props: ['value'],
}
</script>
