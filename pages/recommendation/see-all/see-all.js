// pages/recommendation/see-all/see-all.js
var tools = require("../../util/tools.js");

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
    //var allUrl = "";
    var key = "";
    switch (options.categoryname){
      case "最近最热":
       // allUrl = "http://localhost:8080/hotdish";
        key='popular';
        break;
      case "猜你喜欢":
       // allUrl = "http://localhost:8080/hotdish";
        key = 'love';
        break;
    }
    //网络请求数据
    //tools.http(allUrl,this.callback);
    tools.getCache(key,this.cacheHand)
  },
  //处理缓存
  cacheHand:function(cache){
    this.setData({
      dishdata: cache.dishdata
    })
  },
  /*callback: function (res) {
    var dishdata = [];
    //遍历传入数据
    for (var idx in res.dishdata) {
      //获取传入中的一条数据
      var oneData = res.dishdata[idx];
      var temp = {
        fId: oneData.fId,
        fUrl: oneData.fUrl,
        fName: oneData.fName,
        fPrice: oneData.fPrice,
        fStars: tools.convertToStarArray(oneData.fAllrating),
        fScore: oneData.fAllrating,
      }
      dishdata.push(temp);
    }
    this.setData({
      dishdata:dishdata
    })
  },*/
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
      url: '/pages/dish_detail/index?dishid=' + dishId + '&categoryname='+this.data.categoryName,
    })
  },
})