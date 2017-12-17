const msg = require('../../utils/msg.js')
// pages/msg/msg.js
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
      //默认提示
      toast1: function () {
            msg.success('默认');
      },
      toast2: function () {
            msg.success('成功');
      },
      toast3: function () {

            msg.loading('加载中...');
      },
      hideToast: function () {
            msg.close();
      },
      toast4:function(){
            msg.showLoading();
            //需要手动调用关闭loading效果；否则不会关闭loading
            setTimeout(function(){
                  msg.hideLoading()
            },3000);
      },
      toast5: function () {
            msg.error('操作错误',function(){
                  console.log('111');
            });
      },
      toast6:function(){
            msg.showNavigationBarLoading();
      },
      toast7: function () {
            msg.hideNavigationBarLoading();
      }
})