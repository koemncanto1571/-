<template>
  <div>
    <!-- 文章列表 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check='false' offset="50">
        <ArticleItem v-for="item in list" :key="item.art_id" :artObj='item' @disLikeEV='disLikeFn' @reportEV='reportFn' @click.native="itemClickFn(item.art_id)"></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '../../../components/AticleItem.vue'
import { getAllArticleListAPI, dislikeArticleAPI, reportArticleAPI } from '@/api/index.js'
import Notify from '@/ui/Notify.js'
export default {
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      theTime: new Date().getTime(),
      isLoading: false
    }
  },
  props: {
    channelId: Number
  },
  created () {
    this.getArticleListFn()
  },
  methods: {
    async getArticleListFn () {
      const res = await getAllArticleListAPI({
        channel_id: this.channelId,
        timestamp: this.theTime
      })
      this.list = [...this.list, ...res.data.data.results]
      this.theTime = res.data.data.pre_timestamp
      this.loading = false
      if (res.data.data.pre_timestamp === null) {
        this.finished = true
      }
      this.isLoading = false
    },
    async onLoad () {
      if (this.list.length === 0) {
        this.loading = false
        return
      }
      this.getArticleListFn()
    },
    async onRefresh () {
      this.list = []
      this.theTime = new Date().getTime()
      this.getArticleListFn()
    },
    async disLikeFn (id) {
      await dislikeArticleAPI({
        artId: id
      })
      Notify({ type: 'success', message: '反馈成功' })
    },
    async reportFn (id, value) {
      await reportArticleAPI({
        artId: id,
        type: value
      })
      Notify({ type: 'success', message: '举报成功' })
    },
    itemClickFn (id) {
      this.$router.push({
        path: `/detail?art_id=${id}`
      })
    }
  }
}
</script>
