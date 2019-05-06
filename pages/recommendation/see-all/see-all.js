// pages/recommendation/see-all/see-all.js
var utils = require("../../util/utils.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      categoryName: options.categoryname,
    })
    switch (options.categoryname){
      case "最近最热":
        this.callback(utils.getData(options.categoryname).popularData)
        break;
      case "食友最爱":
        this.callback(utils.getData(options.categoryname).loveData)
        break;
    }
    
  },
  callback: function (res) {
    var dishData = [];
    //遍历传入数据
    for (var idx in res.dishData) {
      //获取传入中的一条数据
      var loveData = res.dishData[idx];
      var temp = {
        dishid: loveData.dishid,
        dishImgUrl: loveData.dishImgUrl,
        dishName: loveData.dishName,
        stars: utils.convertToStarArray(loveData.dishStars),
        dishScore: loveData.dishScore,
      }
      dishData.push(temp);
      //转换类型
    }
    console.log(dishData)
    this.setData({
      dishData:dishData
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
  onShareAppMessage: function () {

  },
  //返回
  goBack: function (event) {
    var id = getCurrentPages(event);
    wx.navigateBack({
      delta: id
    })
  },
  goToDishDetail: function (event) {
    var dishId = event.currentTarget.dataset.dishid;
    wx.navigateTo({
      url: '/pages/dish_detail/index?dishid=' + dishId,
    })
  },
})