// pages/center/center.js
const $vm = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    },
    isLogin:false,
    list: [
      {
        id: 'form',
        name: '我的收藏',
        open: false,
        pages: []
      }
    ]
  },
  kindToggle: function (e) {

    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open

            //list[i].pages.push(...banners);
        this.setListArt(i)
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
setListArt:function(index){
  let list = this.data.list;
    let token = wx.getStorageSync('token') || []
    $vm.utils.get("/user/favorites/my/", {}, { 'XX-Token': token.token, 'XX-Device-Type': 'wxapp' }).then(res => {
      console.log(res)
      if (res.code == 1) {
        let banners = res.data.map(news => {
          return {
            id: news.object_id,
            title: news.title,
            image: news.thumbnail
          }
        })
        list[index].pages = banners
        this.setData({
          list: list
        });
      }
      }).catch(err => console.log(err));
  },
  // 获取用户信息
  getUserInfo: function (code, callback) {
    console.log();
    let that = this
    wx.getUserInfo({
      // 获取成功，全局存储用户信息，开发者服务器登录
      success(res) {
        // 全局存储用户信息
        //store.commit('storeUpdateWxUser', res.userInfo)
        console.log(res)
        that.postLogin(code, res.iv, res.encryptedData, res.rawData,res.signature, callback)
      },
      // 获取失败，弹窗提示一键登录
      fail() {
        console.log('获取信息失败')
        //wx.hideLoading()
        // 获取用户信息失败，清楚全局存储的登录状态，弹窗提示一键登录
        // 使用token管理登录态的，清楚存储全局的token
        // 使用cookie管理登录态的，可以清楚全局登录状态管理的变量
        //store.commit('storeUpdateToken', '')
        // 获取不到用户信息，说明用户没有授权或者取消授权。弹窗提示一键登录，后续会讲
        //showLoginModal()
      }
    })
  },
  login: function (e) {
 
    console.log('用户信息', e.detail.userInfo);


    let that = this
    wx.login({
      success: function (res) {
        var code = res.code;
        console.log(code)
        if (res.code) {
          // 登录成功，获取用户信息
          console.log(that.getUserInfo);
          that.getUserInfo(res.code, ()=>{
            console.log('callback')
            var avatarUrl = 'userInfo.avatarUrl';
            var nickName = 'userInfo.nickName';
            that.setData({
              [avatarUrl]: $vm.globalData.userInfo.user.avatar,
              [nickName]: $vm.globalData.userInfo.user.user_nickname,
              isLogin: true
            })
          })
        } else {
          // 否则弹窗显示，showToast需要封装
          showToast()
        }
        //$vm.utils.post('/wxapp/Public/login', { 'code': code }, { 'XX-Wxapp-AppId': 'wxcd73380cd19302b2' }).then(res => {
      //    console.log(res)
     // }).catch(err => console.log(err));
     
      }
    })
  },
  // 开发者服务端登录
  postLogin: function (code, iv, encryptedData, rawData, signature, callback) {
    let that = this
    let params = {
      code: code,
      iv: iv,
      encrypted_data: encryptedData,
      raw_data:rawData,
      signature:signature
    }
    $vm.utils.post('/wxapp/Public/login', params, { 'XX-Wxapp-AppId': 'wxe7efd45971531e9a' }).then(res => {
      console.log("post:")
      console.log(res)
      if(res.code == 1)
      {
        wx.hideLoading()
        wx.setStorageSync('token',res.data)
        $vm.globalData.userInfo = res.data;
        callback && callback()
      }
      else
      {
        that.showToast()
      }
    }).catch(err => {
      that.showToast()
      console.log(err)
    });
    /*
    request(apiUrl.postLogin, params, 'post').then((res) => {
      if (res.code == 1) {
        wx.hideLoading()
        // 登录成功，
        // 使用token管理登录态的，存储全局token，用于当做登录态判断，
        // 使用cookie管理登录态的，可以存任意变量当做已登录状态
        store.commit('storeUpdateToken', res.data.token)
        callback && callback()
      } else {
        showToast()
      }
    }).catch((err) => {
      showToast()
    })*/
  },

// 显示toast弹窗
showToast:function(content = '登录失败，请稍后再试') {
    wx.showToast({
      title: content,
      icon: 'none'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token') || []
    console.log(token)
    if (token.token) {
      var avatarUrl = 'userInfo.avatarUrl';
      var nickName = 'userInfo.nickName';
      this.setData({
        [avatarUrl]: token.user.avatar,
        [nickName]: token.user.user_nickname,
        isLogin: true
      })
    } else {
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})