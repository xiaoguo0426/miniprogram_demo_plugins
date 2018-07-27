//index.js
//获取应用实例
const http = require('../../utils/http.js')

const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nickname:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(res.userInfo);
        console.log(typeof res.userInfo);
        // http.post('http://1tech.test.72dns.net/wx_app/test.php', res.userInfo,function(res){
        //     console.log(res);
        // });
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
            console.log(res);
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**
     * 用户点击右上角分享
     */
  onShareAppMessage: function (res) {
      if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target)
      }
      console.log(this.data.product_id);
      return {
          title: '自定义转发标题',
          path: '/page/user?id=123',
          success: function (res) {
              // 转发成功
              console.log('转发成功')
          },
          fail: function (res) {
              // 转发失败
              console.log('转发失败');
          }
      }
  },
  getUserInfo: function(e) {

    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  saveMemberInfo:function(){
      http.get('https://dev-gz.yz168.cc/server=guoyiti/wx_app/getMemberInfo.php',{},function(res){
          console.log(res);
      });
  },
  getMemberInfo:function(){
      wx.setStorage({
          key: 'test',
          data: '1111',
      })
      const that = this;
      http.get('https://dev-gz.yz168.cc/server=guoyiti/wx_app/get.php', {}, function (res) {
          console.log(res);
          that.setData({
              nickname:res.data.nickname
          });
      });
  },
  onMyEvent:function(e){
      console.log('自定义组件触发事件');
      console.log(e);
  }
})
