// pages/login/login.js
const http = require('../../utils/http.js')
const picker = require('../../utils/city-picker2.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        region: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        http.domain = 'https://homestead.test/';
    },
    login: function () {
        // http.get('user', {}, function (res) {
        //     console.log(res);
        // });
        http.post('api/login', {
            'name': 'xiaoguo',
            'password': '123123'
        }, function (res) {
            console.log(res);
        });
        return false;
        wx.login({
            success: function (response) {
                var code = response.code
                wx.getUserInfo({
                    success: function (res) {
                        console.log(res);
                        // http.post('login', { a: 1, b: 2 }, function (res) {
                        //     console.log(res);
                        // });
                        // wx.request({
                        //     url: 'your domain',
                        //     data: {
                        //         code: code,
                        //         iv: resp.iv,
                        //         encryptedData: resp.encryptedData
                        //     },
                        //     success: function (res) {
                        //         console.log(res.data)
                        //     }
                        // })
                    }
                })
            },
            fail: function () {
            }
        });
    }
})