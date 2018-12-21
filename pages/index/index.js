// pages/index/index.js
const $vm = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["热门推荐"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    timer: null, // 保存定时器
    scrollTop: 5, // 设定触发条件的距离,
    swiperList: [],
    articles: [],
    //轮播页当前index
    swiperCurrent: 0,
    loading:true
  },
  //轮播图的切换事件
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //轮播图点击事件
  swipclick: function (e) {
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: "/pages/detail/detail?id="+e.currentTarget.id
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  moreClick:function(e){
    wx.navigateTo({
      url: "/pages/list/list"
    })
  },
  getListsRecommented(){
    let infos = { slides: [], articles:[]};

    $vm.utils.get('/list_index.json', {}).then(res => {
      let { code, data} = res
      if (code === 1) {
        // 轮播管理
        
        if (data.slides && data.slides.length) {
          let banners = data.slides.map(news => {
            return {
              id: news.id,
              title: news.post_title,
              image: news.more.thumbnail
            }
          })
          infos.slides.push(...banners)
        }
        if (data.list && data.list.length) {
          let banners = data.list.map(news => {
            return {
              id: news.id,
              title: news.post_title,
              image: news.more.thumbnail
            }
          })
          infos.articles.push(...banners)
        }
        console.log(infos.slides);
        this.setData({
          swiperList: infos.slides,
          articles: infos.articles,
          loading:false
        })
      }
    }).catch(err => console.log(err));
  },
  onPullDownRefresh() {
    // 监听该页面用户下拉刷新事件
    // 可以在触发时发起请求，请求成功后调用wx.stopPullDownRefresh()来结束下拉刷新
    console.log('下拉拉拉')
  },
  refresh() { // 函数式触发开始下拉刷新。如可以绑定按钮点击事件来触发下拉刷新
    wx.startPullDownRefresh({
      success(errMsg) {
        console.log('开始下拉刷新', errMsg)
      },
      complete() {
        console.log('下拉刷新完毕')
      }
    })
  },
  loadMore() { // 触底加载更多
    let len = this.data.list.length,
      lastItem = this.data.list[len - 1];
    for (let i = 0; i < len; i++) {
      this.data.list.push(lastItem + i + 1)
      this.setData({
        'list': this.data.list
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getListsRecommented();
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