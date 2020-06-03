<template>
  <section class="section">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h2 class="title is-5">
            <ResourceLabel :resource="dimension" :language="selectedLanguage" />
          </h2>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <InputLanguage v-model="selectedLanguage" size="is-small" />
        </div>
      </div>
    </div>
    <b-table
      :data="data"
      narrowed
      paginated
      :per-page="20"
    >
      <template slot-scope="props">
        <b-table-column field="uri" label="" sortable searchable>
          <template slot="header">
            Resources
          </template>
          <template slot="searchable" slot-scope="props">
            <b-input v-model="props.filters[props.column.field]" placeholder="Search..." icon="search" size="is-small" />
          </template>
          <ResourceTag :resource="props.row" :language="selectedLanguage" />
        </b-table-column>
        <b-table-column v-for="property in dimension.properties" :key="property" :field="property" :label="property">
          <span v-for="(value, index) in props.row[property]" :key="index">
            {{ value.value }}
            <small v-if="value.language" class="has-text-grey">@{{ value.language }}</small>
          </span>
        </b-table-column>
        <b-table-column>
          <template slot="header"></template>
          <ButtonEdit title="Edit resource" @click="editResource(props.row)" />
          <ButtonDelete title="Delete resource" @click="deleteResource(props.row)" />
        </b-table-column>
      </template>
      <template slot="footer">
        <b-button icon-left="plus" size="is-small" @click="addResource">Add a resource</b-button>
      </template>
    </b-table>
  </section>
</template>

<script>
import data from '@/data'
import ResourceLabel from '@/components/ResourceLabel'
import ResourceTag from '@/components/ResourceTag'
import InputLanguage from '@/components/InputLanguage'
import ButtonEdit from '@/components/ButtonEdit'
import ButtonDelete from '@/components/ButtonDelete'

export default {
  name: 'ManagedDimension',
  components: { ResourceLabel, ResourceTag, InputLanguage, ButtonEdit, ButtonDelete },

  data () {
    const dimensionURI = this.$route.params.uri
    const dimension = data.managedDimensions.find(({ uri }) => uri === dimensionURI)

    return {
      dimension,
      selectedLanguage: 'en',
    }
  },

  computed: {
    data () {
      return this.dimension.resources.map((resource) => ({ ...resource, color: this.dimension.color }))
    },
  },

  methods: {
    editResource (resource) {
      this.$buefy.toast.open({
        type: 'is-warning',
        message: 'Nothing here yet',
      })
    },

    deleteResource (resource) {
      this.$buefy.toast.open({
        type: 'is-warning',
        message: 'Nothing here yet',
      })
    },

    addResource () {
      this.$buefy.toast.open({
        type: 'is-warning',
        message: 'Nothing here yet',
      })
    },
  }
}
</script>
