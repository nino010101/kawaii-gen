<template>
  <div class="hsl-slider">
    <!-- slider component for hsl settings -->
    <Slider
      :config="hueConfig"
      :value="hslValues.hue"
      @sliderInput="onUpdateSliderValue($event, 'hue')"
    />
    <Slider
      :config="satuConfig"
      :value="hslValues.saturation"
      @sliderInput="onUpdateSliderValue($event, 'saturation')"
    />
    <Slider
      :config="lumiConfig"
      :value="hslValues.luminance"
      @sliderInput="onUpdateSliderValue($event, 'luminance')"
    />
  </div>
</template>
<script>
import Slider from '~/components/parts/Slider.vue'
import hasKeys from '~/utils/hasKeys'
export const hsl = ['hue', 'saturation', 'luminance']
export default {
  components: {
    Slider
  },
  props: {
    hslValues: {
      type: Object,
      required: true,
      validator: (val) => {
        // objectにKeyがあるかどうかでバリデーションをかける
        return hasKeys(val, hsl)
      }
    }
  },
  data() {
    return {
      hueConfig: {
        label: '色相',
        id: 'hue',
        min: 0,
        max: 259,
        step: 1
      },
      satuConfig: {
        label: '彩度',
        id: 'saturation',
        min: -4,
        max: 4,
        step: 0.5
      },
      lumiConfig: {
        label: '明度',
        id: 'luminance',
        min: -2,
        max: 2,
        step: 0.1
      }
    }
  },
  methods: {
    onChangeHue(value) {
      this.$emit('updateHue', value)
    },
    onChangeSaturation() {},
    onChangeLuminance() {},
    onUpdateSliderValue(value, hsl) {
      this.$emit('updateValue', { value: value, hsl: hsl })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
