<template>
  <form class="form">
    <b-field label="Column">
      <b-select v-model="value.column">
        <option :value="value.column">{{ value.column }}</option>
      </b-select>
    </b-field>

    <b-field label="Property">
      <b-input v-model="value.property" />
    </b-field>

    <b-field label="Data type" :addons="false">
      <div class="box">
        <b-field>
          <b-radio :value="nodeKind" native-value="literal" @input="onChangeNodeKind">Literal value</b-radio>
          <b-radio :value="nodeKind" native-value="link" @input="onChangeNodeKind">Link to another table</b-radio>
        </b-field>

        <b-field v-if="nodeKind === 'literal'" :addons="false">
          <b-field label="Type" v-if="nodeKind === 'literal'">
            <b-select v-model="value.datatype">
              <option v-for="datatype in datatypes" :key="datatype.uri" :native-value="datatype.uri">
                {{ datatype.uri }}
              </option>
            </b-select>
          </b-field>

          <b-field label="Language" v-if="value.datatype === 'xsd:string'">
            <InputLanguage />
          </b-field>
        </b-field>

        <b-field label="Table" v-if="nodeKind === 'link'">
          <b-select v-model="value.linksTo">
            <option v-for="table in tables" :key="table.uri" :native-value="table.uri">
              <ResourceLabel :resource="table" language="en" />
            </option>
          </b-select>
        </b-field>
      </div>
    </b-field>

    <InputMultiValue label="Label" v-model="value.label" />
  </form>
</template>

<script>
import InputMultiValue from './InputMultiValue.vue'
import ResourceLabel from './ResourceLabel.vue'
import InputLanguage from './InputLanguage'
import data from '@/data'

export default {
  name: 'MapperTableForm',
  components: { InputMultiValue, InputLanguage, ResourceLabel },
  props: ['value'],

  data () {
    return {
      tables: data.tables,
      datatypes: data.datatypes,
    }
  },

  methods: {
    onChangeNodeKind (kind) {
      if (kind === 'literal') {
        this.value.linksTo = null
      }

      if (kind === 'link') {
        this.value.linksTo = this.tables[0].uri
      }
    },
  },

  computed: {
    nodeKind () {
      if (this.value.linksTo) {
        return 'link'
      }

      return 'literal'
    }
  }
}
</script>
