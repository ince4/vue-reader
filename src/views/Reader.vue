<template>
  <div class="reader">
    <!-- header -->
    <m-header v-show="onSetting" :title="bookTitle">
       <template v-slot:left>
          <span class="iconfont icon-fanhui" @click="$router.go(-1)"/>
      </template>
    </m-header>
    <loading v-if="!isLoaded"/>
    <!-- 章节内容 -->
    <article v-else @click="setting"  ref="article">
      <h1 :class="{'inDark':darkBackground,'':!darkBackground}" :style="{fontSize:fontSize+4+'px'}">
        {{cpTitle}}
      </h1>
      <p
      :style="{fontSize:fontSize+'px'}"
      class="content"
      :class="{'inDark':darkBackground,'':!darkBackground}"
      v-for="(item, index) of cpContent"
      :key="index"
      v-html="cpContent[index]">
      </p>
    </article>
    <!-- 底部操作面板 -->
    <settings
    ref="setting"
    v-show="onSetting"
    :fontSize="fontSize"
    @chapterChange="chapterChange"
    @colorChange="colorChange"
    @fontSizeChange="fontSizeChange"
    >
    </settings>
  </div>
</template>
<script>
import api from '../api/api.js'
import Loading from '../components/Loading'
import Header from '../components/Header'
import Settings from '../components/Reader/Settings'
export default {
  name: 'reader',
  data () {
    return {
      bookTitle: '',
      chapters: [],
      cpTitle: '',
      cpIndex: this.$route.query.chapter - 1,
      cpContent: [],
      isLoaded: false,
      onSetting: true,
      darkBackground: false,
      displayChanging: false,
      fontSize: 16
    }
  },
  components: {
    Loading,
    Settings,
    'm-header': Header
  },
  created () {
    this.getBookById(this.$route.query.bookId)
  },
  methods: {
    // 书籍信息
    getBookById: function (bookId) {
      api.getBookById(bookId)
        .then(res => {
          this.bookTitle = res.data.title
          this.getBookSources(bookId)
          // console.log('书籍信息', res.data)
        })
    },
    // 获取书源
    getBookSources: function (bookId) {
      api.getBookSources(bookId)
        .then(res => {
          this.getBookChapters(res.data[0]._id)
          // console.log('获取书源', res.data)
        })
    },
    // 根据书源获取章节
    getBookChapters: function (sourceId) {
      api.getBookChapters(sourceId)
        .then(res => {
          this.chapters = res.data.chapters
          this.getChapterContent(this.chapters[this.cpIndex].link)
          // console.log('获取章节', res.data)
        })
    },
    // 获取章节内容
    getChapterContent: function (link) {
      api.getChapterContent(link)
        .then(res => {
          if (res.data.chapter.isVip) {
            res.data.chapter.cpContent = '本章为付费章节，请至正版阅读平台订阅'
          }
          this.cpContent = res.data.chapter.cpContent.split('\r\n')
          this.cpContent = res.data.chapter.cpContent.split('\n')
          this.cpContent = this.cpContent.map(item => `${item.trim()}`)
          // this.cpContent = this.cpContent.join('')
          this.cpTitle = res.data.chapter.title
          this.isLoaded = true
          // console.log('章节内容', res.data)
        })
        .catch(res => {
          this.isLoaded = true
          res.data.chapter.cpContent = '获取章节信息失败'
        })
    },
    setting () {
      this.onSetting = !this.onSetting
      this.$refs.setting.showOptions()
    },
    chapterChange (to) {
      if (this.cpIndex + to >= 0 && this.cpIndex + to < this.chapters.length - 1) {
        this.cpIndex += to
        this.getChapterContent(this.chapters[this.cpIndex].link)
      }
    },
    colorChange (backgroundColor) {
      this.$refs.article.style.backgroundColor = backgroundColor
      if (backgroundColor === '#2c2c2c') {
        this.darkBackground = true
      } else {
        this.darkBackground = false
      }
    },
    fontSizeChange (fontSize) {
      this.fontSize = fontSize
    }
  }
}
</script>
<style lang="scss" scoped>
.reader {
  // background: $backgroundColor;
  background: rgb(238, 230, 221);
   ::v-deep
  .mint-header {
    background-color:rgba(50, 51, 52, 0.9);
    box-shadow: 0 1px 2px 0px rgba(50, 51, 52, 0.9);
    z-index: 3;
  }
  article {
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 3vh 5vw;
    line-height: 1.5;
    height: 93vh;
    h1 {
      font-weight: 400;
      color: #333;
      font-size: 20px;
      margin-bottom: 2vh;
      &.inDark {
        color: rgb(170, 170, 170);
      }
    }
    .content {
      font-size: 16px;
      color: rgb(92, 93, 88);
      text-indent: 2em;
      text-align: justify;
      margin: .4em;
      &.inDark {
        color: rgb(170, 170, 170);
      }
    }
  }
}
</style>
