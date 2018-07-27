//http请求组件
function Http() {
    this.domain = '';
    this.callbacks = {
        success: function (res) {
            this.handle(res);
            //console.log('默认成功处理方法');
        },
        fail: function (res) {
            //console.log('默认错误处理方法');
        },
        complate: function (res) {
            //console.log('默认完成处理方法');
        }
    }
};

/**
 * POST请求
 */
Http.prototype.post = function (url, data, callbacks) {
    this.load(url, 'POST', data, callbacks);
}

/**
 * GET请求
 */
Http.prototype.get = function (url, data, callbacks) {
    this.load(url, 'GET', data, callbacks);
}

/**
 * 请求处理
 * 1.自定义header，请放到data中  data = {'header':{'content-type':'application/json'}};
 */
Http.prototype.load = function (url, type, data, callback) {
    let header = {
        'Content-type': 'application/x-www-form-urlencoded'
        //application/json
    };
    if ("POST" === type){
        header = Object.assign(header, {
            'X-CSRF-TOKEN': wx.getStorageSync('_token')
        });
    }
    const callbackType = typeof callback;
    let callbacks = {};
    if ('function' === callbackType) {
        callbacks = Object.assign(this.callbacks, { success: callback });
    } else if ('object' === callbackType) {
        callbacks = Object.assign(this.callbacks, callback);
    } else {
        callbacks = this.callbacks;
    }

    // if (data.header) {
    //     header = Object.assign(header,data.header);
    //     delete data.header;
    // }
    let new_url = this.domain ? this.domain + url : url;
    wx.request({
        url: new_url,
        data: data || [],
        method: type || 'GET',
        header: header,
        dataType: 'JSON',
        success: function (res) {
            console.log(res.data);
            // console.log(JSON.parse(res.data));
            typeof callbacks.success === 'function' && callbacks.success.call(this, JSON.parse(res.data));
        },
        fail: function (res) {
            typeof callbacks.fail === 'function' && callbacks.fail.apply(this, res);
        },
        complete: function (res) {
            typeof callbacks.complete === 'function' && callbacks.complete.apply(this, res);
        }
    })

}

Http.prototype.ssl = function (url) {
    return /^https:\/\/$/.test(url);
}
/**
 * 默认处理方法
 */
Http.prototype.handle = function (res) {
    //todo
    //这里的方法还没有想到
}

module.exports = new Http();