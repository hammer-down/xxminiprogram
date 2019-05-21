// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  //获取用户数据
  getUserData: function (handleUser){
     wx.getStorage({
       key: 'user',
       success: function(res) {
         handleUser(res.data)
       },
     })
  },
  //处理用户数据
  handleUser:function(res){
    if(res){
     this.setData({
       user:res
     })
    }else{

    }
  },
  //未登录跳转登陆页面
  logintap:function(){
     wx.navigateTo({
       url: '/pages/login/login',
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
    this.getUserData(this.handleUser);
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
  /*设置跳转*/
  setUpTap:function(){
    wx.navigateTo({
      url: '/pages/personal/set-up/set-up',
    })
  }
})