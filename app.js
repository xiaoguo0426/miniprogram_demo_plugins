const http = require('utils/http.js');
const token = require('utils/token.js');
const login = require('utils/weapp')
const socket = require('utils/socket.js');
App({
    onLaunch: function(opt) {
        // http.domain = this.globalData.domain;
        // this.doAuth();
        // const _this = this;
        // login.setLoginUrl(_this.globalData.domain+"weapp/login")
        // login.login({
        //     success(result) {
        //         if (result) {
        //             // 首次登陆
        //             console.log("登陆成功", result)
        //             wx.setStorageSync('_token', result.token);
        //         } else {
        //             // 二次登陆，请求Controller的User方法
        //             login.request({
        //                 url: _this.globalData.domain+"weapp/user",
        //                 login: true,
        //                 success(result) {
        //                     console.log("登陆成功", result.data.data)
        //                 },
        //                 fail(error) {
        //                     console.log("登录失败", error)
        //                 }
        //             })
        //         }
        //     },
        //     fail(error) { console.log("登录失败", error) }
        // })


        // http.get('http://homestead.test/user/11111',{},function(res){
        //     console.log(res);
        // });

        //socket
        socket.on('connectSocket',function(res){
            console.log('connectSocket');
            console.log(res);
        });
        this.globalData.global_socket = socket.run();


    },
    doAuth: function() {

        token.create(token => {
            wx.login({
                success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    console.log(res);
                    http.post('api/getWxUserInfo', {
                        code: res.code
                    }, data => {
                        console.log(data);
                    });
                }
            })
        });
    },
    doLogin: function() {
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                console.log(res);
            }
        })
        // 获取用户信息
        // wx.getSetting({
        //     success: res => {
        //         if (res.authSetting['scope.userInfo']) {
        //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //             wx.getUserInfo({
        //                 success: res => {
        //                     console.log(res);
        //                     // 可以将 res 发送给后台解码出 unionId
        //                     this.globalData.userInfo = res.userInfo

        //                     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //                     // 所以此处加入 callback 以防止这种情况
        //                     if (this.userInfoReadyCallback) {
        //                         this.userInfoReadyCallback(res)
        //                     }
        //                 }
        //             })
        //         }
        //     }
        // });
    },
    globalData: {
        userInfo: null,
        domain: 'https://homestead.test/',
        global_socket: null
    }
})