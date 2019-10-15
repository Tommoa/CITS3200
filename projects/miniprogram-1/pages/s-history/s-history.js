// pages/s-history/s-history.js
const app = getApp()
const db = wx.cloud.database()

Page({


  data: {
    isIPX: app.globalData.isIPX,
    questionList: [],
    questionNumber: 0,
    allQuesion:0
  },

  bindViewTapBack: function() {
    wx.navigateBack()
  },

  bindSubmitTapBack: function() {
    wx.navigateBack()
  },

  onLoad: function(options) {
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
    db.collection('question')
      .where({
        department: options.id,
        group: parseInt(options.group)
      }).get({
        success: res => {
          this.setData({
            questionList: res.data,
            allQuesion: res.data.length - 1,
            questionNumber: options.questionNumber,
          })
          //console.log(res.data)
        }
      })

  },

  nextTap: function() {
    wx.redirectTo({
      url: '../s-final/final',
    })
  },

  onReady: function() {

  },


  onShow: function() {

  },


  onHide: function() {

  },


  onUnload: function() {

  },


  onPullDownRefresh: function() {

  },


  onReachBottom: function() {

  }
})