<template>
  <div class="slider">
    <!-- slider component -->
    <div class="form-group">
      <p>{{ config.label }}：</p>
      <input
        :id="config.id"
        v-model="sliderValue"
        type="range"
        :min="config.min"
        :max="config.max"
        :step="config.step"
        @input="onInput"
      >
    </div>
  </div>
</template>
<script>
import hasKeys from '~/utils/hasKeys'
export const sliderConfigs = [
  'label',
  'id',
  'min',
  'max',
  'step'
]
export default {
  props: {
    config: {
      type: Object,
      required: true,
      validator: (val) => {
        // objectにKeyがあるかどうかでバリデーションをかける
        return hasKeys(val, sliderConfigs)
      }
    },
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      sliderValue: this.value
    }
  },
  methods: {
    onInput() {
      this.$emit('sliderInput', this.sliderValue)
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-group{
    width: 180px; // 暫定、幅の持ち方は後で考える
    display: flex;
    justify-content: space-between;
  }
</style>
