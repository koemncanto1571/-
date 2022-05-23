<template>
  <!-- 一条文章单元格 -->
  <div>
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ artObj.title }}</span>
          <img v-if="artObj.cover.type == 1" class="thumb" alt="" v-lazy="artObj.cover.images[0]">
          <!-- <van-image :src="artObj.cover.images[0]" v-if="artObj.cover.type == 1" class="thumb">
            <template v-slot:error>图片走丢了</template>
          </van-image> -->
        </div>
        <div class="thumb-box" v-if="artObj.cover.type > 1">
          <img alt="" v-for="{imgUrl,index} in artObj.cover.images" :key="index" class="thumb" v-lazy="imgUrl">
          <!-- <van-image :src="imgUrl" v-for="{imgUrl,index} in artObj.cover.images" :key="index" class="thumb">
            <template v-slot:error>图片走丢了</template>
          </van-image> -->
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ artObj.aut_name}}</span>
            <span>{{ artObj.comm_count}}评论</span>
            <span>{{ formatTime(artObj.pubdate) }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click.stop="show = true" v-if="isShow" />
        </div>
      </template>
    </van-cell>
    <van-action-sheet @close='closeFn' v-model="show" :actions="actions" @select="onSelect" get-container="body" :cancel-text="bottomText" @cancel="cancelFn" />
  </div>

</template>

<script>
import { timeAgo } from '@/utils/date.js'
import { firstActions, secondActions } from '@/api/report.js'
export default {
  data () {
    return {
      show: false,
      actions: firstActions,
      bottomText: '取消'
    }
  },
  props: {
    artObj: Object,
    isShow: {
      type: Boolean,
      default: true
    }

  },
  methods: {
    formatTime: timeAgo,
    onSelect (action) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // this.show = true
      if (action.name === '反馈垃圾内容') {
        // 证明点击的是反馈垃圾内容
        this.actions = secondActions
        this.bottomText = '返回'
      } else if (action.name === '不感兴趣') {
        this.$emit('disLikeEV', this.artObj.art_id)
        this.show = false
      } else {
        this.$emit('reportEV', this.artObj.art_id, action.value)
        this.actions = firstActions
        this.show = false
      }
    },
    cancelFn () {
      if (this.bottomText === '返回') {
        this.show = true
        this.actions = firstActions
        this.bottomText = '取消'
      }
    },
    closeFn () {
      this.actions = firstActions
      this.bottomText = '取消'
    }
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span{
    margin: 0 3px;
    &:first-child{
        margin-left: 0;
    }
}
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
