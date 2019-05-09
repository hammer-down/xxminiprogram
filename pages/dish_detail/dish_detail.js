// pages/new_course/index.js
//获取数据
var dishData = require("../data/dishData.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn:0,
    detail:1,
    comment:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //options是页面初始化带来的页面参数
    this.setData({
      dishid: options.dishid,
      dishData:dishData.dishData
    })
   
    //传入数据
    this.dishDetail(options.dishid,dishData);
    
    //第一进入的时候判断是否存在本地以及是否收藏
    var dishesCollect = wx.getStorageSync('dishesCollect');
    //如果dishesCollect 存在，则代表以前收藏过或者以前取消过收藏
    if (dishesCollect) {
      var dishCollect = dishesCollect[options.dishid];
      this.setData({
        collected: dishCollect
      })
    } else {
      //第一次进入，根本不存在数据
      var dishesCollect = {};
      //我把当前唯一id扔到dishesCollect对象中，然后默认指定false
      dishesCollect[options.dishid] = false;
      //扔到本地存储中去
      wx.setStorageSync('dishesCollect', dishesCollect);
    }
  },
  /** */
  select: function (e) {
    let curIndex = parseInt(e.currentTarget.dataset.param);
    this.setData({
      btn: curIndex
    });
    if (curIndex==0){
      this.setData({
        detail:1,
        comment:0
      })
    }
    else if (curIndex==1){
      this.setData({
        detail: 0,
        comment: 1
      })
    }
  },
  /**
   * 收藏
   * 格式
   * var dishesCollect = {
   *   0:,
   *   1:,
   *   2:
   * }
   */
  collectTap: function(event) {
    //dishesCollect是所有数据的集合
    var dishesCollect = wx.getStorageSync('dishesCollect');
    //dsihCollect是当前一条数据
    var dishCollect = dishesCollect[this.data.dishid];
    //点击的时候，如果收藏则取消，如果未收藏则收藏
    dishCollect = !dishCollect;
    //更新到本地存储中
    dishesCollect[this.data.dishid] = dishCollect;
    wx.setStorageSync('dishesCollect', dishesCollect);
    //更新视图
    this.setData({
      collected: dishCollect
    })
    //收藏成功与否消息显示框
    wx.showToast({
      title: dishesCollect[this.data.dishid] ? '收藏成功' : '取消收藏',
      icon: 'success',
      duration: 800,
      mask: true
    })
  },
  /**
   * 处理详细菜品数据
   */
  dishDetail:function(dishid,disData){
    for (var idx in dishData.dishData){
      if (dishData.dishData[idx].dishid==dishid){
        this.setData(dishData.dishData[idx])
      }
    }
  },
  /**
   * 返回函数
   */
  goBack: function(event) {
    var id = getCurrentPages(event);
    wx.navigateBack({
      delta: id
    })
  },
  onShow:function(){
   
  }
})