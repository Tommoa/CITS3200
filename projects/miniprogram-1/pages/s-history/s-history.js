// pages/s-history/s-history.js
const app = getApp()
const db = wx.cloud.database()

Page({


  data: {
    isIPX: app.globalData.isIPX,
    questionList: [],
    questionNumber: 0,
    ID:0,
    groupNo:0,
    allQuesion: 0
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
        surveyID: options.id
      }).get({
        success: res => {
          //console.log(res.data[0].group)
          this.setData({
            survey: res.data,
            ID: options.id,
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
      this.setData({
        groupNo: parseInt(options.group)
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

  },

  submitAnswer: function() {
    app.globalData.answer[this.data.questionNumber] = '111'
    console.log(app.globalData.answer)
    db.collection('answer').add({
      data: [{
        ans: app.globalData.answer,
        surveyID: this.options.id
      }]
    })
    db.collection('answer').add({
        data: {
          ans: app.globalData.answer,
          surveyID: this.options.id,
        }
      })
      .then(res => {
        console.log(res)
      })
    wx.redirectTo({
      url: '../s-final/final',
    })
  }
})