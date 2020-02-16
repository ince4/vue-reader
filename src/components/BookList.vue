<template>
  <div class="book-list">
    <h2>
      <slot name="icon"/>
      <p><slot name="title"/></p>
    </h2>
    <!-- 热门书籍列表 -->
    <div class="books">
      <div class="book" v-for="(item, index) of booksData.slice(0,listLength)" :key="index">
        <router-link :to="{ path: `book/${booksData[index]._id}`}">
          <book-view
          class="book-view"
          :SRC="HOST+booksData[index].cover">
            <template v-slot:title>
              {{booksData[index].title}}
            </template>
            <template v-slot:author>
              {{booksData[index].author}}
            </template>
            <template v-slot:intro>
              {{booksData[index].shortIntro}}
            </template>
          </book-view>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import BookView from './BookView'
export default {
  props: {
    booksData: Array,
    listLength: Number
  },
  data () {
    return {
      HOST: 'https://statics.zhuishushenqi.com'
    }
  },
  components: {
    BookView
  }
}
</script>
<style lang="scss" scoped>
.book-list {
  h2 {
    height: 6vh;
    margin: 3vh auto 0 2vw;
    span {
    font-size: 4vh;
    color: #f94040;
    }
    p {
      font-size: 2.4vh;
      font-family: 'Microsoft Yahei';
      letter-spacing: 0.1vw;
      display: inline-block;
      color: #f94040;
      font-weight: bold;
    }
  }
  .books {
    margin-top: 1vh;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    .book-view {
      margin-bottom: 2vh;
    }
  }
}
</style>
