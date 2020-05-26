<template>
  <form class="form">
    <b-field label="Min/max value">
      <div class="control">
        <b-slider v-model="value" :min="min" :max="max" rounded tooltip-type="is-light">
          <template v-for="val in ticks">
            <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
          </template>
        </b-slider>
      </div>
    </b-field>
  </form>
</template>

<script>
export default {
  name: 'FiltersTemporal',
  props: ['dimension'],

  data () {
    const min = 1960
    const max = 2020

    return {
      min,
      max,
      value: [min, max],
      ticks: [min, max],
    }
  }
}
</script>
