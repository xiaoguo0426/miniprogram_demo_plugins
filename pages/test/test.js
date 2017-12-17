const http = require('../../utils/http.js')
const msg = require('../../utils/msg.js')
// pages/test/test.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        product_id: 123
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.hideShareMenu();
        const url = 'https://api.it120.cc/mall/config/get-value';
        const callbacks = {
            success: function (res) {
                console.log(res);
                console.log('自定义成功处理方法');
            },
            fail: function (res) {
                console.log(res);
                console.log('自定义错误处理方法');
            }
        };
        http.get(url, { key: 'mallName' }, callbacks);
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
    modalTap: function (e) {
        msg.alert('提示语句', '这是一段提示语', function () {
            msg.alert('你点击了确认按钮');
        });
    },
    noTitlemodalTap: function (e) {
        msg.confirm('这是一个确认提示框', function () {
            msg.alert('你点击了确认按钮');
        }, function () {
            msg.alert('你点击了取消按钮');
        });
    },
    toast1Tap: function () {
        // wx.showToast({
        //     title: "默认"
        // })
        msg.success('默认');
    },
    toast2Tap: function () {
        // wx.showToast({
        //     title: "duration 3000",
        //     duration: 3000
        // })
        msg.success('成功', 5000);
    },
    toast3Tap: function () {
        // wx.showToast({
        //     title: "loading",
        //     icon: "loading",
        //     duration: 5000
        // })
        msg.loading('加载中...');
    },
    hideToast: function () {
        msg.close();
    },
    chooseAddress: function () {
        wx.chooseAddress({
            success: function (res) {
                console.log(res.userName)
                console.log(res.postalCode)
                console.log(res.provinceName)
                console.log(res.cityName)
                console.log(res.countyName)
                console.log(res.detailInfo)
                console.log(res.nationalCode)
                console.log(res.telNumber)
            }
        })
    },
    appConfig: function () {
        wx.openSetting({
            success: (res) => {
                console.log(res);
                /*
                 * res.authSetting = {
                 *   "scope.userInfo": true,
                 *   "scope.userLocation": true
                 * }
                 */
            }
        })
    },
    weRun: function () {
        wx.getWeRunData({
            success(res) {
                const encryptedData = res.encryptedData;
                console.log(encryptedData);
            }
        });
        wx.checkIsSupportSoterAuthentication({
            success(res) {
                console.log(res);
                // res.supportMode = [] 不具备任何被SOTER支持的生物识别方式
                // res.supportMode = ['fingerPrint'] 只支持指纹识别
                // res.supportMode = ['fingerPrint', 'facial'] 支持指纹识别和人脸识别
            },
            fail(res) {
                console.log('11');
            }
        });
    },
    dilivery: function () {
        const url = 'http://apis.baidu.com/kuaidicom/express_api/express_api?com=yuantong&nu=806820160474&muti=0&order=desc';
        const data = {
            header: {
                'apikey': 'c3ed467ce01fcba9fcae87d0aeac266d'
            }
        };

        http.get(url, data, function (res) {
            console.log(res);
        });
    },
    downloadFile: function () {
        wx.downloadFile({
            url: 'http://7xwmxr.com1.z0.glb.clouddn.com/20160725125205.jpg', //仅为示例，并非真实的资源
            success: function (res) {
                console.log(res);
                if (res.statusCode === 200) {
                    // wx.saveFile({
                    //     tempFilePath: res.tempFilePath,
                    //     success: function (res) {
                    //         var savedFilePath = res.savedFilePath
                    //         console.log(savedFilePath);
                    //     }
                    // })
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success(res) {
                            console.log(res);
                        }
                    })
                }
            }
        })
    }
})