let heartCheck = {
    timeout: 10000,
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function() {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    },
    start: function() {
        this.timeoutObj = setTimeout(() => {
            console.log("发送ping");
            wx.sendSocketMessage({
                data: "ping",
                // success(){
                //  console.log("发送ping成功");
                // }
            });
            this.serverTimeoutObj = setTimeout(() => {
                wx.closeSocket();
            }, this.timeout);
        }, this.timeout);
    }
};

function Socket() {
    this.host = "ws://122.114.154.166:9501";
    // this.port = "9501";
    this.handlers = {}; //wx原生事件
    this.listenList = {}; //自定义事件
    this.socketTask = {};
    this.status = true;
}
Socket.prototype = {
    // 订阅事件
    on: function(eventType, callback) {
        var self = this;
        // if (!(eventType in self.handlers)) {
        //     self.handlers[eventType] = [];
        // }
        typeof callback === 'function' && (self.handlers[eventType] = callback);
    },
    listen: function(eventType, callback) {
        var self = this;
        console.log("监听了自定义事件：" + eventType);
        console.log(self.listenList[eventType]);
        // if (!(eventType in self.listenList)) {
        //     self.listenList[eventType] = [];
        // }
        typeof callback === 'function' && (self.listenList[eventType] = callback);
        console.log(self.listenList[eventType]);
    },
    // 触发事件(发布事件)
    emit: function(eventType, res) {
        // var self = this;
        // for (var i = 0; i < self.handlers[eventType].length; i++) {
        //     self.handlers[eventType].call(self, res);
        // }
        if (eventType in this.handlers) {
            this.handlers[eventType].call(this, res)
        }
    },
    // 删除原生订阅事件
    off: function(eventType) {
        let eventList = this.handlers;
        let that = this;
        if (eventList[eventType] !== undefined) {
            delete eventList[eventType];
            this.handlers = eventList;
        }
    },
    remove: function(eventType) {
        console.log("移除了自定义监听事件" + eventType);
        let eventList = this.listenList;
        console.log(eventList);
        let that = this;
        if (eventList[eventType] !== undefined) {
            delete eventList[eventType];
            console.log(eventList);
            that.listenList = eventList;
        }
        console.log(that.listenList);
    },
    run: function() {
        let that = this;

        //开启socket
        const socketTask = wx.connectSocket({
            url: that.host,
            method: "GET",
            header: {},
            success: function(res) {
                let eventType = 'connectSocket';
                if (that.handlers[eventType]) {
                    that.emit(eventType, res);
                } else {
                    //console.log('默认连接成功回调');
                }
            }
        });
        socketTask.onOpen(function(res) {
            let eventType = 'onSocketOpen';
            if (that.handlers[eventType]) {
                that.emit(eventType, res);
            } else {
                //console.log('默认socket打开成功回调');
            }
        });
        socketTask.onMessage(function(res) {
            console.log('收到服务器内容：' + res.data)
            let json = JSON.parse(res.data);
            let data = json.data;
            let eventType = json.event;
            //console.log(typeof that.listenList[eventType]);
            //console.log(that.listenList[eventType]);
            //console.log(eventType in that.listenList);
            console.log(eventType);
            console.log(that.listenList);
            if (eventType in that.listenList) {
                that.listenList[eventType].call(that, data);
            } else {
                //console.log('默认收到信息成功回调');
            }
        })
        socketTask.onClose(function(res) {
            console.log(res);
            let eventType = 'onSocketClose';
            if (that.handlers[eventType]) {
                that.emit(eventType, res);
            } else {
                console.log('默认关闭socket成功回调');
            }
        })
        socketTask.onError(function(res) {
            let eventType = 'onSocketError';
            if (that.handlers[eventType]) {
                that.emit(eventType, res);
            } else {
                console.log('默认socket错误回调');
                this.status = false;
            }
        });

        this.socketTask = socketTask;
        console.log(this);
        return this;
    },
    close: function() {
        console.log(this.status);
        this.status && this.socketTask.close();
        // this.socketTask.close();
    }
};

module.exports = new Socket();

/**
 * socket.on('connectSocket',function(){
 *      console.log('我监听的是原生socket事件');
 * })
 * 
 * socket.listen('websocket-connected',function(){
 *      console.log('我监听的是自定义事件');
 * };
 * 
 * 
 * let socketTask = socket.run();//运行socket
 * 
 * socketTask.close();//关闭socket
 * 
 * socket.off('connectSocket');
 * 
 * socket.remove('websocket-connected');
 * 
 * //socket.listen('websocket-finishPay',function(){}); //可以多次调用listen方法，无需把事件监听声明
 * 
 * //自定义事件格式：  模块名-业务名   order-payed 订单完成   order-paying 正在支付
 * 
 * //socket数据格式：  
 * //A扫了B的二维码，B的二维码中要显示，A的头像，A正在支付...
 * {
 *      type: 'NORMAL',
 *      event: 'order-paying',
 *      data:{
 *          'username':'锅锅锅',
 *      }
 * }
 * 
 * //客户端连接socket服务器返回的数据格式
 * {
 *      type: 'SYS',
 *      event: 'socket-connected',
 *      data:{
 *          'client_id':'wefweeyrey452353245',
 *      }
 * }
 * 
 */