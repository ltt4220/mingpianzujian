// pages/component/pupUp/pupUp.js
const app = getApp();
let imgUrl = app.globalData.poxy.IMGURL;
Component({
  properties: {
    contBoxW: {
      type: Number,
      value: 248,
      observer: function(newVal, oldVal) {
        console.log(newVal, oldVal, "-----------==========--")
      }, // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
    },
    contImg: {
      type: String,
      value: ''
    },
    contImgH: {
      type: Number,
      value: 0
    },
    contImgW: {
      type: Number,
      value: 0
    },
    contBoxPadLR: {
      type: Number,
      value: 20
    },
    contentTit: {
      type: String,
      value: "已达到个人5张名片上限！"
    },
    contentTitBot: {
      type: Number,
      value: 0
    },
    contColor: {
      type: String,
      value: "#474747"
    },
    contFsize: {
      type: String,
      value: "14"
    },
    contWeight: {
      type: String,
      value: "normal"
    },
    textAlign: {
      type: String,
      value: "center"
    },
    boxHeight: {
      type: String,
      value: 66
    },
    leftBtnTit: {
      type: String,
      value: "我知道了"
    },
    rightBtnTit: {
      type: String,
      value: "我的名片"
    },
    leftcolor: {
      type: String,
      value: "#202020"
    },
    rightcolor: {
      type: String,
      value: "#1081FF"
    },
    leftWeight: {
      type: String,
      value: "bold"
    },
    rightWeight: {
      type: String,
      value: "bold"
    },
    btnHeight: {
      type: String,
      value: "50"
    },
    btnFsize: {
      type: String,
      value: "14"
    },
    direction: {
      type: Number,
      value: 1
    }
  },

  /**
   * 页面的初始数据
   */

  data: {
    winH: null,
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached() {
      let _this = this;
      wx.getSystemInfo({
        success(res) {
          console.log(res, "---------00000000");
          let _width = parseInt(res.screenWidth / (100 / 82));
          _this.setData({
            contBoxW: _width
          })
        }
      });
    },
    ready: function() {},
    moved: function() {},
    detached: function() {},
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function() {
      // 页面被展示
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },
  methods: {
    _leftBtn() {
      this.triggerEvent('leftBtn', false)
    },
    _rightBtn() {
      this.triggerEvent('rightBtn', false)
    },
    _showModal() {

    }
  }
})