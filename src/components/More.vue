<template>
    <div class="more">
        <h2><img src="../assets/筹码明细.png" alt=""></h2>
        <div class="left"><img src="../assets/财神.png" alt=""></div>
        <div class="right"><img src="../assets/鞭炮.png" alt=""></div>
        <div class="details">
            <div class="container">
                <ul>
                  <!-- 看跌样式 down 看涨样式 up -->
                  <li v-for="(value, index) in Data" :key="index" v-bind:class="[value.type === '看跌' ? 'down' : (value.type === '看涨' ? 'up' : '')]">
                      <ol class="clearfix">
                      <li>{{value.time}}</li>
                      <li><img v-bind:src="value.imgUrl" alt=""></li>
                      <li>{{value.type}}</li>
                      <li class="one-txt-cut">{{value.tag}}</li>
                      <li class="one-txt-cut">{{value.score}}个筹码</li>
                      </ol>
                  </li>
                  <!-- 看涨样式 -->
                  <!-- <li class="up">
                      <ol class="clearfix">
                      <li>7/9</li>
                      <li><img src="../assets/up.png" alt=""></li>
                      <li>看涨</li>
                      <li>融资优惠利率A</li>
                      <li>-100个筹码</li>
                      </ol>
                  </li> -->
                </ul>
            </div>
        </div>
        <div class="img"><img src="../assets/sekuai.png" alt=""></div>
    </div>
</template>

