<template>
  <b-select v-bind="$attrs" v-on="$listeners">
    <option v-for="language in languages" :key="language.uri" :value="language.uri">
      {{ language.label }}
    </option>
  </b-select>
</template>

<script>
export default {
  name: 'InputLanguage',
  data () {
    return {
      value: 'en',
      languages: [
        { uri: 'en', label: 'en' },
        { uri: 'fr', label: 'fr' },
        { uri: 'de', label: 'de' },
        { uri: 'it', label: 'it' },
      ]
    }
  }
}
</script>
