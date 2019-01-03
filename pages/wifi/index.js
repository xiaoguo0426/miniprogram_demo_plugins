// pages/wifi/index.js
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
    initWifi: function() {

    },
    stopWifi: function() {

    },
    connectWifi: function() {

    },
    getWifiList: function() {
        wx.startWifi({
            success: function (res) {
                console.log(res.errMsg)
                wx.getWifiList();
                wx.onGetWifiList(function (res) {
                    console.log(res);
                    if (res.wifiList.length) {
                        wx.setWifiList({
                            wifiList: [{
                                SSID: res.wifiList[0].SSID,
                                BSSID: res.wifiList[0].BSSID
                                // password: '123456'
                            }]
                        })
                    } else {
                        wx.setWifiList({
                            wifiList: []
                        })
                    }
                })

            }
        })
        
    },
    getConnectedWifi: function() {
        wx.getConnectedWifi({
            success: function(res) {
                console.log(res);
            }
        });
    }
})