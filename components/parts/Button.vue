<template>
  <div class="button">
    <!-- button component -->
    <button :disabled="!config.isEnable" @click="onClickButton">
      {{ config.label }}
    </button>
  </div>
</template>
<script>
import hasKeys from '~/utils/hasKeys'
export const buttonConfigs = ['label', 'size', 'type', 'isEnable']
export default {
  props: {
    config: {
      type: Object,
      required: true,
      validator: (val) => {
        return hasKeys(val, buttonConfigs)
      }
    }
  },
  methods: {
    onClickButton() {
      this.$emit('clickButton')
    }
  }
}
</script>

<style lang="scss" scoped>
.form-group {
  width: 180px; // 暫定、幅の持ち方は後で考える
  display: flex;
  justify-content: space-between;
}
</style>
