import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userPhoto: 'https://p5.ssl.qhimgs1.com/sdr/400__/t013f5efcfb02eba705.jpg'
  },
  mutations: {
    SET_USERPHOTO (state, value) {
      state.userPhoto = value
    }
  },
  actions: {
  },
  modules: {
  }
})
