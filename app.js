//app.js
//const utils = require('./utils/util.js')
import utils from './utils/util'; 

App({
  onLaunch: function () {
    // 展示本地存储能力

   /* // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
   
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })*/
  },
  // 判断是否登录
  isLogin:function(callback) {
    let that = this
    var token = wx.getStorageSync('token') || []
    console.log(token.token)

    if(token.token) {
        // 如果有全局存储的登录态，暂时认为他是登录状态
      callback && callback(token.token)
      } else {
        // 如果没有登录态，弹窗提示一键登录
        that.showLoginModal()
      }
  },
  // 显示一键登录的弹窗
  showLoginModal:function() {
    wx.showModal({
      title: '提示',
      content: '你还未登录，登录后可获得完整体验 ',
      confirmText: '点击登录',
      success(res) {
        // 点击一键登录，去授权页面
        console.log(res)
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/center/center',
            fail: function () {
              console.info("跳转失败")
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  utils
})