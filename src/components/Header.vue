<template>
  <div class="header">
    <mt-header fixed :title="title">
      <h1 class="left" slot="left">
          <slot name="left"/>
      </h1>
      <h3 slot="right">
         <slot name="right"/>
      </h3>
    </mt-header>
  </div>
</template>
<script>
export default {
  props: {
    title: String
  }
}
</script>
<style lang="scss" scoped>
.header {
    ::v-deep
  .mint-header {
    height: $HeaderHeight;
    z-index: 5;
    background: #f94040;
    box-shadow: 0 2px 6px 0px #f94040;
    .mint-header-title {
      font-weight: bold;
      font-size: 2.4vh;
      letter-spacing: .3vw;
      line-height: 2.6vh;
    }
    .left {
      font-size: 2.4vh;
      font-weight: 600;
      letter-spacing: 0.4vw;
      padding-left: 1.6vw;
    }
    h3 {
      font-size: 2.3vh;
      padding-top: 0.5vh;
      padding-right: 1vw;
    }
  }
}
</style>
