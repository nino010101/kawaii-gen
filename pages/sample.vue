<template>
  <div class="container">
    <div>
      <div class="parts-sample">
        <Canvas v-if="!isLoading" ref="canvas" :config="configKonva" :images="images" />
      </div>
      <div class="parts-sample">
        <SelectBox :config="selectConfig" :value="selectValue" @changeSelect="onChangeSelect" />
      </div>
      <div class="parts-sample">
        <Accordion :label="'色設定'">
          <HSLSlider :hsl-values="images[0].hsl" @updateValue="onUpdateValue" />
        </Accordion>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Canvas from '~/components/Canvas.vue'
import HSLSlider from '~/components/HSLSlider.vue'
import SelectBox from '~/components/SelectBox.vue'
import loadImage from '~/utils/loadImage'
import Accordion from '~/components/Accordion.vue'
export default {
  components: {
    Canvas,
    HSLSlider,
    SelectBox,
    Accordion
  },
  data() {
    return {
      isLoading: true,
      configKonva: {
        width: 500,
        height: 500
      },
      images: [
        {
          name: 'bg',
          hsl: {
            hue: 0,
            saturation: 0,
            luminance: 0
          },
          config: { image: null }
        },
        {
          name: 'main',
          hsl: {
            hue: 150,
            saturation: 0,
            luminance: 0
          },
          config: { image: null }
        },
        {
          name: 'sub',
          hsl: {
            hue: 150,
            saturation: 0,
            luminance: 0
          },
          config: { image: null }
        }
      ],
      selectConfig: {
        label: 'メイン画像',
        default: '画像を選んでください',
        options: ['youngwoman_37.png', 'youngwoman_38.png', 'youngwoman_42.png']
      },
      selectValue: ''
    }
  },
  mounted() {
    console.log(process.env.TEST)
  },
  created() {
    this.createImages()
  },
  methods: {
    async createImages() {
      const imageBG = await loadImage('./kawaii_siru_base.png')
      this.images[0].config.image = imageBG
      const imageMain = await loadImage('./kawaii_siru_base.png')
      this.images[1].config.image = imageMain
      this.isLoading = false
    },
    onUpdateValue(data) {
      // TODO:イメージごとに別のスライダーのフィルタを適用するように変更する
      this.images.forEach((image) => {
        image.hsl[data.hsl] = parseInt(data.value)
        this.$refs.canvas.hslFilterDraw(image.name)
      })
    },
    onChangeImage() {
      const mainImage = new Image()
      mainImage.src = './youngwoman_37.png'
      mainImage.onload = () => {
        this.configMain.image = mainImage
      }
    },
    async onChangeSelect(value) {
      // TODO: onchangeのたびにロードをかけるのをやめて、初期に全部ロードしたい
      const imageMain = await loadImage(`./${value}`)
      this.images[1].config.image = imageMain
      this.$refs.canvas.refreshDraw(this.images[1].name)
    }
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.parts-sample {
  display: block;
  padding-top: 12px;
}

.stage {
  border: 1px solid #000000;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
