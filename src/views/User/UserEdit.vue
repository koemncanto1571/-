<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image round class="avatar" :src="profileObj.photo" @click="imgClickFn" />
          <!-- file 选择框 -->
          <input type="file" ref="iptFile" v-show="false" accept="image/*" @change="onFileChange" />
        </template>
      </van-cell>
      <van-cell title="名称" is-link :value="profileObj.name" @click="nameClickFn" />
      <van-cell title="生日" is-link :value="profileObj.birthday" @click="birthdayClickFn" />
    </van-cell-group>
    <van-dialog v-model="show" title="标题" show-cancel-button :before-close="beforeCloseFn">
      <input type="text" v-fofo v-model="inputUserName" ref="inputs" />
    </van-dialog>
    <van-popup v-model="dateTimePickerShow" position="bottom" round>
      <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @cancel="dateTimePickerFn" @confirm="confirmFn" />
    </van-popup>
  </div>
</template>

<script>
import { userProFileAPI, updateUserPhotoAPI, updateUserProfileAPI } from '@/api/index.js'
import { formatDate } from '@/utils/date.js'
import Notify from '@/ui/Notify.js'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      profileObj: [],
      show: false,
      inputUserName: '',
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      dateTimePickerShow: false
    }
  },
  name: 'UserEdit',
  async created () {
    const res = await userProFileAPI()
    this.profileObj = res.data.data
    console.log(this.profileObj)
  },
  methods: {
    ...mapMutations(['SET_USERPHOTO']),
    async onFileChange (e) {
      if (e.target.files.length === 0) return
      console.log(e.target.files[0])
      const theFd = new FormData()
      theFd.append('photo', e.target.files[0])
      console.log(theFd)
      const res = await updateUserPhotoAPI(theFd)
      console.log(res)
      this.profileObj.photo = res.data.data.photo
      this.SET_USERPHOTO(res.data.data.photo)
    },
    imgClickFn () {
      this.$refs.iptFile.click()
    },
    nameClickFn () {
      this.show = true
      this.inputUserName = this.profileObj.name
    },
    async beforeCloseFn (action, done) {
      if (action === 'confirm') {
        const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,7}$/
        if (reg.test(this.inputUserName) === true) {
          await updateUserProfileAPI({
            name: this.inputUserName
          })
          this.profileObj.name = this.inputUserName
          done()
        } else {
          Notify({ type: 'warning', message: '用户名只能是1-7位中英文数字组合' })
          done(false)
        }
      } else {
        done()
      }
    },
    birthdayClickFn () {
      this.dateTimePickerShow = true
      this.currentDate = new Date(this.profileObj.birthday)
      console.log(this.currentDate)
    },
    dateTimePickerFn () {
      this.dateTimePickerShow = false
    },
    async confirmFn () {
      await updateUserProfileAPI({
        birthday: formatDate(this.currentDate)
      })
      this.dateTimePickerShow = false
      this.profileObj.birthday = formatDate(this.currentDate)
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
/deep/ .van-dialog__content{
  text-align: center;
  input{
    padding: 0;
    outline: none;
    border: none;
    text-align: center;
  }
}
</style>
