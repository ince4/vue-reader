<template>
  <div class="swiper" :auto="5000">
    <mt-swipe>
      <mt-swipe-item>
        <slot name="ad1"></slot>
      </mt-swipe-item>
      <mt-swipe-item>
        <slot name="ad2"></slot>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.swiper {
   .mint-swipe {
      width: 100vw;
      height: 38vw;
     .mint-swipe-indicator {
     opacity: 0.6;
     background: #808080;
     &.is-active {
     background: #f27b13;
     }
     }
  }
}
</style>
