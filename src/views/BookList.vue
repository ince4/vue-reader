<template>
  <div class="booklist">
    <loading v-if="!isLoaded"/>
    <div v-else>
    <!-- header -->
    <m-header :title="this.$route.query.major">
      <template v-slot:left>
        <span class="iconfont icon-fanhui" @click="$router.go(-1)"/>
      </template>
    </m-header>
    <!-- 书籍列表 -->
    <book-list :booksData="booksData" :listLength="15">
    </book-list>
    </div>
  </div>
</template>
<script>
import Loading from '../components/Loading'
import Header from '../components/Header'
import BookList from '../components/BookList'
import api from '../api/api.js'
export default {
  name: 'booklist',
  data () {
    return {
      isLoaded: false,
      booksData: [],
      typeList: [
        {
          id: 'hot',
          name: '热门'
        },
        {
          id: 'new',
          name: '新书'
        },
        {
          id: 'reputation',
          name: '好评'
        },
        {
          id: 'over',
          name: '完结'
        },
        {
          id: 'monthly',
          name: '包月'
        }
      ]
    }
  },
  created () {
    api.getBooks(this.$route.query.gender, this.typeList[0].id, this.$route.query.major, '', 0, 15)
      .then(res => {
        this.booksData = res.data.books
        console.log(this.bookData)
        this.isLoaded = true
      })
  },
  components: {
    'm-header': Header,
    Loading,
    BookList
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.booklist {
  @include wrap-scroll;
}
</style>
