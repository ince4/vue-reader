<template>
  <div class="header">
    <mt-header fixed>
      <h1 class="title" slot="left">
          <slot name="title-text"></slot>
      </h1>
      <h3 slot="right" class="iconfont icon-sousuo1"></h3>
    </mt-header>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.header {
  .mint-header {
    height: 8vh;
    background: #f94040;
    box-shadow: 0 2px 6px 0px #f94040;
    .title {
      font-size: 2.5vh;
      font-weight: 600;
      letter-spacing: 0.4vw;
      font-family: 'SimSong';
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
