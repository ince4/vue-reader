import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations: {
    isCollected (state, bookData) {
      if (!state.bookCollections.has(bookData._id)) {
        state.collected = false
      } else {
        state.collected = true
      }
    },
    addToCollections (state, bookData) {
      if (!state.bookCollections.has(bookData._id)) {
        state.bookCollections.set(bookData._id, bookData)
        state.collected = true
        localStorage.setItem('bookCollections', JSON.stringify([...state.bookCollections]))
      }
    },
    removeFromCollections (state, bookData) {
      if (state.bookCollections.has(bookData._id)) {
        state.bookCollections.delete(bookData._id)
        state.collected = false
        localStorage.setItem('bookCollections', JSON.stringify([...state.bookCollections]))
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
