<template>
  <div class="main">
    <template>
      <div class="header">
        <h1 class="title">
          かわいいシールジェネレータ
        </h1>
      </div>
      <div class="contents">
        <div>
          <!-- 描画部分 -->
          <div class="canvas-wrapper" :class="{ sp: isMobile }">
            <Canvas
              v-if="!isLoading"
              ref="canvas"
              :config="configKonva"
              :images="images"
              class="canvas"
            />
          </div>
          <!-- 背景画像 -->
          <div class="form-wrapper">
            <div class="form-label">
              <p>背景</p>
            </div>
            <div class="form-parts">
              <Accordion :label="'色設定'">
                <HSLSlider
                  :hsl-values="images[0].hsl"
                  @updateValue="onUpdateValue($event, 'bg')"
                />
              </Accordion>
            </div>
          </div>
          <!-- 髪型 -->
          <div class="form-wrapper">
            <div class="form-label">
              <p>髪型</p>
            </div>
            <div class="form-parts">
              <SelectBox
                :config="hair.selectConfig"
                :value="hair.selectValue"
                @changeSelect="onChangeHair"
              />
            </div>
            <div class="form-parts">
              <Accordion :label="'色設定'">
                <HSLSlider
                  :hsl-values="images[1].hsl"
                  @updateValue="onUpdateValues($event, lines)"
                />
              </Accordion>
            </div>
          </div>
          <!-- 髪色 -->
          <div class="form-wrapper">
            <div class="form-label">
              <p>髪色</p>
            </div>
            <div class="form-parts">
              <Accordion :label="'髪色設定'">
                <HSLSlider
                  :hsl-values="images[1].hsl"
                  @updateValue="onUpdateValue($event, 'hair')"
                />
              </Accordion>
            </div>
          </div>
          <!-- ハート -->
          <div class="form-wrapper">
            <div class="form-label">
              <p>ハートの色</p>
            </div>
            <div class="form-parts">
              <SelectBox
                :config="heart.selectConfig"
                :value="heart.selectValue"
                @changeSelect="onChangeHeart"
              />
            </div>
          </div>
          <div class="form-wrapper">
            <div class="form-parts-nolabel">
              <button class="save-button" @click="onClickSave">
                可愛いシールを保存
              </button>
            </div>
          </div>
          <div class="margin-wrapper" />
        </div>
      </div>
      <!--
      <div class="footer">
        <p class="credit">
          created by @_pkpq_
        </p>
      </div>
      -->
    </template>
  </div>
</template>

