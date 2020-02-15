<template>
  <div class="book-view">
      <img class="cover" :src="SRC" alt="书籝尝面">
      <div class="info">
        <h2 class="title"><slot name="title"/></h2>
        <h3 class="author"><slot name="author"/></h3>
        <p class="intro"><slot name="intro"/></p>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    SRC: String
  }
}
</script>
<style lang="scss" scoped>
.book-view {
  padding-left: 2vw;
  width: 100vw;
  .cover {
    margin-bottom: 2vh;
    width: 10vh;
    display: inline-block;
    vertical-align: top;
  }
  .info {
    display: inline-block;
    width: calc(92vw - 10vh);
    padding-top: 2vw;
    padding-left: 2vw;
    .title {
      // color: #d38e8eda;
      color: #585555;
      font-size: 2vh;
      font-weight: bold;
      // font-family: 'Microsoft Yahei';
    }
    .author {
      font-size: 1.8vh;
      margin-top: 1vh;
      color: #bcbcbc;
    }
    .intro {
      text-overflow:ellipsis;
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #bcbcbc;
      font-size: 1.8vh;
      margin-top: 1.6vh;
      line-height: 2.4vh;
    }
  }
}
</style>
