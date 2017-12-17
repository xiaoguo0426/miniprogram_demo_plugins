//http请求组件
function Http() {
      this.callbacks_clone = {
            success: function (res) {
                  console.log('默认成功处理方法');
            },
            fail: function (res) {
                  console.log('默认错误处理方法');
            },
            complate: function (res) {
                  console.log('默认完成处理方法');
            }
      };
      this.callbacks = this.callbacks_clone;
      this.url = "";
      this.data = {};
};

/**
 * POST请求
 */
Http.prototype.post = function (url, data, callbacks) {
      let args_len = arguments.length;
      if (0 === args_len){
            url = this.url;
            data= this.data;
            callbacks = this.callbacks;
      }
      this.load(url, 'POST', data, callbacks);
}

/**
 * GET请求
 */
Http.prototype.get = function (url, data, callbacks) {
      let args_len = arguments.length;
      if (0 === args_len) {
            url = this.url;
            data = this.data;
            callbacks = this.callbacks;
      }
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
      const callbackType = typeof callback;
      let callbacks = {};
      if ('function' === callbackType) {
            callbacks = Object.assign(this.callbacks, { success: callback });
      } else if ('object' === callbackType) {
            callbacks = Object.assign(this.callbacks, callback);
      } else {
            callbacks = this.callbacks;
      }

      if (data.header) {
            header = Object.assign(header, data.header);
            delete data.header;
      }

      wx.request({
            url: url,
            data: data || [],
            method: type || 'GET',
            header: header,
            dataType: 'JSON',
            success: function (res) {
                  typeof callbacks.success === 'function' && callbacks.success.call(this, JSON.parse(res.data));
            },
            fail: function (res) {
                  typeof callbacks.fail === 'function' && callbacks.fail.apply(this, res);
            },
            complete: function (res) {
                  typeof callbacks.complete === 'function' && callbacks.complete.apply(this, res);
            }
      })
      this.reset();
}
/**
 * 默认处理方法
 */
Http.prototype.handle = function (res) {
      //todo
      //这里的方法还没有想到
}

/**
 * http重置
 */
Http.prototype.reset = function(){
      this.url = "";
      this.data = {};
      this.callbacks = this.callbacks_clone;
}

Http.prototype.setUrl = function (url) {
      this.url = url;
      return this;
};

Http.prototype.setData = function (data) {
      this.data = data;
      return this;
};

Http.prototype.success = function (fn) {
      (typeof fn === 'function') && (this.callbacks.success = fn);
      return this;
};

Http.prototype.fail = function (fn) {
      (typeof fn === 'function') && (this.callbacks.fail = fn);
      return this;
};

module.exports = new Http();