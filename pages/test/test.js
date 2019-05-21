// pages/test/test.js
var tools = require("../util/tools.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var url = 'http://39.106.5.52:8080/list';
    tools.http(url, this.callback);
  },
  callback: function (res) {
    this.setData({
      dishData: res.dishdata
    })
    for(var id in this.data.dishData){
      this.data.dishData[id].show = false
      this.data.dishData[id].def ='';
    } 
    let dishData = this.data.dishData // 获取原数据
    for (let i in dishData) {
      // 设置监听回调事件，当元素 .loadImg{{i}},进入页面20px内就触发回调事件，设置图片为真正的图片，通过show控制
      wx.createIntersectionObserver().relativeToViewport({
        bottom: 20
      }).observe('.loadImg' + i, (ret) => {
        if (ret.intersectionRatio > 0) {
          dishData[i].show = true
        }
        this.setData({ // 更新数据
          dishData
        })
      })
    }
    wx.createIntersectionObserver().relativeToViewport({
      bottom: 100
    }).observe('.target-class', (res) => {
      res.intersectionRatio // 相交区域占目标节点的布局区域的比例
      res.intersectionRect // 相交区域
      res.intersectionRect.left // 相交区域的左边界坐标
      res.intersectionRect.top // 相交区域的上边界坐标
      res.intersectionRect.width // 相交区域的宽度
      res.intersectionRect.height // 相交区域的高度
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

  }
})