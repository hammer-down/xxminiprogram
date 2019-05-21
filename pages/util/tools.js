//拆分星数
function convertToStarArray (stars) {
  //num代表拆分的数值
  var zs = parseInt(stars);
  var xs = stars * 10 % 10;
  var num;
  if (xs >= 5) {
    num = zs + 1;
  }
  else {
    num = zs;
  }
  //声明数组存储
  var starsArray = [];
  for (var i = 0; i < 5; i++) {
    if (i < num) {
      starsArray.push(1);
    } else {
      starsArray.push(0);
    }
  }
  return starsArray;
}
//公共的网络请求
function http(url, callback) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      //调用处理数据函数
      callback(res.data);
    }
  })
}

function getCache(key,cacheHand){
   wx.getStorage({
     key: key,
     success: function (res) {
       cacheHand(res.data)
     },
     fail: function () {
       cacheHand('0')
     }
   })
}
function getHeight(t){
  var that = t;
  wx.getSystemInfo({
    success: function (res) {
      that.setData({
        scrollHeight: res.windowHeight,
      });
    }
  });
}
function imageLoader(t) {
  var that = t;
  for (var idx in that.data.dishData) {
    if (idx == that.data.imgCount && that.data.imgCount < that.data.totalCount) {
      var fUrlCount = that.data.dishData[idx].fUrl;
      that.data.dishData[idx].fUrlCount = fUrlCount;
      that.data.imgCount++
    }
  }
}
//图片懒加载
function loadImage(t) {
  var that = t
  let dishData = that.data.dishData // 获取原数据
  for (let i in dishData) {
    // 设置监听回调事件，当元素 .loadImg{{i}},进入页面20px内就触发回调事件，设置图片为真正的图片，通过show控制
    wx.createIntersectionObserver().relativeToViewport({
      bottom: 20
    }).observe('.loadImg' + i, (ret) => {
      if (ret.intersectionRatio > 0) {
        dishData[i].show = true
      }
      that.setData({ // 更新数据
        dishData
      })
    })
  }
}
function workData(t){
  var that = t
  for (var id in that.data.dishData) {
    that.data.dishData[id].show = false;
    that.data.dishData[id].def = '';
    that.data.dishData[id].rf = true;
  }
  that.setData({ // 更新数据
    dishData: that.data.dishData
  })
}
function handleData(t) {
  var that = t
  for (var id in that.data.dishData) {
    that.data.dishData[id].show = false;
    that.data.dishData[id].def = '';
  }
  that.setData({ // 更新数据
    dishData: that.data.dishData
  })
}

module.exports = {
  convertToStarArray: convertToStarArray,
  http:http,
  getCache: getCache,
  getHeight:getHeight,
  imageLoader: imageLoader,
  loadImage: loadImage,
  workData: workData,
  handleData: handleData
}