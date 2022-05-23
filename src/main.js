import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import 'highlight.js/styles/default.css' // 代码高亮的样式
import directiveObj from '@/utils/directive.js'
import './VueComponent'
Vue.config.productionTip = false

Vue.use(directiveObj)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
