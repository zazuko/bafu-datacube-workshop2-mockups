<template>
  <b-select v-bind="$attrs" v-on="$listeners">
    <option v-for="language in languages" :key="language.code" :value="language.code">
      {{ language.label }}
    </option>
  </b-select>
</template>

<script>
import data from '@/data'

export default {
  name: 'InputLanguage',
  data () {
    return {
      languages: data.languages
    }
  },
}
</script>
