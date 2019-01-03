## sokcet.js使用：

```
const socket = require('xxxx/socket.js');

//监听wx原生socket回调
socket.on('connectSocket',function(){
    console.log('我监听的是原生socket事件');
});
socket.listen('websocket-connected',function(){
    console.log('我监听的是自定义事件');
};

let socketTask = socket.run();//运行socket

socketTask.close();//关闭socket

socket.off('connectSocket');//解绑原生事件监听

socket.remove('websocket-connected');//解绑自定义事件监听

socket.listen('event-name',function(){});//可以多次调用，同名事件会被覆盖。
```

#### 自定义事件名格式：  

    `模块名-业务名`   

    `order-payed`   订单完成   
    `order-paying`  正在支付

#### 场景

A扫了B的二维码，B的界面中要显示，A的头像，A正在支付...
```
{
      type: 'NORMAL',
      event: 'order-paying',
      data:{
          'username':'锅锅锅',
      }
}
```

客户端连接socket服务器返回的数据格式
```
{
      type: 'SYS',
      event: 'socket-connected',
      data:{
          'client_id':'wefweeyrey452353245',
      }
}
```
