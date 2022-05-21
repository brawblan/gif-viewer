import Vue from 'vue'
import Vuex from 'vuex'
import GifService from '../services/gif-service/gif-service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    query: '',
    gifs: [],
    searchHistory: [],
    page: 1,
  },
  getters: {
    getAllState: (state) => state
  },
  actions: {
    setCurrentQuery(state, payload) {
      state.commit('setCurrentQuery', payload)
    },
    async setGifs(state) {
      const query = this.state.query
      const page = this.state.page
      const gifs = await GifService.getGifsFromApi(query, page)
      state.commit('setGifs', gifs)
    },
    setSearchHistory(state, payload) {
      state.commit('setSearchHistory', payload)
    },
    removeFromHistory(state, payload) {
      state.commit('removeFromHistory', payload)
    },
    setCurrentPage(state, payload) {
      state.commit('setCurrentPage', payload)
    }
  },
  mutations: {
    setCurrentQuery(state, payload) {
      state.query = payload
    },
    setGifs(state, payload) {
      state.gifs = payload
    },
    setSearchHistory(state, payload) {
      !state.searchHistory.includes(payload) ?
        state.searchHistory.unshift(payload) :
        null
    },
    removeFromHistory(state, payload) {
      const index = state.searchHistory.indexOf(payload)
      state.searchHistory.splice(index, 1)
    },
    setCurrentPage(state, payload) {
      console.log(payload);
      state.page = payload
    }
  }
})