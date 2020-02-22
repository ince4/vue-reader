<template>
  <div class="booklist">
    <loading v-if="!isLoaded"/>
    <mt-loadmore :bottom-method="loadMore" @bottom-status-change="statusChange" ref="loadmore" v-else>
      <!-- header -->
      <m-header :title="this.$route.query.major">
        <template v-slot:left>
          <span class="iconfont icon-fanhui" @click="$router.go(-1)"/>
        </template>
      </m-header>
      <!-- tags -->
      <ul class="tab">
        <li
        class="tags"
        v-for="item of typeList"
        :key="item.id"
        :class="{'active': tagActive === item.order, '': tagActive !== item.order}"
        @click="tagSelected(item.order)">
          {{item.name}}
        </li>
      </ul>
      <!-- 书籍列表 -->
      <book-list :booksData="booksData" :listLength="displayNum"/>
    </mt-loadmore>
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
          order: 0,
          id: 'hot',
          name: '热门'
        },
        {
          order: 1,
          id: 'new',
          name: '新书'
        },
        {
          order: 2,
          id: 'reputation',
          name: '好评'
        },
        {
          order: 3,
          id: 'over',
          name: '完结'
        },
        {
          order: 4,
          id: 'monthly',
          name: '包月'
        }
      ],
      tagActive: 0,
      displayNum: 15,
      maxDistance: 80
    }
  },
  created () {
    api.getBooks(this.$route.query.gender, this.typeList[0].id, this.$route.query.major, '', 0, 15)
      .then(res => {
        this.booksData = res.data.books
        this.isLoaded = true
      })
  },
  components: {
    'm-header': Header,
    Loading,
    BookList
  },
  methods: {
    tagSelected: function (order) {
      this.tagActive = order
      this.isLoaded = false
      api.getBooks(this.$route.query.gender, this.typeList[this.tagActive].id, this.$route.query.major, '', 0, 15)
        .then(res => {
          this.booksData = res.data.books
          this.isLoaded = true
        })
    },
    statusChange: function (status) {
      if (status === 'pull') {
        this.$refs.loadmore.onBottomLoaded()
      }
    },
    loadMore: function () {
      this.$refs.loadmore.maxDistance = this.maxDistance
      this.$refs.loadmore.bottomLoadingText = '载入中...'
      this.displayNum = this.displayNum + 15 > 50 ? 50 : this.displayNum + 15
      api.getBooks(this.$route.query.gender, this.typeList[this.tagActive].id, this.$route.query.major, '', 0, this.displayNum)
        .then(res => {
          this.booksData = res.data.books
          this.isLoaded = true
          // this.$forceUpdate()
        })
      this.$refs.loadmore.onBottomLoaded()
    }
  }
}
</script>
<style lang="scss" scoped>
.booklist {
  @include wrap-scroll;
  height: calc(100vh - 85px);
  margin-top: calc(30px);
  .tab {
    width: 100vw;
    position: fixed;
    background: rgb(255, 255, 255);
    height: 40px;
    top: 6.8vh;
    white-space: nowrap;
    .tags {
      display: inline-block;
      font-size: 13px;
      padding: 0 10px;
      height: 100%;
      line-height: 40px;
      color: #666;
      &.active {
        color: #f94040;
      }
    }
  }
}
</style>
