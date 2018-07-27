function Msg() {
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

Msg.prototype.error = function (title, duration) {
    // this.toast(title, 'success', duration);
}

Msg.prototype.loading = function (title) {
    // wx.showToast({
    //     title: title,
    //     icon: "loading",
    //     duration: 5000
    // })
    this.toast(title, 'loading', 5000);
}

Msg.prototype.close = function () {
    wx.hideToast();
}

module.exports = new Msg();