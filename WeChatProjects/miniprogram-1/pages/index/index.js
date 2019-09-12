//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Welcome to UWA Survey Tool',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isIPX: app.globalData.isIPX
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../my/my'
    })
  },
  onLoad: function () {
    
  }
  
})
