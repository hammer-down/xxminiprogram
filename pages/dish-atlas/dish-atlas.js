// pages/dish-atlas/dish-atlas.js
const app = getApp();
var yyData = require("../data/yyData.js");
var yeData = require("../data/yeData.js");
var hyData = require("../data/hyData.js");
var heData = require("../data/heData.js");
var hsData = require("../data/hsData.js");
var tyData = require("../data/tyData.js");
var teData = require("../data/teData.js");
var tsData = require("../data/tsData.js");
var tools = require("../util/tools.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    restaurantIndex: 0,
    floorIndex: 0,
    imgCount: 0,
    totalCount: 5,
    scrollTop: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.dishView(this.globalData.restaurantIndex, this.globalData.floorIndex);
    var url = app.globalData.urlHeader +'/list'
    tools.http(url,this.callback)
  },
  callback:function(res){
    this.setData({
      dishdata:res.dishdata
    })
  },
  /**
   * 餐厅选择
   */
  restaurantSelect: function(e) {
    let curIndex = parseInt(e.currentTarget.dataset.param);
    this.setData({
      restaurantIndex: curIndex,
      floorIndex:0,
    });
    this.globalData.restaurantIndex = curIndex;
    this.globalData.floorIndex = 0;
    this.dishView(this.globalData.restaurantIndex, this.globalData.floorIndex);
  },
  /**
   * 楼层选择
   */
  floorSelect: function(e) {
    let curIndex = parseInt(e.currentTarget.dataset.param);
    this.setData({
      floorIndex: curIndex
    });
    this.globalData.floorIndex = curIndex;
    this.dishView(this.globalData.restaurantIndex, this.globalData.floorIndex);
  },
  /**
   * 数据映射
   */
  dishView: function(r, f) {
    if (r == 0) {
      switch (f) {
        case 0:
        this.setData({
          dishData:yyData.yyData
        })
          break;
        case 1:
          this.setData({
            dishData: yeData.yeData
          })
          break;
        case 2:
          this.setData({
            dishData: this.data.dishdata
          })
          tools.handleData(this);
          tools.loadImage(this);
          break;
      }
    } else if (r == 1) {
      switch (f) {
        case 0:
          this.setData({
            dishData: hyData.hyData
          })
          break;
        case 1:
          this.setData({
            dishData: heData.heData
          })
          break;
        case 2:
          this.setData({
            dishData: hsData.hsData
          })
          break;
      }
    } else if (r == 2) {
      switch (f) {
        case 0:
          this.setData({
            dishData: tyData.tyData
          })
          break;
        case 1:
          this.setData({
            dishData: teData.teData
          })
          break;
        case 2:
          this.setData({
            dishData: 0
          })
          break;
      }
    }
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
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.dishView(this.globalData.restaurantIndex, this.globalData.floorIndex);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  globalData: {
    restaurantIndex: 0,
    floorIndex: 0
  },
  goToDishDetail: function (event) {
    var dishId = event.currentTarget.dataset.dishid;
    wx.navigateTo({
      url: '/pages/dish_detail/dish_detail?dishid=' + dishId,
    })
  }
})