// pages/s-intro/s-intro.js
const app = getApp()
const db = wx.cloud.database()


Page({

  /**
   * Page initial data
   */
  data: {
    surveyID: null,
    grouplist: [],
    group: 0,
    isIPX: app.globalData.isIPX
  },
  setGroup: function () {
    var sum = 0
    var sum1 = 0
    var groupvalue = 0
    var count = 0
    for (var i = 0; i < this.data.group.length; i++) {
      sum = this.data.group[i] + sum
    }
    var random = Math.random() * sum
    //console.log(random)
    for (var i = 0; i < this.data.group.length; i++) {
      sum1 = this.data.group[i] + sum1
      if (sum1 >= random && count == 0) {
        groupvalue = i + 1
        count++
      }
    }
    //console.log(groupvalue)
    this.setData({
      group: groupvalue
    })
    //console.log(this.data.group)
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(app.globalData.answer)
    app.globalData.answer = []
    console.log(app.globalData.answer)
    db.collection('survey')
      .where({
        surveyID: options.surveyID
      }).get({
        success: res => {
          //console.log(res.data[0].group)
          this.setData({
            survey: res.data,
            surveyID: options.surveyID,
            group: res.data[0].group
          })
          this.setGroup()
        }
      })
    if (res.data.length == 0) {
      wx.redirectTo({
        url: '../index/index'
      })
    }
    //console.log('id is '+ options.surveyID)

  },

  bindViewTap: function () {
    wx.navigateTo({
      url: '../my/my'
    })
  },
  startTap: function () {
    wx.redirectTo({
      // url: '../s-question/s-question?questionNumber=' + 0,
      url: '../s-question/s-question?id=' + this.data.surveyID + '&questionNumber=' + 0 + '&group=' + this.data.group
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