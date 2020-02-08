<template>
  <div class="collection">
      <div class="collection-empty">
        <div class="neko-img"> </div>
        <p>暂无收集！<br>请去发现更多内容吧</p>
      </div>
  </div>
</template>
<script>
export default {
  name: 'collection',
  data () {
    return {
      me: ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .collection {
    background: #f4f4f4;
    .collection-empty {
      padding-top: 18vh;
      .neko-img {
      height: 40vh;
      background: url('../assets/images/ojigi_animal_neko.png') no-repeat;
      background-size: contain;
      background-position: 50%;
      }
     p{
         text-align: center;
         line-height: 25px;
         font-size: 20px;
         color: #686464d2;
     }
    }
  }
</style>
