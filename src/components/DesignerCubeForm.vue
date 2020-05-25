<template>
  <form class="form">
    <b-field label="Title" :addons="false">
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
