// pages/personal/set-up/set-up.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clearStorage:'清除缓存',
    update:'检查更新'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 清理缓存
   */
  clearCacheTap:function(e){
    wx.clearStorage();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //返回
  goBack: function (event) {
    var id = getCurrentPages(event);
    wx.navigateBack({
      delta: id
    })
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