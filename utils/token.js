const http = require('http.js');

function Token() {
    
    var name = 'xiaoguo';
    var password = '123123';
    var token_key = 'token';
    var refresh_token_key = 'refresh_token';
    /**
     * 设置token
     */
    this.set = function (val) {
        try {
            wx.setStorageSync(token_key, val)
        } catch (e) {
            console.log(e);
        }
    };
    /**
     * 获得token
     */
    this.get = function () {
        try {
            let token = wx.getStorageSync(token_key);
            return token;
        } catch (e) {
            console.log(e);
        }
        return '';
    };
    /**
     * 创建token
     */
    this.create = function (callback) {
        let token = this.get(),
            _this = this;
        if (!token) {
            http.post('api/auth',
                {
                    'name': name,
                    'password': password,
                },
                {
                    success: function (res) {
                        _this.set(res.token);
                        typeof callback === 'function' && callback.call(this,res.token);
                    },
                    fail: function (res) {
                        console.log(res);
                    }
                }
            );
        }
    };
    /**
     * 刷新token
     */
    this.refresh = function () {

    };
}

module.exports = new Token();