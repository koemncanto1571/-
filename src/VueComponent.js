import Vue from 'vue'
import { Search, NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Popup, Row, Col, Badge, Image as VanImage, Divider, CellGroup, Tag, Dialog, DatetimePicker, Loading, Lazyload, Toast } from 'vant'

Vue.use(Toast)
Vue.use(Lazyload, {
  preLoad: 0.8,
  error: 'http://twcomputer.wsxdn.com/software/UploadFiles_4648/201607/2016070516080271.jpg'
})
Vue.use(Loading)
Vue.use(DatetimePicker)
// 全局注册
Vue.use(Dialog)
Vue.use(CellGroup)
Vue.use(Tag)
Vue.use(VanImage)
Vue.use(Divider)
Vue.use(Popup)
Vue.use(Search)
Vue.use(Row)
Vue.use(Col)
Vue.use(Badge)
Vue.use(ActionSheet)
Vue.use(PullRefresh)

Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Cell)

Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)

Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(NavBar)
