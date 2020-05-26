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
  name: 'FiltersContinous',
  props: ['dimension'],

  data () {
    const min = 0
    const max = 70

    return {
      min,
      max,
      value: [min, max],
      ticks: [0, 10, 20, 30, 40, 50, 60, 70],
    }
  }
}
</script>
