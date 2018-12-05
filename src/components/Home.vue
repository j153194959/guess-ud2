<template>
  <div class="home" ref="home">
    <!-- 头部 -->
    <header>
      <!-- 头部 背景 -->
      <img src="../assets/bg-top.png" alt="">
      <!-- 分享 + 签到 -->
      <div>
        <a @click="share" href="javascript:void(0)"><img src="../assets/btn分享.png" alt="" /></a>
        <a @click="openMask(0)" href="javascript:void(0)"><img src="../assets/btn签到.png" alt="" /></a>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <!-- 看涨跌 -->
      <div class="guess">
        <!-- 战绩 筹码 -->
        <div class="gains">
          我的战绩：{{mainData.score}}个筹码  <a @click="lookMore" href="javascript:void(0)">查看更多&gt;</a>
        </div>
        <div class="container">
          <!-- 猜涨跌 -->
          <div class="gs_guess">
            <!-- tab栏 -->
            <div v-if="!isFirst" class="tab clearfix">
              <!-- <a @click="tabClick(0)" href="javascript:void(0);" v-bind:class="[!guess.tabShow ? 'current' : '']">{{mainData.firstTag.status ? '即将开始' : '进行中'}}</a> -->
              <a @click="tabClick(0)" href="javascript:void(0);" v-bind:class="[!guess.tabShow ? 'current' : '']">{{mainData.firstTag.status ? '温馨提示' : '进行中'}}</a>
              <a @click="tabClick(1)" href="javascript:void(0);" v-bind:class="[guess.tabShow ? 'current' : '']">
                <span><img v-if="mainData.secondTag.result.odds" v-bind:src="mainData.secondTag.result.udUrl" alt=""></span>
                {{mainData.secondTag.data}}已结束
              </a>
            </div>
            <!-- 进行中 -->
            <div v-show="!guess.tabShow" class="ing">
              <!-- 进行中 -->
              <div v-if="!mainData.firstTag.status">
                <div class="question"><span>{{mainData.firstTag.data}}</span>沪指是涨是跌？</div>
                <!-- 涨 / 跌 -->
                <div class="UorD clearfix">
                  <div class="left fl">
                    <div class="img">
                      <img src="../assets/金币-涨.png" alt="">
                    </div>
                    <p class="data">{{mainData.firstTag.rate.riseRate}}%的人猜涨</p>
                    <a @click="openMask(1, 1)" v-if="!mainData.firstTag.isBet" class="ing_isBet" href="javascript:void(0);">
                      <img src="../assets/我看涨.png" alt="">
                    </a>
                    <a v-if="mainData.firstTag.isBet" class="ing_noBet" href="javascript:void(0);">
                      <img v-bind:src="mainData.firstTag.comImg" alt="">
                    </a>
                  </div>
                  <div class="right fr">
                    <div class="img">
                      <img src="../assets/金币-跌.png" alt="">
                    </div>
                    <p class="data">{{mainData.firstTag.rate.dropRate}}%的人猜跌</p>
                    <a @click="openMask(1, 0)" v-if="!mainData.firstTag.isBet" class="ing_isBet" href="javascript:void(0);">
                      <img src="../assets/我看跌.png" alt="">
                    </a>
                    <div v-if="mainData.firstTag.isBet" class="my_guess ing_noBet one-txt-cut">
                      <div>
                        {{mainData.firstTag.guessRecord.score}}个筹码
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 截止时间 -->
                <p class="end_time"><span>{{mainData.firstTag.data}}</span>12:59截止</p>
              </div>
              <!-- 即将开始 -->
              <!-- <div v-if="mainData.firstTag.status" class="toStart">{{mainData.secondTag.data}}15：00即将开始下一期竞猜<br>请稍后</div> -->
              <div v-if="mainData.firstTag.status" class="toStart">活动最后一期，<br>请于1月9日之前及时兑换筹码。</div>
            </div>
            <!-- 已结束 -->
            <div v-show="guess.tabShow" class="end">
              <!-- 已投注 -->
              <div v-if="mainData.secondTag.result.odds" class="have_result">
                <div class="clearfix">
                  <div class="left"><img v-bind:src="mainData.secondTag.result.bigUrl" alt=""></div>
                  <div class="right fl">
                    <div>{{mainData.secondTag.data}}沪指<i>{{mainData.secondTag.result.result ? '涨' : '跌'}}</i>了</div>
                    <div><span>{{mainData.secondTag.result.result ? mainData.secondTag.rate.riseRate : mainData.secondTag.rate.dropRate}}%</span>的人猜对</div>
                    <div>本期赔率1:{{mainData.secondTag.result.odds}}</div>
                  </div>
                </div>
                <div v-if="mainData.secondTag.guessRecord.score" class="description clearfix">
                  <div class="img fl"><img v-bind:src="mainData.secondTag.result.imgUrl" alt=""></div>
                  <div class="fl">
                    <!-- <div>{{'股神，恭喜你赢得了' + mainData.secondTag.jetton + '个筹码'}}</div> -->
                    <!-- <div>{{'股神,这次看走眼了,继续加油!'}}</div> -->
                    <div>{{mainData.secondTag.result.result === mainData.secondTag.guessRecord.type ? ('股神，恭喜你赢得了' + mainData.secondTag.jetton + '个筹码') : '股神,这次看走眼了,继续加油!'}}</div>
                    <div>你看{{mainData.secondTag.guessRecord.type ? '涨' : '跌'}}，投注数量：<span>{{mainData.secondTag.guessRecord.score}}个筹码</span></div>
                  </div>
                </div>
                <div class="end_time">{{mainData.firstTag.data}}12:59截止</div>
              </div>
              <!-- 未投注没结果 -->
              <div v-if="!mainData.secondTag.result.odds" class="no_result">
                <div class="question">{{mainData.secondTag.data}}沪指是涨是跌？</div>
                <!-- 涨 / 跌 -->
                <div class="UorD clearfix">
                  <div class="left fl">
                    <div class="img">
                      <img src="../assets/金币-涨.png" alt="">
                    </div>
                    <p class="data">{{mainData.secondTag.rate.riseRate}}%的人猜涨</p>
                    <a v-if="mainData.secondTag.guessRecord.score" class="end_noBet" href="javascript:void(0);">
                      <img v-bind:src="mainData.secondTag.comImg" alt="">
                    </a>
                  </div>
                  <div class="right fr">
                    <div class="img">
                      <img src="../assets/金币-跌.png" alt="">
                    </div>
                    <p class="data">{{mainData.secondTag.rate.dropRate}}</span>%的人猜跌</p>
                    <div v-if="mainData.secondTag.guessRecord.score" class="my_guess end_noBet">投注数量：{{mainData.secondTag.guessRecord.score}}个筹码</div>
                  </div>
                </div>
                <!-- 我猜的 -->
                <!-- 截止时间 -->
                <p class="end_time">{{mainData.secondTag.data}}15:30公布结果</p>
              </div>
            </div>
          </div>
          <!-- 其他人的猜测情况 -->
          <div class="others">
            <div class="container">
              <ul>
                <!-- 看涨样式：bearish 看跌样式：bullish -->
                <li v-for="(value, index) in guessList" :key="index" v-bind:class="['clearfix', value.tag === '1' ? 'bearish' : 'bullish']">
                  <div class="others_time">{{getOthersTime(value.time)}}</div>
                  <div class="others_judge"><i class="img"><img v-bind:src=value.imgUrl alt=""></i> 看{{value.tag === '1' ? '涨' : '跌'}}</div>
                  <div class="tel">{{value.account}}</div>
                  <div class="get"><div>{{value.score}}个筹码</div></div>
                </li>
                <!-- 看跌样式 -->
                <!-- <li class="bullish clearfix">
                  <div class="others_time">13:34:23</div>
                  <div class="others_judge"><i class="img"><img src="../assets/icon-down.png" alt=""></i> 看跌</div>
                  <div class="tel">169****0022</div>
                  <div class="get">10个筹码</div>
                </li> -->
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 奖品兑换 -->
      <div class="convert">
        <div class="bridge"><img src="../assets/衔接.png" alt="" /></div>
        <div class="title"><img src="../assets/奖品兑换.png" alt=""></div>
        <div class="fu left"><img src="../assets/福字.png" alt=""></div>
        <div class="fu right"><img src="../assets/福字.png" alt=""></div>
        <div class="description">
          活动期间，完成绑定帐号、报名实盘等任务，获得海量筹码，缤纷奖品任“兴”换~ <a @click="openMask(3, 0)" href="javascript:void(0);">详细&gt;</a>
        </div>
        <ul class="list">
          <!-- 刮刮乐 -->
          <li class="card">
            <div class="left fl">
              <div class="img"><img src="../assets/刮刮乐.png" alt=""></div>
            </div>
            <div class="right fr">
              <a @click="Scratch" href="javascript:void(0);">刮开</a>
            </div>
            <div class="center">
              <p class="p one-txt-cut one-txt-cut"><i>刮刮乐</i></p>
              <p><span>每日一刮</span><a @click="lookMore" href="javascript:void(0)">中奖纪录&gt;</a></p>
            </div>
          </li>
          <!-- 奖品列表 -->
          <li v-for="(value, index) in prizeList" :key="index" v-bind:class="[value.type]">
            <div class="left fl">
              <div class="img"><img v-bind:src="value.imgUrl" alt=""></div>
            </div>
            <div class="right fr">
              <!-- 能兑换pass 不能兑换fail 已兑换exchanged -->
              <a @click="exchange(value.id, value.isSupply, index)" v-bind:class="[!value.isSupply ? 'pass' : (value.isSupply === 1 ? 'exchanged' : 'fail')]" href="javascript:void(0)">{{value.isSupply === 1 ? '已' : ''}}兑换</a>
            </div>
            <div class="center">
              <p class="p one-txt-cut one-txt-cut"><i>{{value.name}}</i></p>
              <p><span>{{value.price}}个筹码</span>可兑换{{value.isLimit ? ('，每人限领' + value.isLimit + '次') : ''}}</p>
              <p v-if="value.isActivate">限活动期间新开两融客户兑换</p>
            </div>
          </li>
        </ul>
      </div>
    </main>
    <!-- 活动规则 -->
    <footer>
      <div class="img"><img src="../assets/sekuai.png" alt=""></div>
      <div @click="openMask(10)" class="rule">活动规则</div>
    </footer>
    <!-- 浮层 -->
    <div class="supernatant">
      <!-- 签到浮层 -->
      <div v-if="mask.signIsShow" class="sign_supernatant shade_supernatant">
        <div class="container container_supernatant">
          <div class="img"><img src="../assets/弹窗bg2.png" alt=""></div>
          <div>10个</div>
          <a @click="sign" href="javascript:void(0);">签到</a>
          <a @click="openMask(3, 1)" href="javascript:void(0);">做任务领筹码</a>
          <div @click="closeMask(0)" class="close_supernatant"><img src="../assets/关闭.png" alt=""></div>
        </div>
      </div>
      <!-- 投注浮层 -->
      <div v-if="mask.cathecticIsShow" class="cathectic_supernatant shade_supernatant">
        <div class="container container_supernatant">
          <form action="javascript:void(0);" method="get" accept-charset="utf-8">
            <div class="top">
              <input v-model="cathectic.num" type="number" placeholder="请输入投注数" name="">
              <div>您有{{mainData.score}}个筹码，投注数需为10的整数倍</div>
            </div>
            <button @click="toCathectic">确定</button>
          </form>
          <div @click="closeMask(1)" class="close_supernatant"><img src="../assets/关闭.png" alt=""></div>
        </div>
      </div>
      <!-- 无筹码浮层  && 活动结束浮层 -->
      <div v-if="mask.noChipIsShow" class="noChip_supernatant shade_supernatant">
        <div class="container">
          <div class="top">
            <p v-if="!maskContent.noChipType">您的筹码不足，<br />
            去赚取更多筹码吧！</p>
            <p v-if="maskContent.noChipType">活动已结束</p>
          </div>
          <div v-if="maskContent.noChipType" class="discription">
            活动结束后14个工作日内礼品<br>
            自动派发，后续请关注手机信息
          </div>
          <button @click="closeMask(2, maskContent.noChipType)">{{maskContent.noChipBtn}}</button>
          <div @click="closeMask(2)" class="close_supernatant"><img src="../assets/关闭.png" alt=""></div>
        </div>
      </div>
      <!-- 获取更多筹码浮层 -->
      <div v-if="mask.moreIsShow" class="more_supernatant shade_supernatant">
        <div class="container">
          <div class="title">完成任务获得称号与筹码</div>
          <div @click="closeMask(3)" class="close_supernatant"><img src="../assets/关闭.png" alt=""></div>
          <ul>
            <li v-for="(value, index) in getMoreList" :key="index">
              <div class="left"><img v-bind:src=value.imgUrl alt=""></div>
              <div class="right">
                <div class="top">
                  <a @click="task(index, value.id, value.statu, value.score)" href="javascript:void(0);">{{value.btn}}</a>
                  <p>赠{{value.score}}个筹码<br><span>{{value.tag}}</span></p>
                </div>
                <div class="bottom">{{value.txt}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 首次登录获取筹码浮层 && 签到获取筹码浮层 && 今日已签到浮层 -->
      <div v-if="mask.firstIsShow" class="first_supernatant shade_supernatant">
        <div class="container">
          <div class="top">{{maskContent.firstGet}}</div>
          <div v-if="!maskContent.firstType" class="description">即将进入刮刮乐抽奖环节哦！{{maskContent.firstNum}}秒</div>
          <button @click="closeMask(4)" v-if="maskContent.firstType">确定</button>
        </div>
      </div>
      <!-- 参加两融征信 && 开通两融帐号 浮层 -->
      <div v-if="mask.financialIsShow" class="financial_supernatant shade_supernatant">
        <div class="container">
          <div class="top">
            <p v-if="!maskContent.financialType">
              参加两融征信的筹码奖励<br>
              将很快会到账哦~
            </p>
            <p v-if="maskContent.financialType">
              如您已经完成两融征信，<br>
              快快联系理财顾问开户吧！
            </p>
          </div>
          <button @click="closeMask(5)">确定</button>
        </div>
      </div>
      <!-- 兑换成功浮层 -->
      <div v-if="mask.successIsShow" class="success_supernatant shade_supernatant">
        <div class="container container_supernatant">
          <div class="top">兑换成功！</div>
          <div class="description">奖励将在兑换后14个工作日内自动<br>
          派发，请关注资金账号对应的手机短信</div>
          <a @click="closeMask(7)" href="javascript:void(0);">确定</a>
          <div @click="closeMask(7)" class="close_supernatant"><img src="../assets/关闭.png" alt=""></div>
        </div>
      </div>
      <!-- 兑换失败浮层 && 非两融新客户浮层 -->
      <div v-if="mask.failIsShow" class="fail_supernatant shade_supernatant">
        <div class="container container_supernatant">
          <div class="top">{{maskContent.failTxt1}}<br>{{maskContent.failTxt2}}</div>
          <div class="bottom">
            <a @click="closeMask(8)" href="javascript:void(0);">确定</a>
          </div>
        </div>
      </div>
      <!-- 微信二维码浮层 -->
      <div v-if="mask.QRcodeIsShow" class="QRcode_supernatant shade_supernatant">
        <div class="container container_supernatant">
          <div class="top"><p>资金账号绑定兴业证券或<br>
          兴e通微信公众号可获取100个筹码哦~</p></div>
          <div class="bottom clearfix">
            <div class="fl">
              <div><img src="../assets/兴业证券.png" alt=""></div>
              <p>兴业证券<br>将消息订阅装进口袋<br>微信ID号“xyzq601377”</p>
            </div>
            <div class="fl">
              <div><img src="../assets/兴e通.png" alt=""></div>
              <p>兴e通<br>让理财资讯更有趣<br>“xingetong601377”</p>
            </div>
          </div>
          <div @click="closeMask(9)" class="close_supernatant"><img src="../assets/关闭.png" alt=""></div>
        </div>
      </div>
      <!-- 规则浮层 -->
      <div v-if="mask.ruleIsShow" class="rule_supernatant shade_supernatant">
        <div class="container">
          <div class="title"><img src="../assets/title活动规则.png" alt=""></div>
          <a @click="closeMask(10)" href="javascript:void(0);">确定</a>
          <div class="rule">
            <h4>A. 游戏时间</h4>
            <p>T-1日15:00-T日12:59（非交易日都为游戏时间），持有资金账号的客户可以竞猜T日上证指数涨跌方向（指数持平视为涨）。</p>
            <h4>B.  游戏筹码</h4>
            <p> 用户在竞猜时间，投入游戏筹码，即可参与竞猜，单次游戏投入筹码数量为10个及其整数倍，赔率按T日收盘胜负双方的积分比率计算。</p>
            <h4>C.  游戏筹码获取途径</h4>
            <p> a）通过本活动链接新开户，赠送500个筹码；通过本活动链接报名“荣耀赢家”实盘大赛，赠送200个筹码；活动期间在官方微信公众号绑定资金账号，赠送100个筹码；完成两融征信，赠送500个筹码；开通两融账号，再赠送1200个筹码；活动期间完成首次交易的客户，赠送1200个筹码；</p>
            <p>b）每天到活动页点击签到，即可获得10个筹码奖励，当天到账；</p>
            <p>c）参与本活动，如猜对方向，会根据投注数量获得相应比例的筹码奖励；</p>
            <p>d）参与刮刮乐，即有机会获得多倍数筹码。</p>
            <h4>D.  游戏奖励</h4>
            <p> 每日结算后，根据用户投入筹码数量和指数涨跌情况向所有猜对用户发放筹码奖励。用户可在“我的战绩”中查看游戏筹码奖励到账和每期盈亏情况，实际奖励（四舍五入取整）将在每个交易日结果公布后一个工作日内到账。</p>
            <h4>E.  完成任务筹码到账时间：</h4>
            <p>a)报名实盘：T日到账</p>
            <p>b)新开户、微信绑定资金账号、开通两融征信、两融开户：T+1日到账</p>
            <p>c)新客户完成首笔交易：T+3日到账</p>
            <h4>F.  奖励兑换</h4>
            <div class="table clearfix">
              <div class="left fl">
                <div class="thead">累计筹码</div>
                <div class="tbody">
                  500 <br>
                  <!-- 800 <br> -->
                  1300 <br>
                  2000 <br>
                  <!-- 2500 <br> -->
                  5000 <br>
                  10000 <br>
                  300000
                </div>
              </div>
              <div class="right fl">
                <div class="thead">兑换礼品</div>
                <div class="tbody">
                  优酷会员黄金月卡 <br>
                  <!-- 融资优惠利率7.93% <br> -->
                  话费30元 <br>
                  优酷会员黄金年卡 <br>
                  <!-- 融资优惠利率7.52% <br> -->
                  京东购物卡100元 <br>
                  家用取暖器 <br>
                  iPhone X
                </div>
              </div>
              <div class="right-r fl">
                <div class="thead">备注</div>
                <div class="tbody">
                  无限制兑换 <br>
                  <!-- <span>限活动期间新开两融客户兑换</span> <br> -->
                  每人限领3次 <br>
                  每人限领3次 <br>
                  <!-- <span>限活动期间新开两融客户兑换</span> <br> -->
                  每人限领1次 <br>
                  每人限领1次 <br>
                  每人限领1次
                </div>
              </div>
            </div>
            <p class="tx_in0">每日可以签到1次，1次签到=10个筹码，每日可以刮刮乐1次；<br />
            <!-- 融资优惠利率兑换后需在2018年1月31日之前成功开通两融账号，过期失效;<br /> -->
            实物奖励将在兑换后14个工作日内派发到资金账号对应的手机号，请及时在网上“业务办理”更新您的手机号。<br />
            <h4>G.  参与次数</h4>
            <p>每轮游戏时间内每个用户仅可猜涨跌1次，以资金账号参与次数为准。</p>
            <h4>H.  免责声明</h4>
            <p>a）用户以资金账号参与活动为准,若存在任何作弊行为的用户,兴业证券将取消其参与资格,已经发放奖品的有权收回奖品；</p>
            <p>b）用户需确保资金账号内有足额的游戏筹码，若账号内筹码少于当期参与数量，则奖励不会派发；</p>
            <p>c）请确保网络和系统通畅,若因网络原因或系统原因,造成游戏中断、奖励未到账的情况，兴业证券将不再补发奖励；</p>
            <p>d）用户参与活动，即视为同意以上活动规则和免责声明；</p>
            <p>e）本次活动最终解释权归兴业证券股份有限公司所有，如有疑问，请拨打客服热线：<a href="tel:95562">95562</a>。</p>
            <p>f）本活动所涉及奖品与苹果公司无关</p>
          </div>
        </div>
      </div>
      <!-- Toast结果显示 -->
      <div v-bind:class="['result', toast.isShow ? 'animation' : '']"><span>{{toast.txt}}</span></div>
      <!-- 分享弹窗 -->
      <div v-if="mask.shareIsShow" class="share_supernatant shade_supernatant">
        <div class="container">
          <div class="title">分享</div>
          <div class="img"><img src="../assets/ico_pig.png" alt=""></div>
          <div class="des">
            <p>该活动仅支持在</p>
            <p>“兴业证券优理宝APP”参与</p>
          </div>
          <div @click="goDownload" class="button">立即前往</div>
          <div @click.stop="closeMask(11)" class="close"><img src="../assets/ico_close.png" alt=""></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      firstOpenMore: true, // 是否是第一次打开更多筹码弹窗
      isLeftOk: false, // 是否得到用户数据
      scrollTop: 0, // 窗体滚动长度
      isFirst: false, // 是否是第一天
      toast: { // 提示
        txt: '', // toast文字
        isShow: false // toast是否显示
      },
      cathectic: { // 投注
        num: '', // 投注input
        type: 0 // 投注类型 0 为跌 1 为涨
      },
      mainData: { // 猜涨跌数据
        'isSign': 0, // 今日是否签到
        'leftTimes': 1, // 刮刮卡剩余次数
        'score': 0, // 当前筹码
        'firstTag': { // 第一个标签
          'data': '', // 日期
          'isBet': 0, // 是否投注(0-未投注;1-已投注)
          'status': 0, // 状态 0-进行中;1-即将开始
          'comImg': './static/images/我看涨.png', // 猜涨或是猜跌 图标
          'rate': { // 猜涨跌人数比例
            'riseRate': 30, // 猜涨比例
            'dropRate': 70 // 猜跌比例
          },
          'guessRecord': { // 这天的下注记录(isBet为1时才会返回)
            'score': 0, // 下注积分
            'tag': 1 // 押注类型((0-跌;1-涨))
          }
        },
        'secondTag': {
          'data': '',
          'isBet': 1,
          'jetton': 20, // 用户获得积分(结果已出 并且用户押对了 才有该字段)
          'comImg': './static/images/我看涨.png', // 猜涨或是猜跌 图标
          'rate': {
            'riseRate': 40,
            'dropRate': 60
          },
          'guessRecord': { // 这天的下注记录(isBet为1时才会返回)
            'score': 0, // 下注积分
            'type': 1 // 押注类型((0-跌;1-涨))
          },
          'result': { // 结果(结果已出的话会有该字段)
            'imgUrl': './static/images/zan.png',
            'bigUrl': './static/images/金币-涨.png',
            'udUrl': './static/images/icon-up.png',
            'result': 0, // 结果((0-跌;1-涨))
            'odds': 0 // 赔率(例1:2)
          }
        }
      },
      guessList: [ // 竞猜列表
        {
          'account': '45******73', // 账号
          'score': 100, // 投注筹码
          'tag': '0', // 涨跌类型(0-跌;1-涨)
          'imgUrl': './static/images/icon-up.png', // 图标路径
          'time': 1511751461000 // 时间
        }
      ],
      prizeList: [ // 兑换奖品列表
        {
          'name': '优酷会员黄金月卡', // 奖品名称
          'id': '', // 奖品编号
          'price': 500, // 所需筹码
          'isActivate': 0, // 是否限制活动期间新开两融账户(0-否;1-是)
          'isLimit': 0, // 限领次数(0-不限;1,2,3限领次数)
          'isSupply': 2, // 当前是否能兑换(0-可以兑换;1-已购买;2-积分不足)
          'type': 'card' // card为卡 jd为京东卡 rate为优惠利率 inKind为实物
        }
      ],
      getMoreList: [ // 获取更多筹码
        {
          'score': 500, // 所需筹码数
          'status': 3, // 0-去开户;1-可领取;2-已领取;3-不可领
          'tag': '一见如故', // 方框名称
          'imgUrl': './static/images/一见如故.png',
          'txt': '通过本活动开通兴业证券股票账户'
        }
      ],
      mask: { // 弹窗控制
        signIsShow: false, // 签到弹窗是否显示
        cathecticIsShow: false, // 投注弹窗是否显示
        noChipIsShow: false, //  无筹码弹窗 || 结束弹窗 是否显示
        moreIsShow: false, // 获取更毒筹码弹窗是否显示
        firstIsShow: false, // 首次登录获取筹码浮层 && 签到获取筹码浮层 && 今日已签到浮层 是否显示
        financialIsShow: false, // 参加两融征信 && 开通两融帐号 浮层 是否显示
        noNewIsShow: false, // 非资金帐号浮层是否显示
        successIsShow: false, // 兑换成功浮层是否显示
        failIsShow: false, // 兑换失败浮层 || 非两融新客户浮层 是否显示
        QRcodeIsShow: false, // 微信二维码页面是否显示
        ruleIsShow: false, // 活动规则页面是否显示
        shareIsShow: false // 分享弹窗
      },
      maskContent: { // 弹窗内容控制
        firstType: 0, // 首次登录获取筹码浮层 || 签到获取筹码浮层 || 今日已签到浮层 判断 1为首次 2为已签到，0为获取
        firstGet: '',
        firstNum: 3, // 签到获取 倒计时
        noChipType: 0, // 0为无筹码弹窗 1为结束弹窗
        noChipBtn: '', // 按钮文字
        failTxt1: '', // 兑换失败弹窗 提示文字
        failTxt2: '',
        financialType: 0 // 0为参加征信 1为开通帐号
      },
      guess: { // 猜涨跌部分
        tabShow: 0 // tab栏显示  0为显示左边 1为显示右边
      }
    }
  },
  props: ['userInfo', 'againLogin2'], // 接收父组件的值
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    /**
     * 微信 前往下载
     */
    goDownload: function () {
      // 猜涨跌二期_分享页_下载优理宝 埋点
      TDAPP.onEvent("猜涨跌二期_分享页_下载优理宝","",{})
      window.location.href = 'http://wap.xyzq.com.cn'
    },
    /**
     * 显示弹窗
     * index：弹窗种类
     * type：分类
     */
    openMask: function (index, type) {
      // console.log(this.$refs.home.scrollTop)
      var arr = ['signIsShow', 'cathecticIsShow', 'noChipIsShow', 'moreIsShow', 'firstIsShow', 'financialIsShow', 'noNewIsShow', 'successIsShow', 'failIsShow', 'QRcodeIsShow', 'ruleIsShow']
      // for (let i = 0; i < arr.length; i++) {
      //   this.mask[arr[i]] = false
      // }
      if (index === 0) { // 签到按钮
        // 猜涨跌二期_主页_签到_手动 埋点
        TDAPP.onEvent("猜涨跌二期_主页_签到_手动","",{})
        // 是否是微信页面 或者微博
        if (this.userInfo.isWechat) {
          this.scrollTop = this.$parent.$refs.app.scrollTop
          this.$refs.home.style.top = -this.scrollTop + 'px'
          // console.log(this.$parent.$refs.app.scrollTop)
          this.$refs.home.style.position = 'fixed'
          this.mask.shareIsShow = true
          return
        }
        // 是否已登录
        if (!this.userInfo.isLogin) {
          this.againLogin2()
          return
        }
        // 数据是否得到
        if (!this.isLeftOk) return
      } else if (index === 1) { // 投注
        // 猜涨跌二期_主页_看涨 看跌 埋点
        var TDarr = ['猜涨跌二期_主页_看涨', '猜涨跌二期_主页_看跌']
        TDAPP.onEvent(TDarr[type],"",{})
        // 是否是微信页面 或者微博
        if (this.userInfo.isWechat) {
          this.scrollTop = this.$parent.$refs.app.scrollTop
          this.$refs.home.style.top = -this.scrollTop + 'px'
          // console.log(this.$parent.$refs.app.scrollTop)
          this.$refs.home.style.position = 'fixed'
          this.mask.shareIsShow = true
          return
        }
        // 是否已登录
        if (!this.userInfo.isLogin) {
          this.againLogin2()
          return
        }
        // 数据是否得到
        if (!this.isLeftOk) return
        if (this.mainData.score < 10) {
          this.openMask(2, 0)
          return
        } else {
          this.cathectic.type = type
        }
      } else if (index === 2) { // 无筹码弹窗 || 结束弹窗
        this.maskContent.noChipType = type
        this.maskContent.noChipBtn = type ? '知道了' : '去赚筹码'
      } else if (index === 3) { // 更多筹码弹窗
        if (type) {
          // 猜涨跌二期_任务页_签到窗入口 埋点
          TDAPP.onEvent("猜涨跌二期_任务页_签到窗入口","",{})
        } else {
          // 猜涨跌二期_任务页_兑奖区入口 埋点
          TDAPP.onEvent("猜涨跌二期_任务页_兑奖区入口","",{})
        }
        // 是否是微信页面 或者微博
        if (this.userInfo.isWechat) {
          this.scrollTop = this.$parent.$refs.app.scrollTop
          this.$refs.home.style.top = -this.scrollTop + 'px'
          // console.log(this.$parent.$refs.app.scrollTop)
          this.$refs.home.style.position = 'fixed'
          this.mask.shareIsShow = true
          return
        }
        // 是否已登录
        if (!this.userInfo.isLogin) {
          this.againLogin2()
          return
        }
        // 数据是否得到
        if (!this.isLeftOk) return
        if (this.firstOpenMore) { // 如果是第一次就加载一次数据
          this.getMoreData()
        }
      } else if (index === 4) {
        if (type === 1) { // 如果是第一次进入
          this.maskContent.firstGet = '您已获得100个筹码！'
        } else if (type === 2) { // 如果是已签到
          this.maskContent.firstGet = '今日您已签到！'
        } else { // 签到获取筹码
          this.maskContent.firstGet = '+10个筹码'
          let timer = setInterval(() => {
            // console.log(this.maskContent.firstNum)
            if (!this.maskContent.firstNum) {
              clearInterval(timer)
              window.location.href = '#/Scratch-card'
            }
            this.maskContent.firstNum --
          }, 1000)
        }
        this.maskContent.firstType = type
      } else if (index === 5) {
        this.maskContent.financialType = type
      } else if (index === 8) { // 兑换失败 || 非两融
        if (type) { // 非两融
          this.maskContent.failTxt1 = '您的申请已经提交,'
          this.maskContent.failTxt2 = '请耐心等待~'
        } else { // 兑换失败
          this.maskContent.failTxt1 = '抱歉，该奖品仅限'
          this.maskContent.failTxt2 = '活动期间新开两融客户兑换~'
        }
      }
      this.scrollTop = this.$parent.$refs.app.scrollTop
      this.$refs.home.style.top = -this.scrollTop + 'px'
      // console.log(this.$parent.$refs.app.scrollTop)
      this.$refs.home.style.position = 'fixed'
      this.mask[arr[index]] = true
    },
    /**
     * 关闭弹窗
     * index：弹窗种类
     */
    closeMask: function (index, type) {
      var arr = ['signIsShow', 'cathecticIsShow', 'noChipIsShow', 'moreIsShow', 'firstIsShow', 'financialIsShow', 'noNewIsShow', 'successIsShow', 'failIsShow', 'QRcodeIsShow', 'ruleIsShow', 'shareIsShow']
      this.$refs.home.style.position = 'static'
      this.$parent.$refs.app.scrollTop = this.scrollTop
      if (index === 2 && type === 0) {
        this.openMask(3)
      }
      this.mask[arr[index]] = false
    },
    /**
     * 点击分享
     */
    share: function () {
      if (this.userInfo.isWechat) {
        this.scrollTop = this.$parent.$refs.app.scrollTop
        this.$refs.home.style.top = -this.scrollTop + 'px'
        // console.log(this.$parent.$refs.app.scrollTop)
        this.$refs.home.style.position = 'fixed'
        this.mask.shareIsShow = true
        return
      }
      if (this.userInfo.account) {
        // 猜涨跌二期_主页_分享成功 埋点
        TDAPP.onEvent("猜涨跌二期_主页_分享成功","",{acc: this.userInfo.account, status: '成功'})
      } else {
        // 猜涨跌二期_主页_分享失败 埋点
        TDAPP.onEvent("猜涨跌二期_主页_分享失败","",{acc: this.userInfo.account, status: '失败', msg: '未登录'})
      }
      navigator.uniaccount.ulbShare('冬季猜涨跌 温暖迎新年', '', '登录优理宝，活动领筹码，每日猜涨跌，年货壕礼随心换~', 'http://static.xyzq.cn/activity/guess-ud2/index.html')
    },
    /**
     * 点击签到
     */
    sign: function () {
      console.log('签到')
      this.tostIsShow = false
      this.$ajax({
        url: '/signIn',
        params: {
          account: this.userInfo.account,
          Token: this.userInfo.token,
          Client: this.userInfo.client
        }
      })
      .then((res) => {
        // console.log(res.data)
        // var resp = {
        //   'respbody': null,
        //   'resphead': {
        //     'respcode': '0000',
        //     'respdetails': '成功'
        //   }
        // }
        if (res.data.resphead.respcode === '0000') {
          this.mainData.score += 10
          this.openMask(4, 0)
          this.toast.txt = '签到成功'
          this.toast.isShow = true
        } else {
          this.openMask(4, 2)
        }
      })
      .catch((err) => {
        console.log(err)
        this.toast.txt = '今天已经签过到咯'
        this.toast.isShow = true
      })
    },
    /**
     * 点击 查看更多
     */
    lookMore: function () {
      // 猜涨跌二期_筹码页_主页入口 埋点
      TDAPP.onEvent("猜涨跌二期_筹码页_主页入口","",{})
      // 是否是微信页面 或者微博
      if (this.userInfo.isWechat) {
        this.scrollTop = this.$parent.$refs.app.scrollTop
        this.$refs.home.style.top = -this.scrollTop + 'px'
        // console.log(this.$parent.$refs.app.scrollTop)
        this.$refs.home.style.position = 'fixed'
        this.mask.shareIsShow = true
        return
      }
      // 是否已登录
      if (!this.userInfo.isLogin) {
        this.againLogin2()
        return
      }
      // 数据是否得到
      if (!this.isLeftOk) return
      window.location.href = '#/More'
    },
    /**
     * 点击 刮开
     */
    Scratch: function () {
      // 猜涨跌二期_主页_兑换 埋点
      TDAPP.onEvent("猜涨跌二期_主页_兑换刮刮乐","",{})
      // 是否是微信页面 或者微博
      if (this.userInfo.isWechat) {
        this.scrollTop = this.$parent.$refs.app.scrollTop
        this.$refs.home.style.top = -this.scrollTop + 'px'
        // console.log(this.$parent.$refs.app.scrollTop)
        this.$refs.home.style.position = 'fixed'
        this.mask.shareIsShow = true
        return
      }
      // 是否已登录
      if (!this.userInfo.isLogin) {
        this.againLogin2()
        return
      }
      // 数据是否得到
      if (!this.isLeftOk) return
      window.location.href = '#/Scratch-card'
      // this.$router.push({path: '/Scratch-card'})
    },
    /**
     * 投注窗 确定按钮
     */
    toCathectic: function () {
      // 猜涨跌二期_主页_投注 埋点
      TDAPP.onEvent("猜涨跌二期_主页_投注","",{})
      // console.log('投注')
      var val = this.cathectic.num
      this.tostIsShow = false
      if (val % 10 === 0 && val <= this.mainData.score && parseInt(val) !== 0) {
        this.$ajax({
          url: '/bet',
          params: {
            account: this.userInfo.account,
            Token: this.userInfo.token,
            Client: this.userInfo.client,
            score: val,
            type: this.cathectic.type
          }
        })
        .then((res) => {
          // console.log(res.data)
          // var resp = {
          //   'respbody': 'success',
          //   'resphead': {
          //     'respcode': '0000',
          //     'respdetails': '成功'
          //   }
          // }
          // alert(JSON.stringify(res.data))
          if (res.data.resphead.respcode === '0000') {
            this.closeMask(1)
            this.mainData.score -= +val
            this.mainData.firstTag.isBet = 1
            this.mainData.firstTag.guessRecord.score = +val
            this.mainData.firstTag.guessRecord.tag = this.cathectic.type
            this.mainData.firstTag.comImg = this.mainData.firstTag.guessRecord.tag ? './static/images/我看涨.png' : './static/images/我看跌.png'
            this.toast.txt = '投注成功'
            this.toast.isShow = true
          } else {
            this.closeMask(1)
            this.toast.txt = '今天已经投过注了,明天再来吧!'
            this.toast.isShow = true
          }
        })
        .catch((err) => {
          console.log(err)
          this.closeMask(1)
          this.toast.txt = '今天已经投过注了,明天再来吧!'
          this.toast.isShow = true
        })
      } else {
        this.cathectic.num = ''
      }
    },
    /**
     * 点击tab栏
     * type： 0 为左 1 为右
     */
    tabClick: function (type) {
      if (type === 0) {
        this.guess.tabShow = 0
      } else {
        this.guess.tabShow = 1
      }
    },
    /**
     * 奖品兑换 按钮
     */
    exchange: function (id, isSupply, index) {
      var TDarr = ['月卡', '利率7.93', '话费', '年卡', '利率7.52', '京东卡', '取暖器', 'iPhoneX']
      // 猜涨跌二期_主页_兑换 埋点
      TDAPP.onEvent("猜涨跌二期_主页_兑换" + TDarr[index],"",{})
      // 是否是微信页面 或者微博
      if (this.userInfo.isWechat) {
        this.scrollTop = this.$parent.$refs.app.scrollTop
        this.$refs.home.style.top = -this.scrollTop + 'px'
        // console.log(this.$parent.$refs.app.scrollTop)
        this.$refs.home.style.position = 'fixed'
        this.mask.shareIsShow = true
        return
      }
      // 是否已登录
      if (!this.userInfo.isLogin) {
        this.againLogin2()
        return
      }
      // 数据是否得到
      if (!this.isLeftOk) return
      // console.log(id, isSupply)
      if (isSupply === 2) { // 如果筹码不足
        this.openMask(2, 0)
        return
      } else if (isSupply === 1) { // 如果兑换机会不够
        return
      }
      this.tostIsShow = false
      this.$ajax({
        url: '/conversion',
        params: {
          account: this.userInfo.account,
          id: id,
          Token: this.userInfo.token,
          Client: this.userInfo.client
        }
      })
      .then((res) => {
        console.log(res.data)
        // alert(JSON.stringify(res.data))
        // var resp = {
        //   'respbody': 'success',
        //   'resphead': {
        //     'respcode': '1118',
        //     'respdetails': '成功'
        //   }
        // }
        console.log(res.data)
        if (res.data.resphead.respcode === '0000') {
          this.openMask(7)
          this.setData()
        } else if (res.data.resphead.respcode === '1118') {
          this.openMask(8, 0)
        } else {
          this.toast.txt = '兑换失败'
          this.toast.isShow = true
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    /**
     * 任务 领取按钮
     * index 第几个按钮
     * id 奖品编号
     * statu 当前状态
     * score 领取获得筹码数
     */
    task: function (index, id, statu, score) {
      var TDarr = [
        '猜涨跌二期_任务页_开户',
        '猜涨跌二期_任务页_实盘报名',
        '猜涨跌二期_任务页_绑定微信',
        '猜涨跌二期_任务页_两融征信',
        '猜涨跌二期_任务页_两融开户',
        '猜涨跌二期_任务页_首次交易'
      ]
      // 猜涨跌二期_任务页 埋点
      TDAPP.onEvent(TDarr[index],"",{acc: this.userInfo.account})
      if (index === 0) {
        window.location.href = 'https://estock.xyzq.com.cn/static/channel_kh/active.htm?activityid=4851'
        return
      }
      // console.log(index, id, statu)
      if (statu === 0) {
        /* if (index === 0) {
          window.location.href = 'https://estock.xyzq.com.cn/static/channel_kh/active.htm?activityid=4851'
        } else  */if (index === 1) {
          window.location.href = 'https://static.xyzq.cn/activity/cgds/index.html?apptype=1&td_channelid=cgdsxcgz'
        } else if (index === 2) {
          this.openMask(9)
        } else if (index === 3) {
          window.location.href='https://estock.xyzq.com.cn/hallwap/biz/margincredit/index'
        } else if (index === 4) {
          // var type = index - 2
          this.openMask(5, 1)
          /* this.$ajax({
            url: '/apply',
            params: {
              account: this.userInfo.account,
              type: type,
              Token: this.userInfo.token,
              Client: this.userInfo.client
            }
          })
          .then((res) => {
            console.log(res.data)
            // var resp = {
            //   'respbody': 'success',
            //   'resphead': {
            //     'respcode': '0001',
            //     'respdetails': '成功'
            //   }
            // }
            if (res.data.resphead.respcode === '0000') {
              console.log('成功')
              this.openMask(5, index - 3)
            } else {
              console.log('失败')
              window.location.href='https://estock.xyzq.com.cn/hallwap/biz/margincredit/index'
              this.openMask(8, 1)
            }
          })
          .catch((err) => {
            console.log(err)
            this.openMask(8, 1)
          }) */
        } else if (index === 5) {
          var realParam = {'linkType': '1', 'link': '12', 'linkParam': ''}
          navigator.uniaccount.jumpActivity(realParam)
        }
      } else if (statu === 1) {
        this.$ajax({
          url: '/getMission',
          params: {
            account: this.userInfo.account,
            phone: this.userInfo.phone,
            id: id,
            Token: this.userInfo.token,
            Client: this.userInfo.client
          }
        })
        .then((res) => {
          console.log(res.data)
          // var resp = {
          //   'respbody': 'success',
          //   'resphead': {
          //     'respcode': '0000',
          //     'respdetails': '成功'
          //   }
          // }
          if (res.data.resphead.respcode === '0000') {
            this.getMoreList[index].statu = 2
            this.getMoreList[index].btn = '已领取'
            this.mainData.score += score
          } else {
            alert('领取失败, 请稍后再试')
          }
        })
      } else {
        console.log(statu)
      }
    },
    /**
     * 获取数据
     */
    setData: function (type) {
      // console.log(this.userInfo.account)
      // var account = this.userInfo.account || ''
      this.$ajax({
        url: '/index',
        params: {account: this.userInfo.account}
      })
      .then((res) => {
        var Data = res.data.respbody
        console.log(Data)
        if (Data.isNew === 1) { // 是否是第一次 0不是第一次，1是第一次
          // 猜涨跌二期_主页_签到_自动 埋点
          TDAPP.onEvent("猜涨跌二期_主页_签到_自动","",{})
          this.openMask(4, 1)
        }
        // this.isFirst = Data.secondTag.data === '1月08日' ? true : false
        this.isFirst = Data.secondTag.data === '12月21日' ? true : false
        /* 猜涨跌部分 */
        this.mainData.isSign = Data.isSign
        this.mainData.leftTimes = Data.leftTimes
        this.mainData.score = Data.score
        this.mainData.firstTag.data = Data.firstTag.data
        this.mainData.firstTag.isBet = Data.firstTag.isBet
        // this.mainData.firstTag.status = Data.firstTag.status
        this.mainData.firstTag.status = Data.secondTag.data === '1月08日' ? 1 : Data.firstTag.status
        // this.mainData.firstTag.status = 1
        this.mainData.firstTag.rate = Data.firstTag.rate
        if (Data.firstTag.guessRecord) {
          this.mainData.firstTag.guessRecord.score = Data.firstTag.guessRecord.score
          this.mainData.firstTag.guessRecord.tag = Data.firstTag.guessRecord.tag
          this.mainData.firstTag.comImg = Data.firstTag.guessRecord.type ? './static/images/我看涨.png' : './static/images/我看跌.png'
        }
        this.mainData.secondTag.data = Data.secondTag.data
        this.mainData.secondTag.isBet = Data.secondTag.isBet
        this.mainData.secondTag.jetton = Data.secondTag.jetton || 0
        this.mainData.secondTag.rate = Data.secondTag.rate
        if (Data.secondTag.guessRecord) {
          this.mainData.secondTag.guessRecord.score = Data.secondTag.guessRecord.score
          this.mainData.secondTag.guessRecord.type = Data.secondTag.guessRecord.type
          this.mainData.secondTag.comImg = Data.secondTag.guessRecord.type ? './static/images/我看涨.png' : './static/images/我看跌.png'
        }
        if (Data.secondTag.result) {
          this.mainData.secondTag.result.result = Data.secondTag.result.result
          this.mainData.secondTag.result.odds = Data.secondTag.result.odds
          if (Data.secondTag.guessRecord && Data.secondTag.result.result !== Data.secondTag.guessRecord.type) { // 是否猜中
            this.mainData.secondTag.result.imgUrl = './static/images/JIROU.png'
          }
          this.mainData.secondTag.result.udUrl = Data.secondTag.result.result ? './static/images/icon-up.png' : './static/images/icon-down.png'
          this.mainData.secondTag.result.bigUrl = Data.secondTag.result.result ? './static/images/金币-涨.png' : './static/images/金币-跌.png'
        }
        /* 竞猜情况 */
        var guessList = Data.guessList
        this.guessList = []
        for (let i = 0; i < guessList.length; i++) {
          const el = guessList[i]
          const imgUrl = (el.tag === '1' ? './static/images/icon-up.png' : './static/images/icon-down.png')
          const obj = {
            'account': el.account,
            'score': el.score,
            'tag': el.tag,
            'time': el.createTime,
            'imgUrl': imgUrl
          }
          this.guessList.push(obj)
        }
        /* 奖品列表 */
        var prizeList = Data.prizeList
        this.prizeList = []
        var prizeImg = [ // 图标路径
          './static/images/月卡.png',
          // './static/images/优惠利率.png',
          './static/images/话费.png',
          './static/images/年卡.png',
          // './static/images/优惠利率.png',
          './static/images/京东100.png',
          './static/images/取暖器.png',
          './static/images/iPhone X.png'
        ]
        for (let i = 0; i < prizeList.length; i++) {
          const el = prizeList[i]
          let type = 'card'
          if (el.isActivate) {
            type = 'rate'
          }
          if (i === 4 || i === 5) {
            type = 'inKind'
          } else if (i === 3) {
            type = 'jd'
          }
          const obj = {
            'id': el.id,
            'name': el.name,
            'price': el.price,
            'isActivate': el.isActivate,
            'isLimit': el.isLimit,
            'isSupply': el.isSupply,
            'imgUrl': prizeImg[i],
            'type': type
          }
          this.prizeList.push(obj)
        }
        console.log(type)
        if (type) {
          this.isLeftOk = true
          this.$emit('transferUser', this.mainData.leftTimes)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    /**
     * 获取更多筹码数据加载
     */
    getMoreData: function () {
      this.$ajax({
        url: '/missionList',
        params: {
          account: this.userInfo.account,
          phone: this.userInfo.phone,
          Token: this.userInfo.token,
          Client: this.userInfo.client
        }
      })
      .then((res) => {
        var arr = [
          {
            'tag': '一见如故',
            'imgUrl': './static/images/一见如故.png',
            'txt': '通过本活动开通兴业证券股票账户',
            'btn': '去开户'
          },
          {
            'tag': '摩拳擦掌',
            'imgUrl': './static/images/摩拳擦掌.png',
            'txt': '报名参加“荣耀赢家”实盘大赛',
            'btn': '去报名'
          },
          {
            'tag': '如沐春风',
            'imgUrl': './static/images/如沐春风.png',
            'txt': '到兴业证券和兴e通微信公众号绑定',
            'btn': '去绑定'
          },
          {
            'tag': '融情融意',
            'imgUrl': './static/images/融情融意.png',
            'txt': '参与两融征信：优理宝APP自助征信，快速申请融资 融券交易额度！',
            'btn': '去参加'
          },
          {
            'tag': '和睦融融',
            'imgUrl': './static/images/和睦融融.png',
            'txt': '开通两融账户：已经获得交易额度?快快联系理财顾问开户吧！',
            'btn': '去开通'
          },
          {
            'tag': '旭日初升',
            'imgUrl': './static/images/旭日初升.png',
            'txt': '交易初体验（活动期间新客户完成首笔交易）',
            'btn': '去交易'
          }
        ]
        var Data = res.data.respbody
        console.log(Data)
        var statusArr = ['', '可领取', '已领取', '不可领']
        this.getMoreList = []
        for (let i = 0; i < Data.length; i++) {
          const el = Data[i]
          var btn = el.status === 0 ? arr[i].btn : statusArr[el.status]
          const obj = {
            'id': el.id, // 编号
            'score': el.score, // 所需筹码数
            'btn': btn, // 按钮显示
            'statu': el.status, // 状态显示
            'tag': arr[i].tag, // 方框名称
            'imgUrl': arr[i].imgUrl,
            'txt': arr[i].txt
          }
          this.getMoreList.push(obj)
        }
        this.firstOpenMore = false
      })
      .catch((err) => {
        console.log(err)
      })
    },
    /**
     * 竞猜列表 将时间戳改为时间格式
     */
    getOthersTime: function (str1) {
      var date, h, m, s, time
      var str2 = parseInt(str1)
      date = new Date(str2)
      h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      time = (h + m + s)
      return time
    }
  },
  mounted: function () {
    this.setData()
    var that = this
    var timer = setInterval(() => {
      // console.log('定时器')
      if (this.userInfo.isLogin) {
        clearInterval(timer)
        that.setData(1)
      }
    }, 300)
    console.log(TDAPP.onEvent)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.home{
  header{
    width: 100%;
    position: relative;
    > div{
      position: absolute;
      top: 3.402778rem; /* 490 */
      right: 0.173611rem; /* 25 */
      a{
        width: 1.222222rem; /* 176 */
        height: 1.222222rem; /* 176 */
        display: block;
        &::nth-child(0){
          margin-bottom: 0.222222rem; /* 32 */
        }
      }
    }
  }
  main{
    > .guess{
      padding: 0.451389rem 0; /* 65px */
      border-radius: 0.173611rem; /* 25px */
      box-sizing: border-box;
      box-shadow: 0px 0px 0.138889rem 0.138889rem #FA9B42 inset; /* 20px */
      background-color: #FDAF55;
      > .gains{
        width: 6.680556rem; /* 962px */
        height: 0.652778rem; /* 94px */
        line-height: 0.652778rem; /* 94px */
        margin: 0 auto 0.263889rem; /* 38px */
        font-size: 0.319444rem; /* 46px */
        font-family: 'PingFangSC-Medlum';
        color: #fff;
        text-align: center;
        display: block;
        background-color: #E84F1A;
        border-radius: 0.326389rem; /* 47px */
        a{
          font-size: .243056rem; /* 35 */
          font-family: "PingFangSC-Regular";
          color: #FFF4A2;
          padding-left: .3125rem; /* 45 */
          display: inline-block;
          height: 0.652778rem; /* 94px */
          line-height: 0.652778rem; /* 94px */
          position: relative;
          top: -.020833rem; /* 3 */
        }
      }
      > .container{
        width: 6.680556rem; /* 962px */
        margin: 0 auto 0.333333rem; /* 8px */
        border-radius: .208333rem; /* 47px */
        overflow: hidden;
        .gs_guess{
          background-color: #ffffed;
          padding-top: 1.083333rem; /* 156px */
          position: relative;
          .tab{
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            text-align: center;
            background-color: #FDB563;
            a{
              float: left;
              width: 3.319444rem; /* 478px */
              margin: 0;
              color: #c96c29;
              font-size: 0.333333rem; /* 48px */
              font-family: "AdobeHeitiStd-Regular";
              height: 0.701389rem; /* 101px */
              line-height: 0.701389rem; /* 101px */
              background-color: #FDE569;
              &:first-child{
                margin-right: 0.027778rem; /* 4px */
                border-radius: .208333rem .208333rem 0 0; /* 48px */
              }
              &:last-child{
                border-radius: .208333rem .208333rem 0 0; /* 48px */
              }
              span{
                display: inline-block;
                width: 0.1875rem; /* 27px */
                height: 0.208333rem; /* 30px */
              }
            }
            .current{
              background-color: #FFFFED;
            }
          }
          > .ing{
            .left, .right{
              width: 50%;
            }
            .data{
              margin: 0.375rem 0.319444rem 0.277778rem; /* 54px 46px 40px */
              text-align: center;
              color: #c96c29;
              font-size: 0.263889rem; /* 38px */
              line-height: 0.541667rem; /* 78px */
              border-radius: 0.270833rem; /* 39px */
              background-color: #f9e6b3;
              a{
                font-family: "PingFangSC-Medlum";
              }
            }
            .img{
              width: 1.736111rem; /* 250px */
              height: 1.611111rem; /* 232px */
              margin: 0 auto;
            }
            .toStart{
              color: #666;
              padding-left: .541667rem; /* 78 */
              line-height: .395833rem; /* 57 */
              padding-bottom: .9375rem; /* 135 */
              font-size: .333333rem; /* 48 */
              font-family: "PingFangSC-Semibold";
            }
          }
          a{
            display: block;
            width: 2.701389rem; /* 389px */
            height: 1.104167rem; /* 159px */
            margin: 0 0.319444rem; /* 46px */
          }
          .end_time{
            font-size: 0.222222rem; /* 32px */
            line-height: 0.222222rem; /* 32px */
            color: #999;
            padding: 0.222222rem 0 0.222222rem; /* 32px */
            text-align: center;
          }
          .question{
            margin-bottom: 0.347222rem; /* 156px */
            text-align: center;
            font-size: 0.277778rem; /* 40px */
            color: #fa6c5d;
            font-family: "PingFangSC-Medlum";
            span{
              font-size: 0.416667rem; /* 60px */
              color: #f24a39;
            }
          }
        }
        .end {
          .have_result{
            .left{
              width: 1.736111rem; /* 250px */
              height: 1.611111rem; /* 232px */
              float: left;
              margin: 0.479167rem 0.555556rem 0.694444rem 0.875rem; /* 69px 80px 100px 126px */
            }
            .right{
              color: #999;
              div{
                &:nth-child(1){
                  margin-top: 0.791667rem; /* 114px */
                  font-size: 0.333333rem; /* 48px */
                  color: #666;
                }
                &:nth-child(2){
                  margin-top: 0.180556rem; /* 26px */
                  font-size: 0.263889rem; /* 38px */
                  span{
                    color: #f76c4e;
                  }
                }
                &:nth-child(3){
                  font-size: 0.222222rem; /* 32px */
                  margin-top: 0.111111rem; /* 16px */
                  span{
                    color: #f66c4f;
                  }
                }
              }
            }
            .description{
              .img{
                padding: 0 0.277778rem 0 0.541667rem; /* 40px 78px */
                width: 1.076389rem; /* 155px */
                height: 0.958333rem; /* 138px */
                position: relative;
                &:before{
                  content: '';
                  position: absolute;
                  width: 0.375rem; /* 54px */
                  height: 0.25rem; /* 36px */
                  top: 0;
                  right: 0;
                  background: url('../assets/bilin1.png') no-repeat;
                  background-size: 0.375rem 0.25rem;
                }
              }
              .fl > div{
                &:nth-child(1){
                  margin-top: 0.138889rem; /* 42px */
                  font-size: 0.333333rem; /* 48px */
                  color: #666;
                }
                &:nth-child(2){
                  margin-top: 0.138889rem; /* 20px */
                  font-size: 0.222222rem; /* 32px */
                  color: #999;
                }
                span{
                  color: #fd4d3d;
                }
              }
            }
          }
          .end_time{
            padding: 1.111111rem 0 0.194444rem; /* 160px 28px */
            text-align: center;
            font-size: 0.222222rem; /* 32px */
            font-family: "PingFangSC-Regular";
            color: #999;
          }
          > .no_result{
            .left, .right{
              width: 50%;
              box-sizing: border-box;
              margin: 0;
            }
            .img{
              width: 1.736111rem; /* 250px */
              height: 1.611111rem; /* 232px */
              margin: 0 auto 0.375rem; /* 54px */
            }
            .data{
              width: 2.548611rem; /* 375px */
              height: 0.541667rem; /* 78px */
              line-height: 0.541667rem; /* 78px */
              color: #c96c29;
              font-size: 0.263889rem; /* 38px */
              background-color: #F9E6B3;
              margin: 0 auto 0.277778rem; /* 40px */
              text-align: center;
              border-radius: 0.270833rem; /* 39px */
            }
            a{
              width: 2.701389rem; /* 389px */
              height: 0.993056rem; /* 143px */
            }
            .my_guess{
              font-size: 0.333333rem; /* 48px */
              color: #838380;
              height: 0.993056rem; /* 143px */
              line-height: 0.993056rem; /* 143px */
              overflow: hidden;
            }
            .end_time{
              padding: 0.222222rem 0 0.222222rem; /* 32px */
            }
          }
        }
        .ing{
          .UorD{
            .my_guess{
              font-size: 0.333333rem; /* 48px */
              color: #838380;
              height: 0.993056rem; /* 143px */
              line-height: 0.993056rem; /* 143px */
              overflow: hidden;
              div{
                width: 1000px;
              }
            }
          }
        }
        .others{
          background-color: #fffacb;
          padding: 0.069444rem 0.319444rem; /* 10px 46px */
          overflow:hidden;
          .container{
            overflow: hidden;
          }
          li {
            line-height: 0.722222rem; /* 104px */
            font-size: 0.277778rem; /* 40px */
            color: #666;
            div{
              float: left;
            }
            .others_time{
              width:1.180556rem;/*170px*/
            }
          }
          .others_judge{
            margin: 0 0.3125rem 0 0.25rem; /* 45px 36px */
            width:0.972222rem;/*140px*/
          }
          .get{
            width: 1.666667rem; /* 240 */
            height: 0.722222rem; /* 104px */
            overflow: hidden;
            div{
              width: 1000px;
            }
          }
          .bearish .others_judge{
            color: #ff5959;
          }
          .bullish .others_judge{
            color: #73bd43;
          }
          .others_judge .img{
            width: 0.1875rem; /* 27px */
            height: 0.208333rem; /* 30px */
            display: inline-block;
          }
          .tel{
            margin-right: .243056rem; /* 35px */
            width:1.388889rem;/*200px*/
          }
        }
      }
    }
    > .convert {
      /* width: 6.680556rem; */ /* 962px */
      margin-top: 0.569444rem; /* 82px */
      border-radius: 0.173611rem; /* 25px */
      box-shadow: 0 5px #fcd27b;
      padding: 0.305556rem 0.416667rem 0.444444rem; /* 44px 60px 64px */
      box-sizing: border-box;
      box-shadow: 0px 0px 0.138889rem 0.138889rem #FA9B42 inset; /* 20px */
      background-color: #FDAF55;
      position: relative;
      > .title{
        width: 5.361111rem; /* 772px */
        height: 0.819444rem; /* 118px */
        margin: 0 auto;
      }
      > .fu{
        position: absolute;
        width: .916667rem; /* 132 */
        height: .916667rem; /* 132 */
        top: .222222rem; /* 32 */
      }
      > .left{
        left: .069444rem; /* 10 */
      }
      > .right{
        right: .069444rem; /* 10 */
      }
      > .description{
        position: relative;
        width: 6.680556rem;
        z-index: 2;
        font-family: "PingFangSC-Medlum";
        padding: 0.138889rem 0.826389rem; /* 20px 119px */
        font-size: 0.236111rem; /* 34px */
        color: #e84818;
        line-height: 0.326389rem; /* 47px */
        box-sizing: border-box;
        font-weight: 600;
        a{
          color: #fff3a6;
        }
      }
      > .list{
        padding: 0 0.180556rem 0 0.208333rem; /* 26px 30px */
        background-color: #FFFFEC;
        border-radius: 0.173611rem; /* 25px */
        li{
          border-bottom: 1px solid #e3e3e3;
        }
        .rate{
          .img{
            width: 0.923611rem; /* 133px */
            height: 0.472222rem; /* 68px */
          }
          .center{
            padding-bottom: .104167rem; /* 15 */
          }
        }
        .card{
          .img{
            width: 0.784722rem; /* 113px */
            height: 0.798611rem; /* 115px */
          }
        }
        .jd{
          .img{
            width: 0.923611rem; /* 133px */
            height: 0.472222rem; /* 68px */
          }
        }
        .inKind{
          .img{
            width: .833333rem; /* 120 */
            height: .965278rem; /* 139 */
          }
        }
        .left{
          width: 0.923611rem; /* 133px */
          height: 1.305556rem; /* 188px */
          position: relative;
        }
        .center{
          padding: 0.333333rem 1.368056rem 0.333333rem 1.083333rem; /* 48px 197px 48px 156px */
          font-size: 0.222222rem; /* 32px */
          color: #8a8a8a;
          line-height: 0.333333rem; /* 48px */
          i{
            font-size: 0.277778rem; /* 40px */
          }
          .p{
            color: #666;
          }
          span{
            color: #fc4d3c;
          }
          p a{
            color: #00C5FF;
            margin-left: 0.034722rem; /* 5px */
          }
        }
        .img{
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto;
        }
        .right a{
          width: 1.1875rem; /* 171px */
          height: 0.555556rem; /* 80px */
          background-color: #ff981e;
          font-size: 0.277778rem; /* 40px */
          color: #fff;
          display: block;
          text-align: center;
          line-height: 0.555556rem; /* 80px */
          border-radius: 0.277778rem; /* 40px */
          margin-top: 0.333333rem; /* 48px */
        }
        .right .pass{
          background-color: #FF9900;
        }
        .right .fail{
          background-color: #d9d9d9;
        }
        .right .exchanged{
          background-color: #fff;
          color: #939393;
          border-radius: 0.277778rem; /* 40px */
          border: 1px solid #939393;
        }
      }
    }
  }
  footer{
    position: relative;
    width: 100%;
    > .img{
      width: 100%;
    }
    > .rule{
      position: absolute;
      width: 100%;
      text-align: center;
      height: .902778rem; /* 130 */
      line-height: .902778rem; /* 130 */
      font-size: .277778rem; /* 40 */
      font-family: "PingFangSC-Semibold";
      top: .5rem; /* 72 */
      text-decoration: underline;
      color: #54CBED;
      z-index: 5;
    }
  }
  .bridge{
    width: 7.402778rem; /* 1066px */
    height: 0.666667rem; /* 96px */
    position: absolute;
    top: -0.611111rem;
    left: 0.041667rem;
  }
  .supernatant{
    width: 100%;
    /* 浮层公共样式 */
    .shade_supernatant{
      position: fixed;
      z-index: 10;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.7);
      top: 0;
      left: 0;
      .container_supernatant{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        border-radius: 0.173611rem; /* 25px */
        background-color: #fff;
        .close_supernatant{
          width: 0.659722rem; /* 95px */
          height: 0.659722rem; /* 95px */
          position: absolute;
          top: -0.951389rem; /* 137px */
          right: 0;
          &:before{
            content: '';
            position: absolute;
            left: 50%;
            bottom: -0.291667rem;
            height: 0.291667rem;
            border-left: 1px solid #fff;
          }
        }
        .top-three{
          width: 5.75rem; /* 828px */
          height: 2.951389rem; /* 425px */
          background: url('../assets/弹窗bg3.png') no-repeat;
          background-size: 5.75rem 2.951389rem; /* 828px 425px */
        }
      }
    }
    > .sign_supernatant{
      .container{
        width: 5.75rem; /* 828px */
        height: 6.25rem; /* 900 */
        text-align: center;
        .img{
          width: 5.75rem; /* 828px */
          height: 3.041667rem; /* 438px */
        }
        div{
          &:nth-child(2){
            color: #EC3C25;
            margin-top: .520833rem; /* 75 */
            font-family: "PingFangSC-Medlum";
            font-size: 0.597222rem; /* 86px */
            height: .555556rem; /* 80 */
            line-height: .555556rem; /* 80 */
          }
        }
        a{
          display: block;
          width: 3.201389rem; /* 461px */
          height: 0.729167rem; /* 105px */
          line-height: 0.729167rem; /* 105px */
          color: #fff;
          background-color: #EE4F17;
          margin: .277778rem auto 0; /* 77px 0 */
          font-size: 0.347222rem; /* 50px */
          font-family: "PingFangSC-Medlum";
          border-radius: .173611rem; /* 25 */
          &:nth-of-type(2){
            margin-top: .208333rem; /* 10 */
          }
        }
        .title{
          color: #fff;
          font-size: 0.416667rem; /* 60px */
          font-weight: bold;
          position: absolute;
          width: 100%;
          top: 0.395833rem; /* 57px */
          left: 0;
        }
      }
    }
    > .cathectic_supernatant{
      .container{
        width: 5.75rem; /* 828px */
        height: 4.486111rem; /* 646px */
        text-align: center;
        .top{
          width: 5.75rem; /* 828px */
          height: 2.840278rem; /* 409px */
          background: url('../assets/弹窗bg4.png') no-repeat;
          background-size: 5.75rem 2.840278rem; /* 828px 409px */
          input{
            width: 4.486111rem; /* 646px */
            padding-left: 0.277778rem; /* 40px */
            height: 1.069444rem; /* 154px */
            line-height: 1.069444rem; /* 154px */
            color: #999;
            font-size: 0.333333rem; /* 48px */
            margin: 0.868056rem auto 0.152778rem; /* 125px 22px */
            background-color: #fff;
            border-radius: 0.069444rem; /* 10px */
          }
          div{
            font-size: 0.25rem; /* 36px */
            color: #fff;
          }
        }
        button{
          margin: 0.472222rem auto 0; /* 68px */
          background-color: #EE4F17;
          color: #fff;
          width: 3.194444rem; /* 460px */
          height: 0.722222rem; /* 104px */
          line-height: 0.722222rem; /* 104px */
          font-size: 0.347222rem; /* 50px */
          border-radius: 0.138889rem; /* 20px */
          border: none;
        }
      }
    }
    > .noChip_supernatant{
      display:-webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      justify-content: center;
      align-items: center;
      .container{
        width: 5.75rem; /* 828px */
        text-align: center;
        background-color: #fff;
        border-radius: .173611rem;
        position: relative;
        .top{
          width: 5.75rem; /* 828px */
          height: 2.951389rem; /* 425px */
          background: url('../assets/弹窗bg4.png') no-repeat;
          background-size: contain; /* 828px 425px */
          display:-webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          justify-content: center;
          align-items: center;
          p{
            line-height: 0.555556rem; /* 80px */
            font-size: 0.375rem; /* 54px */
            color: #fff;
          }
        }
        .discription{
          font-size: .347222rem; /* 50 */
          margin-top: .368056rem; /* 53 */
          line-height: .631944rem; /* 91 */
          color: #666;
        }
        button{
          margin: .472222rem auto .472222rem; /* 68 */
          background-color: #EE4F17;
          color: #fff;
          width: 3.194444rem; /* 460px */
          height: 0.722222rem; /* 104px */
          line-height: 0.722222rem; /* 104px */
          font-size: 0.347222rem; /* 50px */
          border-radius: 0.138889rem; /* 20px */
          border: none;
        }
        .close_supernatant{
          width: 0.659722rem; /* 95px */
          height: 0.659722rem; /* 95px */
          position: absolute;
          top: -0.951389rem; /* 137px */
          right: 0;
          &:before{
            content: '';
            position: absolute;
            left: 50%;
            bottom: -0.291667rem;
            height: 0.291667rem;
            border-left: 1px solid #fff;
          }
        }
      }
    }
    > .more_supernatant{
      display:-webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      justify-content: center;
      align-items: center;
      .container{
        width: 6.972222rem; /* 1004 */
        height: 80%;
        font-family: "PingFangSC-Semibold";
        box-sizing: border-box;
        background-color: #fff;
        position: relative;
        padding-top: 1.451389rem; /* 209 */
        box-sizing: border-box;
        border-radius: .173611rem; /* 25 */
        .title{
          position: absolute;
          top: 0;
          width: 100%;
          height: 1.451389rem; /* 209 */
          line-height: 1.451389rem; /* 209 */
          background-color: #EE4F17;
          color: #fff;
          text-align: center;
          font-size: .402778rem; /* 58 */
          border-radius: .173611rem .173611rem 0 0; /* 25 */
        }
        .close_supernatant{
          width: 0.659722rem; /* 95px */
          height: 0.659722rem; /* 95px */
          position: absolute;
          top: -.958333rem; /* 138 */
          right: .347222rem; /* 100 */
          &:before{
            content: '';
            position: absolute;
            left: 50%;
            bottom: -0.291667rem;
            height: 0.291667rem;
            border-left: 1px solid #fff;
          }
        }
        ul{
          height: 100%; /* 890 */
          overflow-y: scroll;
          li{
            border-bottom: 1px solid #E4E4E4;
            &:last-child{
              border-bottom: none;
            }
            .left{
              float: left;
              width: 1rem; /* 144 */
              height: 1rem; /* 144 */
              margin: .263889rem 0 0 .263889rem; /* 38 */
            }
            .right{
              padding-left: 1.527778rem; /* 220 */
              box-sizing: border-box;
              .top{
                a{
                  float: right;
                  margin: .465278rem .263889rem 0 0; /* 67 38 */
                  width: 1.388889rem; /* 200 */
                  height: .541667rem; /* 78 */
                  line-height: .541667rem; /* 78 */
                  text-align: center;
                  border: .013889rem solid #EE531C;
                  border-radius: .263889rem; /* 38 */
                  color: #EE4F17;
                  font-size: .291667rem; /* 42 */
                }
                p{
                  padding-right: 1.652778rem; /* 238 */
                  box-sizing: border-box;
                  line-height: .3125rem; /* 45 */
                  font-size: .277778rem; /* 40 */
                  padding-top: .263889rem; /* 38 */
                  color: #585858;
                  span{
                    font-size: .25rem; /* 36 */
                    display: inline-block;
                    height: .319444rem; /* 46 */
                    line-height: .319444rem; /* 46 */
                    box-sizing: border-box;
                    margin-top: .069444rem; /* 10 */
                    width: 1.138889rem;
                    text-align: center;
                  }
                }
              }
              .bottom{
                color: #878787;
                font-size: .243056rem; /* 35 */
                line-height: .347222rem; /* 40 */
                padding: .138889rem .347222rem .111111rem 0; /* 20 50 16 */
                box-sizing: border-box;
              }
            }
            &:nth-child(1) .right p span{
              border: 1px solid #FFAEBF;
              color: #FFAEBF;
            }
            &:nth-child(2) .right p span{
              border: 1px solid #E33331;
              color: #E33331;
            }
            &:nth-child(3) .right p span{
              border: 1px solid #FF6642;
              color: #FF6642;
            }
            &:nth-child(4) .right p span{
              border: 1px solid #FDBE00;
              color: #FDBE00;
            }
            &:nth-child(5) .right p span{
              border: 1px solid #38ACFD;
              color: #38ACFD;
            }
            &:nth-child(6) .right p span{
              border: 1px solid #FF6642;
              color: #FF6642;
            }
          }
        }
      }
    }
    > .first_supernatant{
      display:-webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      justify-content: center;
      align-items: center;
      .container{
        width: 5.75rem; /* 828 */
        background-color: #fff;
        border-radius: 0.173611rem; /* 25px */
        overflow: hidden;
        .top{
          background: url('../assets/弹窗bg3.png');
          background-size: contain;
          height: 2.951389rem; /* 425 */
          line-height: 2.951389rem; /* 425 */
          text-align: center;
          color: #fff;
          font-size: .486111rem; /* 70 */
          font-family: "PingFangSC-Semibold";
        }
        .description{
          height: 1.138889rem; /* 164 */
          line-height: 1.138889rem; /* 164 */
          color: #EC3C25;
          text-align: center;
          font-family: "PingFangSC-Medlum";
          font-size: .305556rem; /* 44 */
        }
        button{
          display: block;
          width: 3.201389rem; /* 461px */
          height: 0.729167rem; /* 105px */
          line-height: 0.729167rem; /* 105px */
          color: #fff;
          background-color: #EE4F17;
          margin: .583333rem auto; /* 84 0 */
          font-size: 0.347222rem; /* 50px */
          font-family: "PingFangSC-Medlum";
          border-radius: .173611rem; /* 25 */
          border: none;
        }
      }
    }
    > .financial_supernatant{
      display:-webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      justify-content: center;
      align-items: center;
      .container{
        width: 5.75rem; /* 828 */
        background-color: #fff;
        border-radius: 0.173611rem; /* 25px */
        overflow: hidden;
        .top{
          display:-webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          height: 2.951389rem; /* 425 */
          background: url('../assets/弹窗bg4.png');
          background-size: contain;
          line-height: .534722rem; /* 77 */
          font-size: .375rem; /* 54 */
          font-family: "PingFangSC-Semibold";
          text-align: center;
        }
        button{
          display: block;
          width: 3.201389rem; /* 461px */
          height: 0.729167rem; /* 105px */
          line-height: 0.729167rem; /* 105px */
          color: #fff;
          background-color: #EE4F17;
          margin: .583333rem auto; /* 84 0 */
          font-size: 0.347222rem; /* 50px */
          font-family: "PingFangSC-Medlum";
          border-radius: .173611rem; /* 25 */
          border: none;
        }
      }
    }
    > .success_supernatant{
      .container{
        width: 5.75rem; /* 828px */
        height: 6.076389rem; /* 875px */
        text-align: center;
        .top{
          width: 5.75rem; /* 828px */
          height: 2.840278rem; /* 409px */
          background: url('../assets/弹窗bg3.png') no-repeat;
          background-size: 5.75rem 2.840278rem; /* 828px 409px */
          box-sizing: border-box;
          padding-top: 1.270833rem; /* 183px */
          color: #fff;
          font-family: "PingFangSC-Medlum";
          font-size: .541667rem; /* 78 */
        }
        .description{
          font-size: .319444rem; /* 46 */
          color: #666;
          line-height: 0.631944rem; /* 91px */
          margin-top: 0.3125rem; /* 45px */
          margin-bottom: 0.486111rem; /* 70px */
          font-family: "PingFangSC-Medlum";
        }
        a{
          display: block;
          width: 3.201389rem; /* 461px */
          height: 0.729167rem; /* 105px */
          line-height: 0.729167rem; /* 105px */
          margin: 0 auto;
          color: #fff;
          background-color: #EE4F17;
          border-radius: 0.138889rem; /* 20px */
        }
      }
    }
    > .fail_supernatant{
      .container{
        width: 5.513889rem; /* 794px */
        height: 2.541667rem; /* 366px */
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
          display: block;
          text-align: center;
          font-size: 0.319444rem; /* 46px */
          height: 0.902778rem; /* 130px */
          line-height: 0.902778rem; /* 130px */
          color: #FF4B34;
        }
      }
    }
    > .QRcode_supernatant{
      .container{
        width: 6.305556rem; /* 908 */
        height: 4.777778rem; /* 688 */
        background-color: #fff;
        .top{
          font-size: .347222rem; /* 50 */
          font-family: "PingFangSC-Semibold";
          color: #fff;
          background-color: #EE4F17;
          border-radius: .173611rem .173611rem 0 0; /* 25 */
          height: 1.472222rem; /* 212 */
          text-align: center;
          display:-webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .bottom{
          .fl{
            width: 50%;
            div{
              width: 1.409722rem; /* 203 */
              height: 1.395833rem; /* 201 */
              margin: .486111rem auto .083333rem; /* 70 12 */
            }
            p{
              color: #666;
              font-family: "PingFangSC-Medium";
              font-size: .25rem; /* 36 */
              line-height: .333333rem; /* 48 */
              text-align: center;
            }
          }
        }
      }
    }
    > .rule_supernatant{
      display:-webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      justify-content: center;
      align-items: center;
      .container{
        width: 90%;
        height: 80%;
        background-color: #FEFEE3;
        box-sizing: border-box;
        padding-bottom: .916667rem; /* 132 */
        padding-top: 1.354167rem; /* 195 */
        border-radius: .173611rem; /* 25 */
        overflow: hidden;
        position: relative;
        font-size: 0.236111rem; /* 34px */
        line-height: .3125rem; /* 45 */
        > .title{
          width: 5.361111rem; /* 772 */
          height: .819444rem; /* 118 */
          padding: .354167rem .743056rem .180556rem .847222rem; /* 51 107 26 122 */
          position: absolute;
          top: 0;
          left: 0;
        }
        > a{
          position: absolute;
          bottom: 0;
          left: 0;
          height: .916667rem; /* 132 */
          line-height: .916667rem; /* 132 */
          text-align: center;
          width: 100%;
          background-color: #FF613D;
          color: #fff;
          font-family: "PingFangSC-Medium";
          font-size: .347222rem; /* 50 */
        }
        > .rule{
          box-sizing: border-box;
          padding: 0 .416667rem 0 .472222rem; /* 60 68 */
          height: 100%;
          overflow: scroll;
          h4{
            color: #c96c29;
            font-weight: bold;
          }
          p{
            text-indent: 2em;
            color: #696969;
          }
          .table{
            border: 1px solid #c96c29;
            display: inline-block;
            color: #696969;
            .left{
              border-right: 1px solid #c96c29;
              .thead, .tbody{
                width: 1.145833rem; /* 166 */
              }
            }
            .right{
              border-right: 1px solid #c96c29;
              .thead, .tbody{
                width: 2.152778rem; /* 306 */
              }
            }
            .right-r{
              .thead, .tbody{
                width: 2.347222rem; /* 338 */
                span{
                  font-family: "PingFangSC-Medium";
                  font-size: .166667rem; /* 24 */
                }
              }
            }
            .thead{
              border-bottom: 1px solid #c96c29;
              height: 0.506944rem; /* 73px */
              line-height: 0.506944rem; /* 73px */
              text-align: center;
              font-size: 0.236111rem; /* 34px */
              font-weight: bold;
              background-color: #FFF7B4;
              font-family: "PingFangSC-Semibold";
            }
            .tbody{
              line-height: .347222rem; /* 50 */
              font-size: .222222rem; /* 32 */
              text-align: center;
            }
          }
          .tx_in0{
            text-indent: 0;
          }
          p a{
            color: #8bc6db;
          }
        }
      }
    }
    > .result{
      position: fixed;
      font-size: 0.347222rem;
      bottom: 0.347222rem; /* 50px */
      left: 0;
      text-align:center;
      height: 0.486111rem; /* 70px */
      line-height: 0.486111rem; /* 70px */
      width: 100%;
      opacity: 0;
      z-index: 4;
      > span{
        padding: 0 0.138889rem; /* 20px */
        border-radius: 0.138889rem; /* 10px */
        color: #fff;
        background-color: #535352;
      }
    }
    > .animation{
      animation: result 3s;
      -webkit-animation: result 3s;
      @keyframes result {
        0%   {opacity: 0;}
        25%  {opacity: 1;}
        75%  {opacity: 1;}
        100% {opacity: 0;}
      }
      @-webkit-keyframes result{ /* Safari 与 Chrome */
        0%   {opacity: 0;}
        25%  {opacity: 1;}
        75%  {opacity: 1;}
        100% {opacity: 0;}
      }
    }
    > .share_supernatant{
      display:-webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      justify-content: center;
      align-items: center;
      .container{
        width: 6rem; /* 864 */
        position: relative;
        font-size: "PingFangSC-Semibold";
        background-color: #fff;
        border-radius: .347222rem; /* 50 */
        overflow: hidden;
        padding-bottom: .347222rem;
        .title{
          height: 1.083333rem; /* 156 */
          line-height: 1.083333rem; /* 156 */
          background: #ff9439;
          background: -webkit-linear-gradient(bottom, #ff9439 , #ffc735); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(top, #ff9439, #ffc735); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(top, #ff9439, #ffc735); /* Firefox 3.6 - 15 */
          background: linear-gradient(to top, #ff9439 , #ffc735); /* 标准的语法 */
          font-size: .402778rem; /* 58 */
          text-align: center;
          color: #fff;
        }
        .img{
          width: 2.8125rem; /* 405 */
          height: 2.631944rem; /* 379 */
          margin: .166667rem auto; /* 24 */
        }
        .des{
          line-height: .416667rem; /* 60 */
          text-align: center;
          color: #434343;
          font-size: .333333rem; /* 48 */
        }
        .button{
          text-align: center;
          font-size: .402778rem; /* 58 */
          color: #fff;
          background-image: url('../assets/btn_confirm_n.png');
          background-size: contain;
          width: 4.625rem; /* 666 */
          height: .784722rem; /* 113 */
          line-height: .784722rem; /* 113 */
          margin: .222222rem auto 0; /* 32 */
        }
        .close{
          width: .368056rem; /* 53 */
          height: .361111rem; /* 52 */
          position: absolute;
          top: 0; /* 50 */
          right: 0; /* 50 */
          padding: .347222rem;
        }
      }
    }
  }
}
</style>
