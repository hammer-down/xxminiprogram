//获取应用实例
const app = getApp()
//引入轮播图数据
var tools = require("../util/tools.js");

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperData: "",
    autoFocus: true,
    keyWord: '',
    populars: [],
    loves: [],
  },
  //事件处理函数
 /* bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },*/
  //生命周期函数--监听页面加载
  onLoad: function() {
    //this.setData可以将view重绘
    this.setData({
      //数据赋值获取初始化
      
    })
    /**
     * 测试缓存
     */
    /*wx.removeStorage({
      key: 'love',
      success: function(res) {},
    })*/
    //延时刷新数据
    setInterval(function(){
      //网络请求地址
      var swiperUrl = app.globalData.urlHeader+"/discount";
      var popularUrl = app.globalData.urlHeader +"/hotdish";
      var loveUrl = app.globalData.urlHeader +"/hotdish";
      
      //网络请求数据
      this.http(popularUrl, this.callback, "populars", "最近最热");
      this.http(loveUrl, this.callback, "loves", "猜你喜欢");
      tools.http(swiperUrl, this.swiperBack);
    },14400000)
    //获取缓存
    this.getCache('popular', this.popularCache)
    this.getCache('love', this.popularCache)
    this.getCache('discountFood', this.popularCache)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //获取缓存
    this.onLoad();
  },
  getCache: function (key, popularCache){
    wx.getStorage({
      key: key,
      success: function (res) {
        popularCache(res.data)
        wx.hideLoading()
      },
      fail: function (){
        popularCache('0')
      }
    })
  },
  popularCache: function (cache){
    if (cache=='0'){
      //网络请求地址
      var swiperUrl = app.globalData.urlHeader +"/discount";
      var popularUrl = app.globalData.urlHeader +"/hotdish";
      var loveUrl = app.globalData.urlHeader +"/hotdish";
      //网络请求数据
      this.http(popularUrl, this.callback, "populars", "最近最热");
      this.http(loveUrl, this.callback, "loves", "猜你喜欢");
      tools.http(swiperUrl, this.swiperBack);
    }else{
      switch(cache.categoryName){
        case '最近最热':
         this.setData({
           popular:cache
         })
       break;
        case '猜你喜欢':
          this.setData({
            love: cache
          })
       break;
        case '轮播图':
          this.setData({
            discountfood: cache
          })
          break;
      }
    }
  },
  //轮播图回调
  swiperBack: function(res) {
    this.setData({
      discountFood: {
        categoryName:'轮播图',
        discountFood: res.discountFood
      }
    })
    wx.setStorage({
      key: 'discountFood',
      data: this.data.discountFood,
    })
    this.getCache('discountFood', this.popularCache)
  },
  //跳转详情页
  goToDishDetail: function(event) {
    var fId = event.currentTarget.dataset.fid;
    wx.navigateTo({
      url: '/pages/dish_detail/dish_detail?dishid=' + fId +'&categoryname='+event.currentTarget.dataset.categoryname,
    })
  },
  //查看全部
  dishSeeAll: function(event) {
    var categoryName = event.currentTarget.dataset.categoryname;
    wx.navigateTo({
      url: '/pages/recommendation/see-all/see-all?categoryname=' + categoryName,
    })
  },
  //网络请求数据
  http: function(url, callback, category, categoryName) {
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        //调用处理数据函数
        callback(res.data, category, categoryName);
      },
      fail:function(){
        wx.showToast({
          title: '网络错误！请检查网络！',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
  //处理数据
  callback: function(res, category, categoryName) {
    switch (categoryName) {
      case "最近最热":
        wx.setStorage({
          key: 'popularData',
          data: {
            categoryName: "最近最热",
            dishdata:res.dishdata
          }
        })
        break;
      case "猜你喜欢":
        wx.setStorage({
          key: 'loveData',
          data: {
            categoryName: "猜你喜欢",
            dishdata: res.dishdata
          }
        })
        break;
    }
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
      //转换类型
      var readydata = {};
      readydata[category] = {
        categoryName: categoryName,
        dishdata: dishdata
      }
      this.setData(readydata);
    }
    //加入缓存
    wx.setStorage({
      key: 'popular',
      data: this.data.populars,
    })
    wx.setStorage({
      key: 'love',
      data: this.data.loves,
    })
    //
    this.getCache('popular', this.popularCache)
    this.getCache('love', this.popularCache)
  },
  //input框失焦
  blursearch: function(event) {
    this.setData({
      autoFocus: false,
    });
  },
  //input框聚焦
  inputfocus: function(e) {

  },
  //联想
  inputsearch: function(event) {
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
  searchBtn: function() {
    if (this.data.keyWord) {
      var foodKeyWord = this.data.keyWord;
      this.goSearchPage(foodKeyWord);
    } else {
      wx.showToast({
        title: '请输入美食名',
        icon: 'none',
        duration: 1500
      })
    }
  },
  //键盘搜索
  goSearch: function(event) {
    if (this.data.keyWord) {
      var foodKeyWord = this.data.keyWord;
      this.goSearchPage(foodKeyWord);
    } else {
      wx.showToast({
        title: '请输入美食名',
        icon: 'none',
        duration: 1500
      })
    }
  },
  //清空输入框
  cancelword: function() {
    this.setData({
      keyWord: ''
    });
  },
  //到搜索页面
  goSearchPage: function(foodkeyword) {
    wx.navigateTo({
      url: '/pages/search/search?foodkeyword=' + foodkeyword,
    })
    wx.showLoading({
      title: '',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
})