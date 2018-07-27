// components/component-slot.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  options: {
      multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  relations: {
      './component-test': {
          type: 'parent',
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

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
