function Socket() {
    this.host = "122.114.154.166";
    this.port = "9501";
    this.handlers = {}; //wx原生事件
    this.listenList = {}; //自定义事件
}
Socket.prototype = {
    // 订阅事件
    on: function (eventType, handler) {
        var self = this;
        if (!(eventType in self.handlers)) {
            self.handlers[eventType] = [];
        }
        self.handlers[eventType].push(handler);
        return this;
    },
    listen: function (eventType, handler) {
        var self = this;
        if (!(eventType in self.listenList)) {
            self.listenList[eventType] = [];
        }
        self.listenList[eventType].push(handler);
    },
    // 触发事件(发布事件)
    emit: function (eventType, res) {
        var self = this;
        console.log(arguments);
        // var handlerArgs = Array.prototype.slice.call(arguments, 1);
        for (var i = 0; i < self.handlers[eventType].length; i++) {
            self.handlers[eventType][i].call(self, res);
        }
        return self;
    },
    // 删除订阅事件
    off: function (eventType, handler) {
        var currentEvent = this.handlers[eventType];
        var len = 0;
        if (currentEvent) {
            len = currentEvent.length;
            for (var i = len - 1; i >= 0; i--) {
                if (currentEvent[i] === handler) {
                    currentEvent.splice(i, 1);
                }
            }
        }
        return this;
    },
    run: function () {
        let that = this;

        console.log(that.handlers);
        //开启socket
        const socketTask = wx.connectSocket({
            url: 'ws://' + that.host + ':' + that.port,
            method: "GET",
            success: function (res) {
                let eventType = 'connectSocket';
                if (that.handlers[eventType]) {
                    that.emit(eventType, res);
                }

            }
        });
        socketTask.onOpen(function (res) {
            let eventType = 'onSocketOpen';
            if (that.handlers[eventType]) {
                that.emit(eventType, res);
            }
        });
        socketTask.onMessage(function (res) {
            console.log('收到服务器内容：' + res.data)
            let json = JSON.parse(res.data);
            let data = json.data;

            let eventType = json.event;
            if (that.listenList[eventType]) {
                for (var i = 0; i < that.listenList[eventType].length; i++) {
                    that.listenList[eventType][i].call(that, res);
                }
            }
        })
        socketTask.onClose(function (res) {
            let eventType = 'onSocketClose';
            if (that.handlers[eventType]) {
                that.emit(eventType, res);
            }
        })
        socketTask.onError(function (res) {
            let eventType = 'onSocketError';
            if (that.handlers[eventType]) {
                that.emit(eventType, res);
            }
        });

        return socketTask;
    }
};

module.exports = new Socket();

// var callback = function (data) {
//     console.log(data);
// };

// //订阅事件A
// pubsub.on('A', function (data) {
//     console.log(1 + data);
// });
// pubsub.on('A', function (data) {
//     console.log(2 + data);
// });
// pubsub.on('A', callback);

// //触发事件A
// pubsub.emit('A', '我是参数');

// //删除事件A的订阅源callback
// pubsub.off('A', callback);

// pubsub.emit('A', '我是第二次调用的参数');