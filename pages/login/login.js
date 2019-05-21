// pages/login/login.js
var tools = require("../util/tools.js");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginName:'',
    loginPassword:'',
    pageId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    tools.getHeight(this);
  },
  //input框失焦
  blurName: function (event) {
    this.setData({
      autoFocus: false,
    });
  },
  //input框聚焦
  inputNamefocus: function (e) {

  },
  //登陆名
  listenerPhoneInput: function (event){
    // 如果输入框有内容，展示联想
    if (event.detail.value) {
      this.setData({
        loginName: event.detail.value,
        autoFocus: true
      });
    } else {
      
    }
  },
  //input框失焦
  blurPassword: function (event) {
    this.setData({
      autoFocus: false, 
    });
  },
  //input框聚焦
  inputPasswordfocus: function (e) {

  },
  //登陆密码
  listenerPasswordInput: function (event) {
    // 如果输入框有内容，展示联想
    if (event.detail.value) {
      this.setData({
        loginPassword: event.detail.value,
        autoFocus: true
      });
    } else {
      
    }
  },
  //登陆
  loginTap:function(event){
    if (this.data.loginName && this.data.loginPassword){
      var loginId = this.data.loginName
      var loginPassword = this.data.loginPassword
      var loginUrl = app.globalData.urlHeader +'/login?loginid=' + loginId + '&&password=' + loginPassword
      tools.http(loginUrl, this.loginback);
      this.data.pageId = getCurrentPages(event);
    }
    else if (this.data.loginName && this.data.loginPassword==''){
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 1500
      })
    }
    else if (this.data.loginName =='' && this.data.loginPassword){
      wx.showToast({
        title: '请输入账号',
        icon: 'none',
        duration: 1500
      })
    }
    this.data.loginName = '';
    this.data.loginPassword = '';
  },
  //数据回调
  loginback: function (res) {
    wx.navigateBack({
      delta: this.data.pageId
    })
    this.setData({
      user:res
    })
    this.data.user.show =true
    wx.setStorageSync('user', this.data.user)
  },
  //返回
  goBack: function (event) {
    var id = getCurrentPages(event);
    wx.navigateBack({
      delta: id
    })
  },
  goToRegiter:function(event){
    wx.navigateTo({
      url: '/pages/register/register',
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