<template>
  <div class="scratch-card">
      <div class="leftTimes">今日剩余次数：{{userInfo.leftTimes}}</div>
      <div ref="bg" class="bg">
        <p>{{this.getTxt1}}<br>{{this.getTxt2}}</p>
      </div>
      <canvas ref="canvas">您的浏览器不支持 HTML5 canvas 标签。</canvas>
      <div v-if="scratchIsShow" class="click"><a @click="scratch" href="javascript:void(0);">点我刮开</a></div>
      <a @click="lookMore" href="javascript:void(0);">查看我的筹码纪录</a>
      <img ref="img1" src="../assets/刮奖区.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'Scratch-card',
  data () {
    return {
      scratchIsShow: true, // 点击刮开是否显示
      getTxt1: '', // 获取的奖品
      getTxt2: '' // 获取的奖品
    }
  },
  props: ['userInfo'], // 接收父组件的值
  methods: {
    /**
     * 点击刮开
     */
    scratch: function () {
      // 猜涨跌二期_刮刮乐页_刮开 埋点
      TDAPP.onEvent("猜涨跌二期_刮刮乐页_刮开","",{})
      if (!this.userInfo.leftTimes) return
      this.$ajax({
        'url': '/scratchcard',
        params: {
          account: this.userInfo.account,
          Token: this.userInfo.token,
          Client: this.userInfo.client
        }
      }).then((res) => {
        // console.log(res.data)
        // var resp = {
        //   'respbody': {
        //     'id': '20171122160038', // 编号
        //     'name': '游戏筹码10个', // 名称
        //     'rate': 3500, // 无关
        //     'price': 0 // 中奖筹码数量(没中奖时为0)
        //   },
        //   'resphead': {
        //     'respcode': '0000',
        //     'respdetails': '成功'
        //   }
        // }
        if (res.data.resphead.respcode === '0000') {
          var price = res.data.respbody.price
          if (price === 0) {
            this.$refs.bg.style.background = '#FFF5DF'
            this.getTxt1 = '很遗憾，'
            this.getTxt2 = '明天再试~'
          } else {
            this.getTxt1 = '恭喜您！获得'
            this.getTxt2 = '游戏筹码' + price + '个'
          }
          this.scratchIsShow = false
          if (!this.userInfo.leftTimes) return
          this.userInfo.leftTimes --
        } else if (res.data.resphead.respcode === '1115') {
          alert('今天机会已经用完了,明天再来吧!')
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    /**
     * 刮刮乐布置
     */
    setCanvas: function () {
      var canvas = this.$refs.canvas
      var context = canvas.getContext('2d')
      var canvasW = canvas.getBoundingClientRect().width
      var canvasH = canvas.getBoundingClientRect().height
      // var left = canvas.getBoundingClientRect().left
      var img1 = this.$refs.img1
      var imgData1 = context.getImageData(0, 0, canvasW, canvasH)
      console.log(imgData1)
      console.log('canvasW: ' + canvasW + ', canvasH: ' + canvasH)
      // alert('canvasW: ' + canvasW + '--result: ' + (canvasW - canvas.getBoundingClientRect().left))
      context.fillStyle = "#ccc"
      context.fillRect(0, 0, canvasW + 50, canvasH + 50)
      context.drawImage(img1, 0, 0, 1000, 430, 0, 0, canvasW + 50, canvasH + 50)
      context.globalCompositeOperation = 'destination-out' // 让填充的颜色透明
      // alert(img1)
      canvas.addEventListener('touchmove', function (event) {
        event.preventDefault() // 先去除默认的响应行为
        var touch = event.touches[0] // 获取触摸的第一个点
        context.beginPath() // 开始路径的绘制
        context.arc(touch.pageX - canvas.offsetLeft, touch.pageY - canvas.offsetTop, 20, 0, Math.PI * 2) // 在所触摸处绘制圆形，半径为20像素
        context.closePath() // 结束路径绘制
        context.fillStyle = '#fff' // 随意设置一种绘制颜色
        context.fill() // 填充该颜色
      })
    },
    /**
     * 点击 查看更多
     */
    lookMore: function () {
      // 猜涨跌二期_筹码页_刮刮乐页入口 埋点
      TDAPP.onEvent("猜涨跌二期_筹码页_刮刮乐页入口","",{})
      window.location.href = '#/More'
    }
  },
  beforeMount: function () {
    // var img1 = this.$refs.img1
    // var that = this
    // img1.onload = () => {
    //   that.setCanvas()
    // }
    // setTimeout(() => {
    //   this.setCanvas()
    // }, 1000)
  },
  mounted: function () {
    var img1 = this.$refs.img1
    var that = this
    img1.onload = () => {
      // var canvas = this.$refs.canvas
      // var canvasW = canvas.getBoundingClientRect().width
      // var canvasH = canvas.getBoundingClientRect().height
      // canvas.style.width = canvasW + 'px'
      // canvas.style.height = canvasH + 'px'
      that.setCanvas()
    }
    console.log(this.userInfo)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.scratch-card{
  width: 100%;
  height: 100%;
  background: url('../assets/刮刮乐bg.png') no-repeat;
  background-size: cover;
  padding-top: 5.208333rem; /* 750 */
  box-sizing: border-box;
  position: relative;
  .leftTimes{
    width: 4.583333rem; /* 660 */
    height: .597222rem; /* 86 */
    line-height: .597222rem; /* 86 */
    text-align: center;
    color: #fff;
    background-color: #FF3312;
    border-radius: .298611rem; /* 43 */
    font-family: "PingFangSC-Regular";
    font-size: .277778rem;
    margin: 0 auto .423611rem; /* 61 */
  }
  .bg{
    position: absolute;
    top: 6.229167rem; /* 897 */
    left: .527778rem; /* 76 */
    width: 6.451389rem; /* 929 */
    height: 2.986111rem; /* 430 */
    z-index: 0;
    background: url('../assets/gamebg.png');
    background-size: contain;
    font-family: "PingFangSC-Semibold";
    font-size: .430556rem; /* 62 */
    display:-webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FD5C3F;
    line-height: .555556rem; /* 80 */
    text-align: center;
  }
  .click{
    position: absolute;
    top: 6.229167rem; /* 897 */
    left: .527778rem; /* 76 */
    width: 6.451389rem; /* 929 */
    height: 2.986111rem; /* 430 */
    z-index: 2;
    display:-webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    a{
      display: inline-block;
      width: 3.451389rem; /* 497 */
      height: .868056rem; /* 125 */
      line-height: .868056rem; /* 125 */
      text-align: center;
      color: #fff;
      background-color: #FD5C3F;
      border-radius: .173611rem; /* 25 */
      font-size: .347222rem; /* 50 */
      font-family: "PingFangSC-Semibold";
    }
  }
  canvas{
    display: block;
    width: 6.451389rem; /* 929 */
    height: 2.986111rem; /* 430 */
    margin: 0 auto;
    position: relative;
    z-index: 1;
    /* background: url('../assets/gamebg.png');
    background-size: contain; */
    /* background: #FFF5DF; */
  }
  > a{
    display: block;
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    height: .694444rem; /* 236 */
    line-height: .694444rem; /* 236 */
    color: #fff;
    text-decoration: underline;
    text-align: center;
    font-size: .25rem; /* 36 */
  }
  > img{
    display: none;
    width: 6.451389rem; /* 929 */
    height: 2.986111rem; /* 430 */
  }
}
</style>
