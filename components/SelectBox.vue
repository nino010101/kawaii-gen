<template>
  <div class="select-box">
    <!-- slider component -->
    <div class="form-group">
      <p>{{ config.label }}：</p>
      <select v-model="selectedValue" class="select" @change="onChangeSelect">
        <option disabled value="">
          {{ config.default }}
        </option>
        <option v-for="(option,idx) in config.options" :key="idx" :value="idx">
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>
<script>
import hasKeys from '~/utils/hasKeys'
import isValidArray from '~/utils/isValidArray'
export const selectConfigs = [
  'label',
  'default',
  'options'
]
export default {
  props: {
    config: {
      type: Object,
      required: true,
      validator: (val) => {
        // objectにKeyがあるかどうかでバリデーションをかける
        return hasKeys(val, selectConfigs) && isValidArray(val.options)
      }
    },
    value: {
      type: String || Number,
      required: true
    }
  },
  data() {
    return {
      selectedValue: this.value
    }
  },
  methods: {
    onChangeSelect() {
      this.$emit('changeSelect', this.selectedValue)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/color";
  .form-group{
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 8px;
  }
  .select {
    border: 1px solid $color-gray;
    padding: 2px;
  }
</style>
