//星星的数据拆分

function convertToStarArray(stars) {
  //num代表拆分的数值
  var num = stars.substring(0, 1);
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

//返回数据
function callback(res, category, categoryName) {
  var dishData = [];
  //遍历传入数据
  for (var idx in res.dishData) {
    //获取传入中的一条数据
    var oneData = res.dishData[idx];
    var temp = {
      dishid: oneData.dishid,
      dishImgUrl: oneData.dishImgUrl,
      dishName: oneData.dishName,
      dsihPrice: oneData.dsihPrice,
      stars: this.convertToStarArray(oneData.dishStars),
      dishScore: oneData.dishScore,
    }
    dishData.push(temp);
    //转换类型
    var readyData = {};
    readyData[category] = {
      categoryName: categoryName,
      dishData: dishData
    }
  }
  return readyData;
}

module.exports = {
  convertToStarArray: convertToStarArray,
  getData: getData,
  callback: callback
}