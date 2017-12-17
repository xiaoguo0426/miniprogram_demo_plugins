// pages/http/http.js
const Http = require('../../utils/http.js')
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

      },
      postHttp: function () {
            const url = 'http://localhost/wxapp/php/demo1/post.php';
            const data = { a: 1, b: 2 };
            //post
            // http.post(url,data,function(res){
            //       console.log(res);
            // });
            // http.setUrl(url).success(function(){
            //       console.log('success请求');
            // }).post();

            //get
            // http.get(url,data,function(res){
            //       console.log('get 请求');
            //       console.log(res);
            // });
            // http.setData(data).get();
            let p1 = new Http();
            let p2 = new Http();
            // p1.post(url, data, function (res) {
            //       console.log(res);
            // });
            // p1.setUrl(url).success(function () {
            //       console.log('success请求');
            // }).fail(function(res){
            //       console.log('fail请求');
            // }).post();

            p1.setUrl(url);
            p1.success(function(){
                  console.log('success请求');
            });
            p1.setData(data);
            p1.post();
            // p2.setUrl(url).success(function () {
            //       console.log('success请求');
            // }).fail(function (res) {
            //       console.log('fail请求');
            // }).get();
            // p2.get(url, data, function (res) {
            //       console.log('get 请求');
            //       console.log(res);
            // });
      }
})