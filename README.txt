http.js使用：

1.引入和创建http对象
	const Http = require('../../utils/http.js');

	let http = new Http();

2.发送请求

	GET请求：
		.	常规调用
			const url = 'localhost/test.php';
			const data = {a:1,b:2};
			const callback = function(res){
				console.log(res);
			}

			http.get(url,data,callback);

		.	链式调用

			http.setUrl(url).setData(data).success(callback).get();

			也可以这样

			http.setUrl(url);
			http.setData(data);
			http.success(callback);
			http.get();

	POST请求：
		.	常规调用
			const url = 'localhost/test.php';
			const data = {a:1,b:2};
			const callback = function(res){
				console.log(res);
			}

			http.post(url,data,callback);

		.	链式调用

			http.setUrl(url).setData(data).success(callback).post();

			也可以这样

			http.setUrl(url);
			http.setData(data);
			http.success(callback);
			http.post();

3.需要注意
	. 	header
		默认值为 'Content-type': 'application/x-www-form-urlencoded'

		经过测试好像header必须要这样设置，在发送POST请求的时候，php使用$_POST才能接收到数据。

	.callback
		为'function'类型，是成功回调。

		为'object'类型，格式：
			{
				'success':function(res){},
				'fail':function(){},
				'complate':function(){}
			}

	.为什么需要创建Http对象;
		之前的做法是使用了原型模式，会存在一个问题，当同时发起多次请求的时候【全是异步请求】，前一次请求的参数会覆盖后一次请求的参数，因为原型模式的所有属性和方法都是共享的，类似编程语言的静态变量和静态方法。
		所以需要创建多个Http对象，把不同实例的属性和方法隔离开，互不影响。
		eg:
			let url1 = "localhost/index.php";
			let url1 = "localhost/test.php";

			let http1 = new Http();
			let http2 = new Http();

			http1.setUrl(url1);

			http2.setUrl(url2);

			console.log(http1.url);//localhost/index.php

			console.log(http2.url);//localhost/test.php

		当然，如果你是在一个请求的成功回调中再发起一次请求【即同步请求】，则用当前对象即可。
