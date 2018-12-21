// pages/detail/detail.js
const $vm = getApp()

const { get,post } = $vm.utils

//const WxParse = require('../../utils/wxParse/wxParse.js');
import WxParse from '../../utils/wxParse/wxParse';

Page({

  /**
   * 页面的初始数据
   */
  newsid:0,
  data: {
    wxParseData: [],
    article: {},
    loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.newsid = options.id
    this.getArticleDetail(options)
  },
  toIndexClick:function(){
    console.log("to index")
    wx.switchTab({
      url: '/pages/index/index',
      fail: function () {
        console.info("跳转失败")
      }
    })
  },
  getArticleDetail(opt) {
    get('/portal/articles/' + opt.id, {}).then(res => {

      var data = res.data
      var { post_title: title, published_time: date, post_hits: praise, post_like: comment, post_keywords: tag,id:id,more:more} = data
  
      if (data && data.length) {
        //this.setData({
        //  article: { title, date, praise, comment, tag }
        //})
        //return wx.showToast({ title: '目前不支持解析专题页面' })
      }
      console.log(data)
      WxParse.wxParse('html', data.post_content, this)
      this.setData({
        article: { title, date, praise, comment, tag,id,more},
        loading:false
      })
      console.log(this.data.article)
    }).catch(err => console.log(err))
  },
  dianzanClick:function(){
    $vm.isLogin((token)=>{
      post('/portal/Articles/doLike/', { id: this.newsid }, { 'XX-Token': token, 'XX-Device-Type': 'wxapp' }).then(res => {
        console.log(res)
       // if (res.code == 0) {
          wx.showToast({
            title: '您已点赞啦!',
            icon: 'success',
            duration: 3000
          });
       // }
      }).catch(err => console.log(err));
    })
    
  },
  shoucangClick: function () {
    $vm.isLogin((token) => {
      post('/portal/articles/doFavorite/', { id: this.newsid }, { 'XX-Token': token, 'XX-Device-Type': 'wxapp' }).then(res => {
        console.log(res)
        // if (res.code == 0) {
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 3000
        });
        // }
      }).catch(err => console.log(err));
    })

  },
  fenxiangClick: function () {
    $vm.isLogin((token) => {
      post('/portal/articles/doFavorite/', { id: this.newsid }, { 'XX-Token': token, 'XX-Device-Type': 'wxapp' }).then(res => {
        console.log(res)
        // if (res.code == 0) {
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 3000
        });
        // }
      }).catch(err => console.log(err));
    })

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
  onShareAppMessage: function (res) {
    let that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: that.data.article.title,
      path: '/pages/detail/detail?id=' + that.data.article.id,
      imageUrl:that.data.article.more.thumbnail,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})