// components/component-test.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      innerText: {
          type: String,
          value: 'default value888',
          observer:'customMethod'
      }
  },

  options: {
      multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  relations:{
      './component-slot':{
          type:'child',
          linked: function (target) {
              // 每次有custom-li被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
          },
          linkChanged: function (target) {
              // 每次有custom-li被移动后执行，target是该节点实例对象，触发在该节点moved生命周期之后
          },
          unlinked: function (target) {
              // 每次有custom-li被移除时执行，target是该节点实例对象，触发在该节点detached生命周期之后
          }
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
        testData:'123'
  },

  /**
   * 组件的方法列表
   */
  methods: {
      customMethod: function (e) { 
          console.log(e);
          console.log('改变属性时触发的方法');
      },
      componentTap:function(){
          console.log(this.data.testData);
          console.log(this.properties.innerText);
          this.setData({
              innerText:555
          });
          var myEventDetail = {a:222} // detail对象，提供给事件监听函数
          var myEventOption = {
              bubbles:false
          } // 触发事件的选项
          console.log(this);//一切尽在这个打印
          this.triggerEvent('myevent', myEventDetail, myEventOption);
      }
  },
  created:function(){
      console.log('在组件实例进入页面节点树时执行,注意此时不能调用 setData');
  },
  attached: function () {
      console.log('在组件实例进入页面节点树时执行');
  },
  ready: function () {
      console.log('在组件布局完成后执行，此时可以获取节点信息');
  },
  moved: function () {
      console.log('在组件实例被移动到节点树另一个位置时执行');
  },
  detached:function(){
      console.log('在组件实例被从页面节点树移除时执行');
  }
})
