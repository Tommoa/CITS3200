// pages/final/final.js
const app = getApp()

Page({

  data: {
    isIPX: app.globalData.isIPX
  },

  bindViewTap: function () {
    wx.navigateTo({
      url: '../my/my'
    })
  },
  bindViewTapHome: function () {
    wx.navigateBack({
      delta:3
    })
  },
  onLoad: function (options) {

  },

  onReady: function () {

  },


  onShow: function () {

  },


  onHide: function () {

  },


  onUnload: function () {

  },

 
  onPullDownRefresh: function () {

  },

 
  onReachBottom: function () {

  },


  onShareAppMessage: function () {

  }
})