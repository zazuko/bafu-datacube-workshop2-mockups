<template>
  <div class="Mapper">
    <div class="mapping columns">
      <div class="column">
        <h2 class="title is-6">Input sources</h2>
        <div v-for="source in sources" :key="source.uri" class="source panel">
          <p class="panel-heading">{{ source.label }}</p>
          <p class="panel-tabs">
            <a class="is-active">All</a>
            <a>Mapped</a>
            <a>Not mapped</a>
          </p>
          <div v-for="column in source.columns" :key="column" class="panel-block">
            {{ column }}
          </div>
        </div>
      </div>
      <div class="column is-1">
        <p class="has-text-centered"><b-icon icon="arrow-right" size="is-small" /></p>
      </div>
      <div class="column">
        <h2 class="title is-6">Output tables</h2>
        <div v-for="table in tables" :key="table.uri" class="table panel">
          <p class="panel-heading" :style="{ 'background-color': table.color }">{{ table.label }}</p>
          <div v-for="attribute in table.attributes" :key="attribute.uri" class="panel-block">
            {{ attribute.label }}
          </div>
        </div>
      </div>
    </div>

    <div class="cube-preview" :class="{ 'is-collapsed': !showPreview }">
      <header class="cube-preview-header">
        <b-button
          :icon-left="showPreview ? 'chevron-down' : 'chevron-up'"
          type="is-primary"
          size="is-small"
          class="preview-collapse-button"
          @click="togglePreview"
        >
          {{ showPreview ? 'Hide' : 'Show' }}
          Cube preview
        </b-button>
      </header>
      <div class="cube-preview-content">
        <CubeDesigner />
      </div>
    </div>
  </div>
</template>

<style scoped>
.mapping {
  padding: 0 1rem;
}

.cube-preview {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.cube-preview-header {
  display: flex;
  justify-content: center;
}

.cube-preview-header .preview-collapse-button {
  flex-grow: 1;
  border-radius: 0;
}

.is-collapsed .cube-preview-content {
  display: none;
}
</style>

<script>
import CubeDesigner from '@/components/CubeDesigner.vue'

export default {
  name: 'Mapper',
  components: { CubeDesigner },

  data () {
    return {
      sources: [
        {
          uri: 'stations.csv',
          label: 'stations.csv',
          columns: ['station_id', 'pollutant_id'],
        },
        {
          uri: 'pollutants.csv',
          label: 'pollutants.csv',
          columns: ['pollutant_id', 'pollutant_name_de', 'pollutant_name_en'],
        },
      ],
      tables: [
        {
          uri: 'station',
          label: 'Station',
          color: 'rgb(165, 214, 167)',
          attributes: [
            { uri: 'id', label: 'ID' },
          ]
        },
      ],
      showPreview: false
    }
  },

  methods: {
    togglePreview () {
      this.showPreview = !this.showPreview
    }
  }
}
</script>
