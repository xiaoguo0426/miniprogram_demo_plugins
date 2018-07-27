// pages/socket/socket.js
const socket = require('../../utils/socket.js')
const app = getApp();
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
        
        app.globalData.global_socket.listen('websocket-socket',function(res){
            console.log('websocket-socket');
            console.log(res);
        });


        // socket.on('connectSocket',function(res){
        //     console.log('connectSocket');
        //     console.log(res);
        // });
        // socket.on('onOpen', function (res) {
        //     console.log('onOpen');
        //     console.log(res);
        // });
        // socket.on('onClose', function (res) {
        //     console.log('onClose');
        //     console.log(res);
        // });
        // socket.on('onError', function (res) {
        //     console.log('onError');
        //     console.log(res);
        // });
        // socket.off("connectSocket");

        // socket.run();

        // setTimeout(function(){
        //     socket.remove('websocket-connected');
        // },2000);

        // console.log(app.globalData.global_socket)
        // app.globalData.global_socket.close();
        
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

})