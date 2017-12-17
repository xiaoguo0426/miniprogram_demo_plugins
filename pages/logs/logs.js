//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    console.log(this.data.logs);
  },
  addClick:function(){
      let logs = this.data.logs;
      logs.push("2017/10/19 12:00:00");

      this.setData({
          logs:logs
      });
      console.log(this.data.logs);
  }
})
