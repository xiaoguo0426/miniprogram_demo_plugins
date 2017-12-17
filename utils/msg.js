function Msg() {
      this.callbacks = {
            success: function (res) {
                  //console.log('默认成功处理方法');
            },
            fail: function (res) {
                  //console.log('默认错误处理方法');
                  this.error('系统繁忙，请稍后再试~');
            },
            complate: function (res) {
                  //console.log('默认完成处理方法');
                  this.hideLoading();
            }
      }
}

Msg.prototype.alert = function (title, content, yes) {
      const args_len = arguments.length;
      switch (args_len) {
            case 1:
                  this.dialog('', arguments[0]);
                  break;
            case 2:
                  this.dialog(arguments[0], arguments[1]);
                  break;
            case 3:
                  this.dialog(arguments[0], arguments[1], false, '确定', '', arguments[2]);
                  break;
      }
}

Msg.prototype.confirm = function (content, yes, no) {
      this.dialog('', content, true, '确定', '取消', yes, no);
}

Msg.prototype.dialog = function (title, content, showCancel, confirmText, cancelText, yes, no) {
      wx.showModal({
            title: title,
            content: content,
            showCancel: showCancel || false,
            confirmText: confirmText || '确定',
            cancelText: cancelText || '取消',
            success: function (res) {
                  if (res.confirm) {
                        console.log('用户点击确定')
                        typeof yes === 'function' && yes();
                  } else if (res.cancel) {
                        console.log('用户点击取消')
                        typeof no === 'function' && no();
                  }
            },
            fail: function (res) {

            },
            complete: function (res) {

            }
      })
}


Msg.prototype.toast = function (title, icon, duration) {
      wx.showToast({
            title: title || '',
            icon: icon || "loading",
            duration: duration || 1500,
            mask: true//防止触摸穿透
      })
}

Msg.prototype.success = function (title, duration) {
      this.toast(title, 'success', duration);
}

Msg.prototype.error = function (title, callback, duration) {

      const callbackType = typeof callback;
      let callbacks = {};
      console.log(arguments.length);
      if ('function' === callbackType) {
            callbacks = Object.assign(this.callbacks, { success: callback });
      } else if ('object' === callbackType || '' === callback) {
            callbacks = Object.assign(this.callbacks, callback);
      }

      wx.showToast({
            title: title || '操作失败',
            image: '../../images/错误6.png',
            duration: duration || 1500,
            mask: true,//防止触摸穿透
            success: function () {
                  typeof callbacks.success === 'function' && callbacks.success.call(this);
            },
            fail: function () {
                  typeof callbacks.fail === 'function' && callbacks.fail.call(this);
            },
            complete: function () {
                  typeof callbacks.complete === 'function' && callbacks.complete.call(this);
            }
      })
}
//loading效果 默认5秒
Msg.prototype.loading = function (title) {
      // wx.showToast({
      //     title: title,
      //     icon: "loading",
      //     duration: 5000
      // })
      this.toast(title, 'loading', 5000);
}
//关闭弹层
Msg.prototype.close = function () {
      wx.hideToast();
}
//需要手动调用hideLoading方法才能关闭的Loading效果
Msg.prototype.showLoading = function (callback, title) {

      const callbackType = typeof callback;
      let callbacks = {};
      console.log(arguments.length);
      if ('function' === callbackType) {
            callbacks = Object.assign(this.callbacks, { success: callback });
      } else if ('object' === callbackType || '' === callback) {
            callbacks = Object.assign(this.callbacks, callback);
      }

      wx.showLoading({
            title: title || '加载中...',
            mask: true,//防止触摸穿透
            success: function () {
                  typeof callbacks.success === 'function' && callbacks.success.call(this);
            },
            fail: function () {
                  typeof callbacks.fail === 'function' && callbacks.fail.call(this);
            },
            complete: function () {
                  typeof callbacks.complete === 'function' && callbacks.complete.call(this);
            }
      })
}
//关闭弹层
Msg.prototype.hideLoading = function () {
      wx.hideLoading();
}

Msg.prototype.showNavigationBarLoading = function(){
      wx.showNavigationBarLoading();
}

Msg.prototype.hideNavigationBarLoading = function () {
      wx.hideNavigationBarLoading();
}

module.exports = new Msg();