<script>
export default {
  name: 'More',
  data () {
    return {
      Data: [
        {
          'score': '+10', // 筹码
          'tag': '投注10个', // 描述字段
          'type': '看涨', // 描述字段
          'imgUrl': './static/images/presented.png',
          'time': '7/08' // 时间
        }
      ]
    }
  },
  props: ['userInfo'], // 接收父组件的值
  methods: {
    /**
     * 获取数据
     */
    setAjax: function () {
      this.$ajax({
        'url': '/myScoreList',
        params: {
          account: this.userInfo.account,
          Token: this.userInfo.token,
          Client: this.userInfo.client
        }
      })
      .then((res) => {
        // console.log(res.data)
        // var resp = {
        //   'respbody': [
        //     {
        //       'id': '1000000264315577', // 编号
        //       'account': '45******73', // 账号
        //       'score': 20, // 筹码
        //       'type': 2, // 类型(1-签到;2-投注;3-收益;4-兑换;5-任务;6-刮刮乐;7-首次赠送)
        //       'flag': 0, // 标识(0-减少;1-增加)
        //       'tag': '0', // 注释(type为 2(投注)时,此字段返回投注的涨跌情况(0-跌;1-涨),type为4和5时此字段返回奖品名称)
        //       'createTime': 1511752155000 // 时间戳
        //     }
        //   ],
        //   'resphead': {
        //     'respcode': '0000',
        //     'respdetails': '成功'
        //   }
        // }
        var Data = res.data.respbody
        console.log(Data)
        this.Data = []
        for (let i = 0; i < Data.length; i++) {
          const el = Data[i]
          var type = this.getDetailsType(el.type, el.tag)
          var time = this.getDetailsTime(el.createTime)
          var imgUrl = this.getDetailsSrc(el.type, el.tag)
          var score = el.flag ? '+' + el.score : '-' + el.score
          var tag = el.type === 2 ? '投注' + el.score + '个' : el.tag
          var obj = {
            'id': el.id,
            'score': score,
            'type': type,
            'tag': tag,
            'imgUrl': imgUrl,
            'time': time
          }
          this.Data.push(obj)
        }
      })
    },
    /**
     * 获取类型
     */
    getDetailsType: function (num, tag) {
      var arr = ['签到', '投注', '收益', '兑换', '任务', '刮刮乐', '赠送']
      var result = ''
      if (num === 2) {
        result = (tag === '1' ? '看涨' : '看跌')
      } else {
        result = arr[num - 1]
      }
      return result
    },
    /**
     * 把时间戳改为时间格式
     */
    getDetailsTime: function (str) {
      var date, M, D, time
      str = parseInt(str)
      date = new Date(str)
      M = (date.getMonth() + 1) + '/'
      D = date.getDate() < 10 ? ('0' + date.getDate() + ' ') : (date.getDate() + ' ')
      time = (M + D)
      return time
    },
    /**
     * 获取小图标的src地址
     */
    getDetailsSrc: function (num, tag) {
      var arr = [
        './static/images/qiandao.png',
        '',
        './static/images/get.png',
        './static/images/presented.png',
        './static/images/presented.png',
        './static/images/duihuan.png',
        './static/images/presented.png'
      ]
      var result = ''
      if (num === 2) {
        result = (tag === '1' ? './static/images/up.png' : './static/images/down.png')
      } else {
        result = arr[num - 1]
      }
      return result
    }
  },
  mounted: function () {
    this.setAjax()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.more{
    width: 100%;
    height: 100%;
    background: url('../assets/bg.png');
    background-size: contain;
    padding-top: .319444rem; /* 46 */
    box-sizing: border-box;
    > h2{
      width: 5.361111rem; /* 772px */
      height: 0.819444rem; /* 118px */
      margin: 0 auto .319444rem; /* 46 */
    }
    > .left{
      position: absolute;
      width: 1.013889rem; /* 146 */
      height: 1.180556rem; /* 170 */
      top: .784722rem; /* 112 */
      /* top: 0; */ /* 112 */
      left: .381944rem; /* 55 */
      z-index: 1;
    }
    > .right{
      position: absolute;
      width: .569444rem; /* 82 */
      height: 1.972222rem; /* 284 */
      top: .458333rem; /* 66 */
      right: .381944rem; /* 55 */
      z-index: 1;
    }
    > .details{
      position: relative;
      /* display: none; */
      border-radius: 0.173611rem; /* 25px */
      padding: .722222rem 0.416667rem .763889rem; /* 104px 60px 110px */
      box-sizing: border-box;
      box-shadow: 0px 0px 0.138889rem 0.138889rem #FA9B42 inset; /* 20px */
      background-color: #FDB563;
      > .container{
        background-color: #FEFEE2;
        border-radius: 0.3125rem; /* 45px */
        padding: 0.243056rem 0; /* 35px */
        max-height: 6.458333rem; /* 930 */
        overflow-y: scroll;
        ul{
          > li{
            margin-bottom: 0.291667rem; /* 42px */
            height: 0.354167rem; /* 51px */
            padding: 0 0.277778rem; /* 40px */
            position: relative;
            &:before{
              content: '';
              position: absolute;
              height: 0.291667rem; /* 42px */
              border-left: 1px solid #bdbdbd;
              left: 1.222222rem; /* 176px */
              top: 0.354167rem; /* 51px */
            }
            &:last-child::before{
              border-left: none;
            }
            &:last-child{
              margin-bottom: 0;
            }
            > ol > li{
              float: left;
              font-size: 0.277778rem; /* 40px */
              height: 0.354167rem; /* 51px */
              line-height: 0.354167rem; /* 51px */
              color: #7f7f7f;
              overflow: hidden;
              &:nth-child(1){
                color: #b5b5b5;
                width: .763889rem; /* 120 */
                text-align: center;
              }
              &:nth-child(2){
                width: 0.354167rem; /* 51px */
                height: 0.354167rem; /* 51px */
                margin: 0 0.048611rem; /* 7px */
              }
              &:nth-child(3){
                width: .902778rem; /* 130 */
              }
              &:nth-child(4){
                width: 2.222222rem; /* 340px */
              }
              &:nth-child(5){
                width: 1.604167rem; /* 231px */
                text-align: right;
                overflow: hidden;
              }
            }
          }
        }
        ul > .down > ol > li:nth-child(3){
          color: #73bd43;
        }
        ul > .up > ol > li:nth-child(3){
          color: #fc5b5d;
        }
      }
    }
}
</style>
