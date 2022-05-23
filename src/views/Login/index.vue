<template>
  <div>
    <van-nav-bar title="黑马头条-登录" />
    <div>
      <van-form @submit="onSubmit">
        <van-field required v-model="user.mobile" name="mobile" label="手机号" placeholder="请输入11位手机号" :rules="[{ required: true, message: '请填写正确手机号',pattern:/^1[3-9]\d{9}$/ }]" />
        <van-field required v-model="user.code" type="password" name="code" label="密码" placeholder="请输入6位密码" :rules="[{ required: true, message: '请填写密码',pattern:/^\d{6}$/ }]" />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" :disabled='isLoading' :loading='isLoading' loading-text="加载中...">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api/index.js'
import Notify from '@/ui/Notify.js'
import { setToken } from '@/utils/token.js'
import { setStorage } from '../../utils/storage'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: '246810' // 246810
      },
      isLoading: false
    }
  },
  methods: {
    async onSubmit (values) {
      console.log('submit', values)
      this.isLoading = true
      try {
        const res = await loginAPI(this.user)
        console.log(res)
        Notify({ type: 'success', message: '登陆成功' })
        setToken(res.data.data.token)
        setStorage('refresh_token', res.data.data.refresh_token)
        this.$router.replace({
          path: this.$route.query.path || '/layout/home'
        })
      } catch (error) {
        Notify({ type: 'danger', message: '账号或密码错误' })
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
