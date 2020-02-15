<template>
  <div class="collection">
      <!-- <loading v-if="!isLoaded"/> -->
      <!-- 书架为空 -->
      <!-- <div class="collection-empty" v-else-if="isEmpty">
        <div class="neko-img"> </div>
        <p>书架为空！<br>请去发现更多内容吧</p>
      </div> -->
      <!--  -->
      <book-list :booksData="bookData" :listLength="bookData.length"/>
      {{bookData.length}}
  </div>
</template>
<script>
import Loading from '../components/Loading'
import BookList from '../components/BookList'
export default {
  name: 'collection',
  data () {
    return {
      me: '',
      // isLoaded: false
      isLoaded: true
    }
  },
  computed: {
    bookData () {
      let collections = this.$store.state.bookCollections
      collections = [...collections.values()]
      return collections
    },
    isEmpty () {
      return !this.$store.state.bookCollections.length
    }
  },
  components: {
    Loading,
    BookList
  }
}
</script>
<style lang="scss" scoped>
  .collection {
    background: #f4f4f4;
    .collection-empty {
      padding-top: 18vh;
      overflow: hidden;
      // $tabHeight: 55px;
      // height: calc( 100vh - #{$tabHeight} );
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
