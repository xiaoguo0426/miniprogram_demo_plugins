// pages/http/http.js
const http = require('../../utils/http2.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    postHttp: function() {
        let url = 'http://www.test.com/demo/miniapp/index.php';
        let data = '';
        let callback = function (res) {
            console.log(res);
        };

        http.post(url, data, callback);
    },
    getHttp:function(){
        let url = 'http://www.test.com/demo/miniapp/index.php';
        let data = {
            'username': 'gg'
        };
        let callback = {
            success:function(res){
                console.log(res);
            },
            fail:function(res){
                console.log(res);
            }
        };

        let req = http.get(url, data, callback);
// 
        req.abort();
    }
})