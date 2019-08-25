//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Welcome to UWA Survet Tool',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
