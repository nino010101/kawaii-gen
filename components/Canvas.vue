<template>
  <div class="canvas">
    <!-- canvas component -->
    <v-stage ref="stage" :config="config" class="stage">
      <v-layer v-for="(image, idx) in images" :key="idx">
        <v-image :ref="image.name" :config="image.config" />
      </v-layer>
    </v-stage>
  </div>
</template>
<script>
export default {
  props: {
    // konvaの描画領域指定(defaultは500x500px)
    config: {
      type: Object,
      required: true,
      default: () => ({
        width: 500,
        height: 500
      })
    },
    // 表示画像の配列
    images: {
      type: Array,
      required: true,
      default: () => [],
      validator: (value) => {
        // 画像表示が10枚以上にならないためのバリデーター
        return !(value.length > 10)
      }
    }
  },
  methods: {
    hslFilterDraw(target, hsl) {
      const node = this.$refs[target][0].getStage().getLayer()
      node.cache()
      // eslint-disable-next-line no-undef
      node.filters([Konva.Filters.HSL])
      node.hue(parseFloat(hsl.hue))
      node.luminance(parseFloat(hsl.luminance))
      node.saturation(parseFloat(hsl.saturation))
      node.batchDraw()
    },
    refreshDraw(target) {
      const node = this.$refs[target][0].getStage().getLayer()
      node.clearCache()
      node.getLayer().batchDraw()
    },
    getURI() {
      const stage = this.$refs.stage.getStage()
      return stage.toDataURL()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
