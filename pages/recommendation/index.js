//index.js
//获取应用实例
const app = getApp()
//引入轮播图数据
var swiperData = require("../data/swiperData.js");
var popularData = require("../data/popularData.js");
var loveData = require("../data/loveData.js");
var utils = require("../util/utils.js");

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperData: "",
    popular: [],
    love: [],
    autoFocus: true,
    keyWord: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //生命周期函数--监听页面加载
  onLoad: function() {
    this.setData(utils.callback(popularData.popularData, "popular", "最近最热"));
    this.setData(utils.callback(loveData.loveData, "love", "食友最爱"));
    //this.setData可以将view重绘
    this.setData({
      //数据赋值获取初始化
      swiperData: swiperData.swiperData,
      popularData: popularData.popularData,
      loveData: loveData.loveData,
    })
    wx.setStorage({
      key: 'popular',
      data: popularData,
    })

    //获取缓存
    this.getCache(this.processCache);
    var populars = "http://localhost:8080/food";
    var loves = "http://localhost:8080/food";
    this.http(populars, this.callback);
    this.http(loves, this.callback);
  },
  //获取缓存
  getCache: function(processCache) {
    wx.getStorage({
      key: '1',
      success: function(res) {
        processCache(res.data)
      },
    })
  },
  //处理缓存
  processCache: function(res) {
    if(!res){
     console.log("1")
    }else{
      console.log("2")
    }
  },
  /*callback: function (res, category,categoryName){
    var dishData = [];
     //遍历传入数据
    for (var idx in res.dishData){
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
       var readyData = {};
       readyData[category] = {
         categoryName: categoryName,
         dishData: dishData
       }
     }
    this.setData(readyData);
  },*/
  goToDishDetail: function(event) {
    var dishId = event.currentTarget.dataset.dishid;
    wx.navigateTo({
      url: '/pages/dish_detail/index?dishid=' + dishId,
    })
  },
  dishSeeAll: function(event) {
    var categoryName = event.currentTarget.dataset.categoryname;
    wx.navigateTo({
      url: '/pages/recommendation/see-all/see-all?categoryname=' + categoryName,
    })
  },
  http: function(url, callback) {
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        callback(res.data);
      }
    })
  },
  callback: function(res) {
    var foodData = [];
    for (var idx in res) {}
  },
  //input框失焦
  blursearch: function (event) {
    this.setData({
      autoFocus: false,
    });
  },
  //input框聚焦
  inputfocus: function (e) {
  
  },
  //联想
  inputsearch: function (event) {
    // 如果输入框有内容，展示联想
    if (event.detail.value) {
      this.setData({
        keyWord: event.detail.value,
        autoFocus: true
      });
    } else {

    }
  },
  // 搜索按钮
  searchBtn: function () {
    if (this.data.keyWord) {

    } else {
      wx.showToast({
        title: '请输入美食名',
        icon: 'none',
        duration: 1500
      })
    }
  },
  //键盘搜索
  goSearch: function (event) {
    if (this.data.keyWord) {

    } else {
      wx.showToast({
        title: '请输入美食名',
        icon: 'none',
        duration: 1500
      })
    }
  },
  //清空输入框
  cancelword: function () {
    this.setData({
      keyWord: ''
    });
  },
})