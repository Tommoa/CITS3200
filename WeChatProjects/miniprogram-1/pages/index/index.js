//index.js
const app = getApp()

Page({
  data: {
    motto: 'Welcome to UWA Survey Tool',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isIPX: app.globalData.isIPX,
    surveyID: null
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../my/my'
    })
  },
  inputID: function(e) {
    this.setData({
      surveyID: e.detail.value
    })
    if (e.detail.value.length ==8) {
      // app.globalData.currentSurveyID = e.detail.value 
      wx.navigateTo({
        url: '../s-intro/s-intro?surveyID=' + e.detail.value,
      })
    }
    
  },
  onLoad: function () {
    
  }
  
})