<script>
// import modules
import { isMobile } from '~/utils/userAgent'
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
    // PCは500px固定、SPは画面の横幅-20px(最大は500px)
    let canvasSize = 500
    if (isMobile) {
      canvasSize = window.innerWidth - 20
      if (canvasSize > 500) {
        canvasSize = 500
      }
    }
    const lines = ['face', 'line', 'dot']
    return {
      isMobile: isMobile,
      isLoading: true,
      lines: lines,
      configKonva: {
        width: canvasSize,
        height: canvasSize
      },
      images: [
        {
          name: 'bg',
          hsl: {
            hue: 0,
            saturation: 0,
            luminance: 0
          },
          config: { image: null, width: canvasSize, height: canvasSize }
        },
        {
          name: 'base',
          hsl: {
            hue: 0,
            saturation: 0,
            luminance: 0
          },
          config: { image: null, width: canvasSize, height: canvasSize }
        },
        {
          name: 'face',
          hsl: {
            hue: 0,
            saturation: 0,
            luminance: 0
          },
          config: { image: null, width: canvasSize, height: canvasSize }
        },
        {
          name: 'hair',
          hsl: {
            hue: 0,
            saturation: 0,
            luminance: 0
          },
          config: { image: null, width: canvasSize, height: canvasSize }
        },
        {
          name: 'line',
          hsl: {
            hue: 0,
            saturation: 0,
            luminance: 0
          },
          config: { image: null, width: canvasSize, height: canvasSize }
        },
        {
          name: 'heart',
          hsl: {
            hue: 0,
            saturation: 0,
            luminance: 0
          },
          config: { image: null, width: canvasSize, height: canvasSize }
        },
        {
          name: 'dot',
          hsl: {
            hue: 0,
            saturation: 0,
            luminance: 0
          },
          config: { image: null, width: canvasSize, height: canvasSize }
        }
      ],
      hair: {
        selectConfig: {
          label: '髪型',
          default: '髪型を選んでください',
          options: [
            'まりあ',
            'ねこみみロング',
            'おだんごツイン',
            'くしゅふわツイン',
            'くるりんツインテ',
            'パンキッシュウルフ',
            'かろやかロング'
          ],
          files: [
            { line: './01_line.png', color: './01_color.png' },
            { line: './02_line.png', color: './02_color.png' },
            { line: './03_line.png', color: './03_color.png' },
            { line: './04_line.png', color: './04_color.png' },
            { line: './05_line.png', color: './05_color.png' },
            { line: './06_line.png', color: './06_color.png' },
            { line: './07_line.png', color: './07_color.png' }
          ]
        },
        selectValue: ''
      },
      heart: {
        selectConfig: {
          label: 'ハート',
          default: 'ハートの色を選んでください',
          options: ['金森まりあ', 'キラッツ', 'メルティック'],
          files: [
            './heart_maria.png',
            './heart_kirats.png',
            './heart_meltic.png'
          ]
        },
        selectValue: ''
      }
    }
  },
  created() {
    this.createImages()
  },
  methods: {
    // TODO: １枚のレイヤーに全部突っ込んでるけど５枚以上は良くないらしいので減らしたい
    // 画像読み込み
    async createImages() {
      // 背景画像
      const imageBG = await loadImage('./bg.png')
      this.images[0].config.image = imageBG
      // 顔部分
      const imageMainBase = await loadImage('./main_base.png')
      this.images[1].config.image = imageMainBase
      const imageFace = await loadImage('./face.png')
      this.images[2].config.image = imageFace
      const imageColor = await loadImage('./01_color.png')
      this.images[3].config.image = imageColor
      const imageLine = await loadImage('./01_line.png')
      this.images[4].config.image = imageLine
      // ハート画像
      const imageHeart = await loadImage('./heart_maria.png')
      this.images[5].config.image = imageHeart
      // 周りの謎の点々
      const imageDot = await loadImage('./dot.png')
      this.images[6].config.image = imageDot
      this.isLoading = false
    },
    onUpdateValue(data, name) {
      this.images.forEach((image) => {
        if (image.name === name) {
          image.hsl[data.hsl] = parseFloat(data.value)
          this.$refs.canvas.hslFilterDraw(image.name, image.hsl)
        }
      })
    },
    onUpdateValues(data, names) {
      this.images.forEach((image) => {
        if (names.includes(image.name)) {
          image.hsl[data.hsl] = parseFloat(data.value)
          this.$refs.canvas.hslFilterDraw(image.name, image.hsl)
        }
      })
    },
    async onChangeHair(value) {
      const imageLine = await loadImage(
        this.hair.selectConfig.files[parseInt(value)].line
      )
      this.images[4].config.image = imageLine
      const imageColor = await loadImage(
        this.hair.selectConfig.files[parseInt(value)].color
      )
      this.images[3].config.image = imageColor
      this.$refs.canvas.refreshDraw(this.images[2].name)
      this.$refs.canvas.refreshDraw(this.images[3].name)
      this.$refs.canvas.refreshDraw(this.images[4].name)
      this.$refs.canvas.refreshDraw(this.images[6].name)
      this.images.forEach((image) => {
        if (this.lines.includes(image.name)) {
          this.$refs.canvas.hslFilterDraw(image.name, image.hsl)
        }
      })
    },
    async onChangeHeart(value) {
      const imageHeart = await loadImage(
        this.heart.selectConfig.files[parseInt(value)]
      )
      this.images[5].config.image = imageHeart
      this.$refs.canvas.refreshDraw(this.images[5].name)
    },
    downloadURI(uri) {
      const link = document.createElement('a')
      link.download = 'kawaii.png'
      link.href = uri
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    onClickSave() {
      this.downloadURI(this.$refs.canvas.getURI())
    }
  }
}
</script>

<style lang="scss" scoped>
// 色定義のインポート
@import '../scss/color';

.main {
  height: 100vh;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  color: $color-black;
  font-size: 14px;
}

.header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  background-color: $color-pink;
  .title {
    margin: auto;
    font-size: 24px;
    font-weight: 1000;
    color: $color-white;
  }
}

.contents {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex: 1;
}

.canvas-wrapper {
  display: block;
  padding-top: 24px;
  .canvas {
    border: 3px dotted $color-gray;
  }
}

.form-wrapper {
  display: block;
  padding-top: 24px;
  .form-label {
    border-left: 5px solid $color-pink;
    padding-left: 12px;
    background-color: $color-gray;
    padding-top: 5px;
    padding-bottom: 5px;
    p {
      font-size: 18px;
      font-weight: bold;
      color: $color-black;
    }
  }
  .form-parts {
    margin-top: 4px;
  }

  .form-parts-nolabel {
    margin-top: 16px;
    text-align: center;
    .save-button {
      text-align: center;
      color: $color-white;
      background-color: $color-pink;
      width: 200px;
      height: 32px;
      border-radius: 8px;
    }
  }
}

.margin-wrapper {
  display: block;
  height: 64px;
  margin-top: 16px;
}

.footer {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  background-color: $color-pink;
  margin-top: 45px;
  .credit {
    margin: auto;
    color: $color-white;
  }
}
</style>
