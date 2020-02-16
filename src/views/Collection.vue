<template>
  <div class="collection">
      <div class="m-modal" v-if="popupVisible" @touchmove="popupInvisible" @click="popupInvisible"/>
      <loading v-if="!isLoaded"/>
      <!-- 书架为空 -->
      <div class="collection-empty" v-else-if="isEmpty">
        <div class="neko-img"> </div>
        <p>书架为空！<br>请去发现更多内容吧</p>
      </div>
      <div class="book-case" v-else>
        <!-- Header -->
        <m-header>
          <template v-slot:left>
            我的书架
          </template>
          <template v-slot:right>
            <span @click="popUp" class="iconfont icon-xiazai9"/>
          </template>
        </m-header>
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" :modal=false>
          <div class="down">
            <div class="batch">
              <span class="iconfont icon-piliangguanli"/>
              <span>批量操作</span>
            </div>
          </div>
        </mt-popup>
        <!-- 书籍列表 -->
        <div class="book-list">
          <div
          class="book"
          v-for="(item, index) of booksData"
          :key="index"
          @click="goToRead(index)">
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
                {{booksData[index].longIntro.replace(/[\s]/g,'')}}
              </template>
            </book-view>
            <div class="check-box iconfont"
            ref="checkBox"
            :class="{'icon-check_box': !item.isChecked,
            'icon-checkbox': item.isChecked}">
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import Loading from '../components/Loading'
import Header from '../components/Header'
import BookView from '../components/BookView'
export default {
  name: 'collection',
  data () {
    return {
      HOST: 'https://statics.zhuishushenqi.com',
      me: '',
      // isLoaded: false
      isLoaded: true,
      popupVisible: false
    }
  },
  computed: {
    booksData () {
      let collections = this.$store.state.bookCollections
      collections = [...collections.values()].reverse()
      collections = collections.map((item) => {
        item.isChecked = false
        return item
      })
      return collections
    },
    isEmpty () {
      return !this.$store.state.bookCollections.size
    }
  },
  components: {
    Loading,
    BookView,
    'm-header': Header
  },
  methods: {
    popUp: function () {
      this.popupVisible = true
    },
    popupInvisible: function () {
      this.popupVisible = false
      console.log(this.$refs.routerLink)
    },
    goToRead: function (index) {
      this.$router.push({
        name: 'reader',
        query: { bookId: this.booksData[index]._id, chapter: 1 }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.collection {
  @include wrap-scroll;
  margin-top: 0;
  height: calc(100vh - #{$tabBarHeight});
  .m-modal {
    height: calc(100vh - #{$tabBarHeight});
    width: 100vw;
    z-index: 2000;
    position: absolute;
  }
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
  .book-case {
    position: relative;
    .book-list {
      margin-top: 9vh;
      .book {
        position: relative;
        .check-box {
          color: rgb(105, 105, 105);
          font-size: 4vh;
          position: absolute;
          top: 5vh;
          left: 85vw;
          width: 4vh;
          height: 4vh;
        }
      }
    }
    .mint-popup {
      background-color: #fff;
      border-radius: 5%;
      width: 15vh;
      position: fixed;
      top: 8vh;
      left: calc(100vw - 7.5vh);
      display: flex;
      justify-content: center;
      &::before {
        content:'';
        transform: rotate(45deg);
        background: #fff;
        width: 1.5vh;
        height: 1.5vh;
        position: fixed;
        left: calc(15vh - .75vh - 1vw - 1.15vh - 9px);
        top: -.6vh;
        // top: -1vw;
        z-index: -10;
        // right: -22vw;
      }
      .down {
      color: rgb(70, 70, 70);
      padding: 1vh;
        div {
          display: flex;
          flex-direction: row;
          padding: 1vh 0;
          span {
            white-space: nowrap;
            font-size: 2vh;
            &:nth-of-type(2) {
              padding-left: 1vh;
            }
          }
        }
      }
    }
  }
}
</style>
