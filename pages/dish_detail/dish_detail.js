// pages/new_course/index.js
//获取数据
var dishData = require("../data/dishData.js");
var tools = require("../util/tools.js");
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn: 0,
    detail: 1,
    comment: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    tools.getHeight(this)
    //options是页面初始化带来的页面参数
    this.setData({
      dishid: options.dishid,
      dishData: dishData.dishData
    })
    if (options.categoryname == '最近最热') {
      tools.getCache('popularData', this.cacheHand)
    } else if (options.categoryname == '猜你喜欢') {
      tools.getCache('loveData', this.cacheHand)
    }
    tools.workData(this);
    tools.loadImage(this);
    //网络请求地址
     
    //网络请求
     tools.http();
    //传入数据

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
  select: function(e) {
    let curIndex = parseInt(e.currentTarget.dataset.param);
    this.setData({
      btn: curIndex
    });
    if (curIndex == 0) {
      this.setData({
        detail: 1,
        comment: 0
      })
    } else if (curIndex == 1) {
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
  dishDetail: function(dishid) {

  },
  //处理缓存
  cacheHand: function(cache) {
    if (cache == '0') {

    } else {
      for (var idx in cache.dishdata) {
        if (this.data.dishid == cache.dishdata[idx].fId) {
          this.setData(cache.dishdata[idx])
        }
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
  onShow: function() {

  },
  //跳转详情页
  goToDishDetail: function(event) {
    var dishId = event.currentTarget.dataset.dishid;
    wx.navigateTo({
      url: '/pages/dish_detail/dish_detail?dishid=' + dishId,
    })
  }
})