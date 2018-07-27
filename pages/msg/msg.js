const http = require('../../utils/http.js')
const msg = require('../../utils/msg.js')
const app = getApp();
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
        console.log('eeeeeeeeeeeee');
        console.log(wx.getStorageSync('test'));

        app.globalData.global_socket.listen('websocket-msg', function (res) {
            console.log('websocket-msg');
            console.log(res);
        });

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
    toast2:function(){
        msg.success('成功', 5000);//最多7个汉字
    },
    toast3:function(){
        
        msg.loading('加载中...');
    },
    hideToast:function(){
        msg.close();
    },
    alert1:function(){
        msg.alert('提示','这是内容这是内容这是内容这是内容这是内容这是内容',function(){
            console.log('1231sdfsdfsdfs');
        });
    },
    chooseInvoice:function(){
        wx.chooseInvoiceTitle({
            success(res) {
                console.log(res);
            }
        })
    }
})