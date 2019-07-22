<template>
  <div class="accordion">
    <!-- accordion component -->
    <div>
      <div class="accordion-header" @click="openAccordion">
        <h2>{{ label }}</h2>
        <fa-icon v-if="isOpen" icon="plus" />
        <fa-icon v-else icon="minus" />
      </div>
    </div>
    <!-- contents -->
    <transition
      name="js-accordion"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div
        v-show="isOpen"
        class="js-accordion--target accordion-contents"
        :class="{ '_state-open': isOpen }"
      >
        <div class="slot-wrapper">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  // TODO: refactor
  props: {
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    openAccordion() {
      this.isOpen = !this.isOpen
    },
    beforeEnter: function (el) {
      el.style.height = '0'
    },
    enter: function (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    beforeLeave: function (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    leave: function (el) {
      el.style.height = '0'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/color";
.accordion-header {
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;

}
.accordion-contents {
  border: 1px solid $color-gray;
  .slot-wrapper {
    margin: 12px 8px;
  }
}

.js-accordion {
  &--target {
    transition: height 0.4s ease-in-out;
    overflow-y: hidden;
  }
  &-enter-active {
    animation-duration: 0.4s;
    animation-fill-mode: both;
    animation-name: js-accordion--anime__opend;
  }
  &-leave-active {
    animation-duration: 0.4s;
    animation-fill-mode: both;
    animation-name: js-accordion--anime__closed;
  }
}
@keyframes js-accordion--anime__opend {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes js-accordion--anime__closed {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
