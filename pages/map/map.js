// pages/map/map.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        address: '',
        latitude: 0,
        longitude: 0,
        speed: 0,
        accuracy: 0,
        altitude: 0,
        verticalAccuracy: 0,
        horizontalAccuracy: 0
    },
    onReady: function (e) {
        // 使用 wx.createMapContext 获取 map 上下文
        this.mapCtx = wx.createMapContext('myMap')
    },
    getMyLocation: function () {
        const that = this;
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                var latitude = res.latitude
                var longitude = res.longitude
                var speed = res.speed
                var accuracy = res.accuracy
                var altitude = res.altitude;
                var verticalAccuracy = res.verticalAccuracy;
                var horizontalAccuracy = res.horizontalAccuracy;

                that.setData({
                    latitude: latitude,
                    longitude: longitude,
                    speed: speed,
                    accuracy: accuracy,
                    altitude: altitude,
                    verticalAccuracy: verticalAccuracy,
                    horizontalAccuracy: horizontalAccuracy
                });
                console.log(res);
            }
        })
    },
    openMyLocation: function () {
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success: function (res) {
                var latitude = res.latitude
                var longitude = res.longitude
                wx.openLocation({
                    latitude: latitude,
                    longitude: longitude,
                    scale: 28
                })
            }
        })
    },
    chooseMyLocation: function () {
        const that = this;
        wx.chooseLocation({
            success: function (res) {
                console.log(res);
                let name = res.name;
                let address = res.address;
                let latitude = res.latitude;
                let longitude = res.longitude;

                that.setData({
                    name: name,
                    address: address,
                    latitude: latitude,
                    longitude: longitude
                });
            }
        });
    },
    getCenterLocation: function () {
        this.mapCtx.getCenterLocation({
            success: function (res) {
                console.log(res.longitude)
                console.log(res.latitude)
            }
        })
    },
    moveToLocation: function () {
        this.mapCtx.moveToLocation()
    },
    translateMarker: function () {
        this.mapCtx.translateMarker({
            markerId: 0,
            autoRotate: true,
            duration: 1000,
            destination: {
                latitude: 23.10229,
                longitude: 113.3345211,
            },
            animationEnd() {
                console.log('animation end')
            }
        })
    },
    includePoints: function () {
        this.mapCtx.includePoints({
            padding: [10],
            points: [{
                latitude: 23.10229,
                longitude: 113.3345211,
            }, {
                latitude: 23.00229,
                longitude: 113.3345211,
            }]
        })
    }
})