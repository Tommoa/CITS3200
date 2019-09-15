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
  getID: function (e) {
    this.setData({
      surveyid: e.detail.value
    })
    if (e.detail.value.length == 8) {
      wx.navigateTo({
        url: '../s-intro/s-intro?surveyID=' + this.data.surveyid
      })
    }
  },
  // searchSurveyFunc: function () {
  //   if (this.data.surveyid != '') {
  //     wx.navigateTo({
  //       url: '../s-intro/s-intro?surveyID=' + this.data.surveyid
  //     })
  //   }
  // },
  onLoad: function () {
    
  }
  
})
