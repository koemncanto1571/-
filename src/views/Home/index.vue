<template>
  <div>
    <div>
      <van-nav-bar fixed>
        <template #left>
          <img src="@/assets/toutiao_logo.png" alt="" class="logo">
        </template>
        <template #right>
          <van-icon name="search" size="0.48rem" color="#fff" @click="moveSearchPageFn" />
        </template>
      </van-nav-bar>
    </div>
    <div class="main">
      <van-tabs v-model="channelId" sticky offset-top="1.226rem" animated @change="changeClickFn">
        <van-tab :title="item.name" v-for="(item) in userChannelList" :key="item.id" :name="item.id">
          <ArticleList :channelId='channelId'></ArticleList>
        </van-tab>
      </van-tabs>
      <van-icon name="plus" size="0.37333334rem" class="moreChannels" @click="showPopup" />
    </div>
    <van-popup v-model="show" get-container="body" class="channel_popup">
      <ChannelEdit :userList='userChannelList' :unCheckList='unCheckChannelList' @addChannelEV='addChannelFn' @removeChannelEV='removeChannelFn' @closeEV='closeFn' ref="editRef" v-model="channelId"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelsAPI, getAllChannelsAPI, updateChannelsAPI, removeChannelAPI } from '@/api/index.js'
import ArticleList from '@/views/Home/components/AticleList.vue'
import ChannelEdit from './ChannelEdit.vue'
export default {
  data () {
    return {
      channelId: 0,
      userChannelList: [],
      allChannelList: [],
      show: false,
      channelScrollTObj: {}
      // articleList: []
    }
  },
  components: { ArticleList, ChannelEdit },
  async created () {
    const { data: { data } } = await getUserChannelsAPI()
    // console.log(data)
    this.userChannelList = data.channels
    // console.log(this.userChannelList)
    const res = await getAllChannelsAPI()
    // console.log(res)
    this.allChannelList = res.data.data.channels
    // console.log(this.allChannelList)
  },
  methods: {
    showPopup () {
      this.show = true
    },
    async addChannelFn (channelObj) {
      this.userChannelList.push(channelObj)
      // this.userChannelList.forEach((obj, index) => {
      //   delete obj.name
      //   obj.seq = index
      // })
      const newArr = this.userChannelList.filter(obj => obj.id !== 0)
      const res = await updateChannelsAPI({
        channels: newArr
      })
      console.log(res)
    },
    async removeChannelFn (channelObj) {
      const index = this.userChannelList.findIndex(obj => obj.id === channelObj.id)
      this.userChannelList.splice(index, 1)
      const res = await removeChannelAPI({
        channelId: channelObj.id
      })
      console.log(res)
    },
    closeFn () {
      this.show = false
      this.$refs.editRef.isEdit = false
    },
    moveSearchPageFn () {
      this.$router.push('/search')
    },
    scrollFn () {
      this.$route.meta.scrollT = document.documentElement.scrollTop
      this.channelScrollTObj[this.channelId] = document.documentElement.scrollTop
    },
    changeClickFn () {
      this.$nextTick(() => {
        document.documentElement.scrollTop = this.channelScrollTObj[this.channelId]
      })
    }
  },
  computed: {
    unCheckChannelList () {
      const newArr = this.allChannelList.filter(item => {
        const index = this.userChannelList.findIndex(i => {
          return item.id === i.id
        })
        if (index > -1) {
          return false
        } else {
          return true
        }
      })
      return newArr
      //  return this.allChannelList.filter(item => this.userChannelList.findIndex(i => i.id === item.id) === -1)
    }
  },
  activated () {
    window.addEventListener('scroll', this.scrollFn)
    document.documentElement.scrollTop = this.$route.meta.scrollT
  },
  deactivated () {
    window.removeEventListener('scroll', this.scrollFn)
  }
}
</script>

<style lang="less" scoped>
.logo{
  width: 100px;
  height: 30px;
}
.main {
  margin-top: 46px;
}
// 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
.channel_popup{
  width: 100vw;
  height: 100vh;
}
</style>
