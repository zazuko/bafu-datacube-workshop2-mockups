<template>
  <section class="section">
    <b-tabs v-model="activeTab" type="is-toggle-rounded" :animated="false">
      <b-tab-item label="S3">
        <b-field label="Server">
          <b-input v-model="s3.server" />
        </b-field>
        <b-field label="API Key">
          <b-input v-model="s3.apiKey" />
        </b-field>
        <b-field label="Bucket">
          <b-input v-model="s3.bucket" />
        </b-field>
        <b-field :addons="false">
          <label class="label">
            <div class="level">
              <div class="level-left">
                <div class="level-item">Files</div>
                <div class="level-item"><Button icon="sync-alt" title="Refresh files" type="is-white" /></div>
              </div>
            </div>
          </label>
          <div class="box">
            <b-field v-for="source in sources" :key="source.uri">
              <b-tooltip label="You cannot unlink a file that is already used in a mapping" position="is-right">
                <b-checkbox v-model="selectedSources" :native-value="source.uri" disabled>
                  {{ source.label }}
                </b-checkbox>
              </b-tooltip>
            </b-field>
            <b-field>
              <b-checkbox v-model="selectedSources" native-value="new-file.csv">
                My new file.csv
              </b-checkbox>
            </b-field>
          </div>
        </b-field>
        <b-field :addons="false">
          <b-button tag="router-link" :to="{ name: 'Mapper' }" type="is-primary">Save</b-button>
          <b-button tag="router-link" :to="{ name: 'Mapper' }">Cancel</b-button>
        </b-field>
      </b-tab-item>

      <b-tab-item label="Manual upload" disabled>
      </b-tab-item>

      <b-tab-item label="FTP" disabled>
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import Button from '@/components/Button.vue'
import data from '@/data'

export default {
  name: 'SourcesSettings',
  components: { Button },

  data () {
    return {
      activeTab: null,
      sources: data.sources,
      filesSource: 's3',
      selectedSources: data.sources.map(({ uri }) => uri),
      s3: {
        server: 'https://the-s3-sever/',
        apiKey: 'asdfouashf03unu4adf',
        bucket: 'cubes/stations',
      }
    }
  }
}
</script>
