
function Login() {
    this.url = '';
}

Login.prototype.setLoginUrl = function (url) {
    this.url = url;
}

Login.prototype.doLogin = function (callback) {
    wx.login({
        success: function (res) {
            //发起网络请求
            wx.request({
                url: 'https://test.com/onLogin',
                data: {
                    code: res.code
                }
            });
        
        },
        fail:function () {

        },
        complete:function () {

        }
    })
}