//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Welcome to UWA Survey Tool',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../my/my'
    })
  },
  onLoad: function () {
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('callFunction test result: ', res)
      }
    })
  }
  
  
})
