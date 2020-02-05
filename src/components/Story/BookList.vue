<template>
  <div class="book-list">
    <h2>
      <slot name="icon"/>
      <p><slot name="title"/></p>
    </h2>
    <!-- 热门书籍列表 -->
    <div class="books">
        <book-view
        class="book-view"
        v-for="(item, index) of booksData"
        :key="index"
        :index="index"
        :SRC="HOST+booksData[index].cover">
          <template v-slot:title>
            {{booksData[index].title}}
          </template>
          <template v-slot:author>
            {{booksData[index].author}}
          </template>
          <template v-slot:intro>
            {{booksData[index].longIntro}}
          </template>
        </book-view>
    </div>
  </div>
</template>
<script>
import BookView from './BookView'
export default {
  props: {
    booksData: Array
  },
  data () {
    return {
      HOST: 'https://statics.zhuishushenqi.com'
    }
  },
  components: {
    BookView
  },
  mounted () {
    // console.log(this.booksData)
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
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    .book-view {
      margin-bottom: 1vh;
    }
  }
}
</style>
