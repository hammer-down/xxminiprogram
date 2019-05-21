// pages/search/search.js
var tools = require("../util/tools.js");
const app = getApp()

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    dishData:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    tools.getHeight(this)
    //获取页面传过来的关键字
    var foodKeyWord = options.foodkeyword;
    //网络请求地址
    var searchUrl = app.globalData.urlHeader +"/finddish?foodkeyword=" + foodKeyWord;
    //网络请求
    tools.http(searchUrl, this.searchBack)
    //this.getCache(this.callback);
    //this.imageLoader();
  },
  /* getCache :function(callback){
      wx.getStorage({
        key: 'searchData',
        success: function(res) {
         callback(res.data)
        },
      })
   },*/

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  //搜索数据回调
  searchBack: function(res) {
    wx.hideLoading();
    this.setData({
      dishData: res.dishdata
    })
    tools.workData(this);
    tools.loadImage(this);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.removeStorage({
      key: 'searchData',
      success: function(res) {},
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  goBack: function(event) {
    var id = getCurrentPages(event);
    wx.navigateBack({
      delta: id
    })
  },
})