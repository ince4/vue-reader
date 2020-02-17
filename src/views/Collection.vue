<template>
  <div class="collection">
      <div class="m-modal" v-if="popupVisible" @touchend.prevent="popupInvisible($event)"/>
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
            <span v-if="!isEditing">我的书架</span>
            <span v-else class="iconfont icon-fanhui" @click="editing"></span>
          </template>
          <template v-slot:right>
            <span v-if="!isEditing" @click="popUp" class="iconfont icon-xiazai9"/>
          </template>
        </m-header>
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" :modal=false>
          <div class="down">
            <div class="batch" @click="editing">
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
          @click="!isEditing && goToRead(index);isEditing && thisChecked(item)">
            <book-view
            class="book-view"
            :SRC="HOST+booksData[index].cover">
              <template v-slot:title>
                {{booksData[index].title}}
              </template>
              <template v-slot:author>
                {{booksData[index].author}}
              </template>
              <template v-slot:intro v-if="!isEditing">
                {{booksData[index].longIntro.replace(/[\s]/g,'')}}
              </template>
            </book-view>
            <!-- check-box -->
            <div class="check-box iconfont"
            v-if="isEditing"
            ref="checkBox"
            :class="{'icon-check_box': !item.isChecked,
            'icon-checkbox': item.isChecked}">
            </div>
          </div>
        </div>
        <div class="editingTab" v-if="isEditing">
          <span @click="selectAll" class="iconfont icon-zu"> 全选</span>
          <span @click="selectedDelete" class="iconfont icon-lajitong-copy"> 移除</span>
        </div>
      </div>
  </div>
</template>
<script>
import Loading from '../components/Loading'
import Header from '../components/Header'
import BookView from '../components/BookView'
import { MessageBox } from 'mint-ui'
export default {
  name: 'collection',
  data () {
    return {
      HOST: 'https://statics.zhuishushenqi.com',
      me: '',
      isLoaded: true,
      popupVisible: false,
      isEditing: false,
      booksData: []
    }
  },
  computed: {
    collections () {
      return this.$store.state.bookCollections
    },
    isEmpty () {
      return !this.$store.state.bookCollections.size
    }
  },
  created () {
    this.booksData = this.fromOriginCollections(this.collections)
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
    popupInvisible: function (e) {
      this.popupVisible = false
    },
    fromOriginCollections: function (originCollections) {
      let collections = originCollections
      collections = [...collections.values()].reverse()
      collections = collections.map((item) => {
        item.isChecked = false
        return item
      })
      return collections
    },
    goToRead: function (index) {
      this.$router.push({
        name: 'reader',
        query: { bookId: this.booksData[index]._id, chapter: 1 }
      })
    },
    editing: function () {
      this.isEditing = !this.isEditing
      this.popupVisible = false
    },
    thisChecked: function (item) {
      // this.$set(item, 'isChecked', !isChecked)
      item.isChecked = !item.isChecked
      this.$forceUpdate()
    },
    selectAll: function () {
      let isAllChecked = this.booksData.every(item => {
        return item.isChecked === true
      })
      if (!isAllChecked) {
        this.booksData = this.booksData.map(item => {
          item.isChecked = true
          return item
        })
      } else {
        this.booksData = this.booksData.map(item => {
          item.isChecked = false
          return item
        })
      }
    },
    selectedDelete: function () {
      let checkedItems
      MessageBox.confirm('是否将选中书籍移出书架')
        .then(action => {
          checkedItems = this.booksData.filter((item, index) => {
            return item.isChecked === true
          })
          checkedItems.map(item => {
            this.$store.commit('removeFromCollections', item)
          })
          this.booksData = this.fromOriginCollections(this.collections)
        })
        .catch(() => 0)
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
    .editingTab {
      height: 55px;
      width: 100vw;
      top: calc(100vh - 55px);
      z-index: 20;
      background: #fafafa;
      position: fixed;
      display: flex;
      justify-content: space-around;
      align-items: center;

      span {
        font-size: 16px;
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
