// pages/s-intro/s-intro.js
const app = getApp()


Page({

  /**
   * Page initial data
   */
  data: {
    surveyID: null,
    isIPX: app.globalData.isIPX
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    db.collection('survey')
      .where({
        surveyID: options.surveyID
      }).get({
        success: res => {
          //console.log(res.data)
          this.setData({
            survey: res.data,
            surveyID: options.surveyID
          })
          if (res.data.length == 0) {
            wx.navigateTo({
              url: '../index/index'
            })
          }
        }
      })
    //console.log('id is '+ options.surveyID)

  },

  bindViewTap: function () {
    wx.navigateTo({
      url: '../my/my'
    })
  },
  startTap: function () {
    wx.navigateTo({
      url: '../s-question/s-question',
    })
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})