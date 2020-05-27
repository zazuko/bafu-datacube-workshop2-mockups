<template>
  <form class="form">
    <InputMultiValue label="Title" v-model="value.label" />
    <InputMultiValue label="Description" v-model="value.description" input-type="textarea" />
    <InputMultiValue label="Publishers" v-model="value.publishers" />
    <InputMultiValue label="ContactPoints" v-model="value.contactPoints" />
    <InputMultiValue label="Languages" v-model="value.languages" :disable-language="true" />
    <InputMultiValue label="Landing page" v-model="value.landingPage" :disable-language="true" />
  </form>
</template>

<script>
import InputMultiValue from './InputMultiValue.vue'

export default {
  name: 'DesignerCubeForm',
  components: { InputMultiValue },
  props: ['value'],
}
</script>
