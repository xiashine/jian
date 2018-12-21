// pages/list/list.js
const $vm = getApp()
const { get } = $vm.utils
const cache = Object.create(null)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles:[],
    loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticlesList();
  },
  getArticlesList(page = 0){
    
    if (!cache[0]) {
      // 新内容
      cache[0] = { articles: [], page: 1, time: Date.now() }
    }
    let infos = cache[0];

    if(page)
    {
      infos.page += 1
    }
    get('/portal/articles/', { order:'-id',page:infos.page+",8"}).then(res => {
      let { code, data } = res
      if (code === 1) {
        // 轮播管理

        if (data && data.length) {
          let banners = data.map(news => {
            return {
              id: news.id,
              title: news.post_title,
              image: news.more.thumbnail
            }
          })
          infos.articles.push(...banners)
        }
        console.log(infos.articles);
        this.setData({
          articles: infos.articles,
          loading:false
        });
      }

    }).catch(err => console.log(err))
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
    //console.log('下拉拉拉')
    //wx.showNavigationBarLoading();
    //this.setData({
      //loading: true
    //})
    //this.getArticlesList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉拉拉')
    //wx.showNavigationBarLoading();
    this.getArticlesList(1)
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})