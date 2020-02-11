<template>
  <div class="reader">
    <loading v-if="!isLoaded"/>
    <article v-else>
      <h1>{{cpTitle}}</h1>
      <p
      class="content"
      v-for="(item, index) of cpContent" 
      :key="index" 
      v-html="cpContent[index]">
      </p>
    </article>
  </div>
</template>
<script>
// import Loading from '../components/Loading'
import api from '../api/api.js'
import Loading from '../components/Loading'
export default {
  name: 'reader',
  // this.$route.params.bookId
  data () {
    return {
      chapters: [],
      cpTitle: '',
      cpIndex: this.$route.query.chapter - 1,
      cpContent: [],
      isLoaded: false
    }
  },
  components: {
    Loading
  },
  created () {
    this.getBookById(this.$route.query.bookId)
  },
  methods: {
    // 书籍信息
    getBookById: function (bookId) {
      api.getBookById(bookId)
        .then(res => {
          this.getBookSources(bookId)
        })
    },
    // 获取书源
    getBookSources: function (bookId) {
      api.getBookSources(bookId)
        .then(res => {
          this.getBookChapters(res.data[0]._id)
        })
    },
    // 根据书源获取章节
    getBookChapters: function (sourceId) {
      api.getBookChapters(sourceId)
        .then(res => {
          this.chapters = res.data.chapters
          this.getChapterContent(this.chapters[this.cpIndex].link)
        })
    },
    getChapterContent: function (link) {
      api.getChapterContent(link)
        .then(res => {
          if(res.data.chapter.isVip) {
            res.data.chapter.cpContent = '本章为付费章节，请至正版阅读平台订阅'
          }
          this.cpContent = res.data.chapter.cpContent.split('\r\n')
          this.cpContent = res.data.chapter.cpContent.split('\n')
          this.cpContent = this.cpContent.map(item =>  `<p>${item.trim()}</p>`)
          // this.cpContent = this.cpContent.join('')
          console.log(this.cpContent)
          this.cpTitle = res.data.chapter.title
          this.isLoaded = true
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.reader {
  // background: $backgroundColor;
  background: rgb(238, 230, 221);
  article {
    padding: 4vh 5vw;
    line-height: 1.5;
    h1 {
      font-weight: 400;
      color: #333;
      font-size: 20px;
    }
    .content {
      font-size: 16px;
      color: rgb(92, 93, 88);
      text-indent: 2em;
      text-align: justify;
      margin: .4em;
    }
  }
  
}
</style>
