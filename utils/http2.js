function Http() {
    let obj = new Object();
    obj.callbacks_clone = {
        success: function(res) {
            console.log('默认成功处理方法');
        },
        fail: function(res) {
            console.log('默认错误处理方法');
        },
        complete: function(res) {
            console.log('默认完成处理方法');
        }
    };
    obj.callbacks = obj.callbacks_clone;
    obj.header = {
        "Content-type": "application/x-www-form-urlencoded"
    };
    obj.domain =
        obj.url = '';
    obj.data = {};
    obj.post = function(url, data, callbacks) {
        let args_len = arguments.length;
        if (0 === args_len) {
            url = this.url;
            data = this.data;
            callbacks = this.callbacks;
        }
        return this.load(url, 'POST', data, callbacks);
    };
    obj.get = function(url, data, callbacks) {
        let args_len = arguments.length;
        if (0 === args_len) {
            url = this.url;
            data = this.data;
            callbacks = this.callbacks;
        }
        return this.load(url, 'GET', data, callbacks);
    };
    obj.load = function(url, type, data, callback) {
        let self = this;
        const callbackType = typeof callback;
        let callbacks = {};
        if ('function' === callbackType) {
            callbacks = Object.assign(this.callbacks, {
                success: callback
            });
        } else if ('object' === callbackType) {
            callbacks = Object.assign(this.callbacks, callback);
        } else {
            callbacks = this.callbacks;
        }

        self.header.token = wx.getStorageSync('token');

        return wx.request({
            url: url,
            data: data || [],
            method: type || 'GET',
            header: self.header,
            //   dataType: 'JSON',
            success: function(res) {
                try {
                    if (res.statusCode != 200) {
                        // 状态码401表示token异常，需要重新获取token，然后重新发业务请求
                        if (res.statusCode == 401) {
                            let cb = function() {
                                self.load(url, type, data, callback);
                            }
                            return;
                        }
                        callbacks.fail.apply(this, [res]);
                        return;
                    }
                    typeof callbacks.success === 'function' && callbacks.success.call(this, res.data);
                } catch (e) {
                    console.log(e);
                }
            },
            fail: function(res) {
                typeof callbacks.fail === 'function' && callbacks.fail.apply(this, [res]);
            },
            complete: function(res) {
                typeof callbacks.complete === 'function' && callbacks.complete.apply(this, res);
            }
        })
        // this.reset();
    };
    obj.handle = function(res) {
        //todo
        //这里的方法还没有想到
    };
    obj.reset = function() {
        this.url = "";
        this.data = {};
        this.callbacks = this.callbacks_clone;
    };
    obj.setUrl = function(url) {
        this.url = url;
        return this;
    };
    obj.setHeader = function(header) {
        this.header = header;
        return this;
    }
    obj.setData = function(data) {
        this.data = data;
        return this;
    };
    obj.success = function(fn) {
        (typeof fn === 'function') && (this.callbacks.success = fn);
        return this;
    };
    obj.fail = function(fn) {
        (typeof fn === 'function') && (this.callbacks.fail = fn);
        return this;
    };

    return obj;
}

function post() {
    return createHttp('post', arguments);
}

function get() {
    return createHttp('get', arguments);
}

function load() {
    return createHttp('load', arguments);
}

function createHttp(method, args) {
    let http = new Http();
    return http[method].call(http, ...args);
}

function getHttp() {
    return new Http();
}

module.exports = {
    post,
    get,
    load,
    getHttp
};
// 用法
// let http = require("../../../utils/http");
// http.get("/Order/WriteOff/checkCode", params, {success, fail});
// http.post("/Order/WriteOff/checkCode", params, {success, fail});