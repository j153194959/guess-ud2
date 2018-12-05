<template>
  <div id="app" ref="app">
    <router-view :userInfo="userInfo" :againLogin2="againLogin2" @transferUser="getChild"></router-view>
    <div class="supernatant">
        <!-- 非资金帐号浮层 -->
        <div v-if="noNewIsShow" class="no_new_supernatant shade_supernatant">
          <div class="container container_supernatant">
            <div class="top">抱歉,请用普通资金帐号登录</div>
            <div class="bottom">
              <a @click="againLogin1" href="javascript:void(0);">确定</a>
              <a @click="closeMask" href="javascript:void(0);">取消</a>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      userInfo: { // 用户信息
        // isLogin: true, // 用户是否登录
        // isWechat: false, // 是否加载完成
        // account: '450045173', // 资金帐号
        // phone: '17621750993', // 电话号码
        // token: 'ceshi', // token值
        // client: 'ceshi', // client值
        // leftTimes: 0 // 剩余刮奖次数
        isLogin: false, // 用户是否登录
        isWechat: false, // 是否加载完成
        account: '', // 资金帐号
        phone: '', // 电话号码
        token: '', // token值
        client: '', // client值
        leftTimes: 0 // 剩余刮奖次数
      },
      noNewIsShow: false // 非资金账号浮层是否显示
    }
  },
  methods: {
    /**
     * cordova加载
     */
    cordovaLoad: function () {
      // 获取登录信息
      var that = this
      console.log('加载cordova')
      navigator.uniaccount.ulbAccLogin(function (data) {
        var response = data
        if (typeof data === 'string') {
          response = JSON.parse(response)
        }
        // alert(JSON.stringify(response))
        // 如果登录方式为兴证通方式则返回
        // alert(response.respBody.userinfo.accountType)
        if (response.respBody.userinfo.accountType !== '2') {
          that.noNewIsShow = true
          return
        }
        that.userInfo.isLogin = true
        var client = response.respBody.userinfo.clientId
        var token = response.respBody.logintoken
        var account = response.respBody.userinfo.fundAccount
        var phone = response.respBody.userinfo.mobile
        that.userInfo.client = client
        that.userInfo.token = token
        that.userInfo.account = account
        that.userInfo.phone = phone
        // that.$emit('transferUser', that.child)
        // alert('account: ' + account + '--client: ' + client + '--token: ' + token)
      }, function (data) {
        alert('未登录')
      }, {reloginflag: '2'})
    },
    /**
     * 接收子组件的值
     */
    getChild: function (msg) {
      // console.log(msg)
      this.userInfo.leftTimes = msg
    },
    /**
     * 重新登录方法2
     */
    againLogin2: function () {
      var that = this
      setTimeout(function () {
        navigator.uniaccount.ulbAccLogin(function (data) {
          var response = data
          if (typeof data === 'string') {
            response = JSON.parse(response)
          }
          // alert(JSON.stringify(response))
          if (response.respBody.userinfo.accountType !== '2') {
            that.noNewIsShow = true
            return
          }
          that.noNewIsShow = false
          that.userInfo.isLogin = true
          var client = response.respBody.userinfo.clientId
          var token = response.respBody.logintoken
          var account = response.respBody.userinfo.fundAccount
          var phone = response.respBody.userinfo.mobile
          that.userInfo.client = client
          that.userInfo.token = token
          that.userInfo.account = account
          that.userInfo.phone = phone
          // that.$emit('transferUser', that.child)
          // alert('account' + that.userInfo.account)
        }, function (data) {
          alert('登录失败')
        })
      }, 0)
    },
    /**
     * 重新登录方法1
     */
    againLogin1: function () {
      var that = this
      setTimeout(function () {
        navigator.uniaccount.ulbAccLogin(function (data) {
          var response = data
          if (typeof data === 'string') {
            response = JSON.parse(response)
          }
          // alert(JSON.stringify(response))
          if (response.respBody.userinfo.accountType !== '2') {
            that.noNewIsShow = true
            return
          }
          that.noNewIsShow = false
          that.userInfo.isLogin = true
          var client = response.respBody.userinfo.clientId
          var token = response.respBody.logintoken
          var account = response.respBody.userinfo.fundAccount
          var phone = response.respBody.userinfo.mobile
          that.userInfo.client = client
          that.userInfo.token = token
          that.userInfo.account = account
          that.userInfo.phone = phone
          // that.$emit('transferUser', that.child)
          // alert('account' + that.userInfo.account)
        }, function (data) {
          alert('登录失败')
        }, {'reloginflag': 1})
      }, 0)
    },
    /**
     * 关闭浮层
     */
    closeMask: function () {
      this.noNewIsShow = false
    }
  },
  beforeMount: function () {
    if (this.GLOBAL.isWeixin()) {
      this.userInfo.isWechat = true
      return
    }
    if (this.GLOBAL.browser.versions.mobile) { // 判断是否是移动设备打开。browser代码在下面
      var ua = navigator.userAgent.toLowerCase() // 获取判断用的对象
      if ((ua.match(/MicroMessenger/i) + '') === 'micromessenger' || (ua.match(/WeiBo/i) + '') === 'weibo') {
        this.userInfo.isWechat = true
        return
      }
    }
    var that = this
    var ulbTimer = setInterval(function () {
      if (navigator.uniaccount.ulbAccLogin) {
        that.cordovaLoad()
        clearInterval(ulbTimer)
      } else {
        console.log('1')
      }
    }, 300)
  }
}
</script>

<style lang="less">
html, body{
    height: 100%;
    ::-webkit-scrollbar {/*隐藏滚轮*/
      display: none;
    }
}
#app {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: #FFD5B1;
  > .supernatant{
    .shade_supernatant{
      position: fixed;
      z-index: 10;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.7);
      top: 0;
      left: 0;
      .container{
        width: 5.513889rem; /* 794px */
        height: 2.222222rem; /* 320px */
        background-color: #fff;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        border-radius: 0.173611rem; /* 25px */
        background-color: #fff;
        .top{
          padding: 0.451389rem 0; /* 65px */
          line-height: 0.395833rem; /* 57px */
          color: #666;
          font-size: 0.319444rem; /* 46px */
          text-align: center;
          border-bottom: 1px solid #efefef;
        }
        a{
          float: left;
          display: block;
          text-align: center;
          font-size: 0.319444rem; /* 46px */
          height: 0.902778rem; /* 130px */
          line-height: 0.902778rem; /* 130px */
          width: 50%;
          color: #666;
          &:first-child{
            border-right: 1px solid #efefef;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
</style>
