# xxminiprogram
Wechat mini program of Xiaoxiang project.
=========
## 1.构建推荐页，主页，用户页
## 2.在各主页面上划分好各功能模块
## 3.构建子页面：菜品详情页面，登陆页面，注册页面，推荐展开页面，订单页面，评论页面，收藏显示页面，商家反馈页面，我的食友页面，订单历史记录页面等
## 4.构建各子页面的功能模块
## 5.每个模块对应一个后台出来的json数据 
   对象名：dishData
   图片url：fUrl；
   菜名:fName;
   价格：fPrice;
   描述:fDescription;
   菜评分:fAllrating;
   菜星数:fStars;
   菜楼层:wfloor;
   菜的id:fId
   菜餐厅：wRestaurant；
   菜的窗口:fWid;
   菜的热度：fHot;
   对象名：user
   用户名：userName；
   用户密码:userPassword;
   用户昵称：nickName；
   身份码：token；
   用户邮箱：userEmail
## 6.加入缓存，推荐按页，主页为静态页面的后台json数据写入缓存,
## 7.安全性验证
