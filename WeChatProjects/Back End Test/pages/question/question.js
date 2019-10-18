const app = getApp()
const db = wx.cloud.database()

// pages/question/question.js
Page({

  data: {
    questionNumber: 0,
    questionList: [],
    nextQuestion: 0,
  },

  onLoad: function (options) {
    //console.log(options.id)
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
          //console.log(this.data.allQuesion)
        }
      }),
      this.setData({
      nextQuestion: parseInt(options.questionNumber) + 1
      })
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

  },

  goQuestionList: function () {
    wx.navigateTo({
      url: '../question_list/question_list?id=' + this.options.id + '&group=' + this.options.group
    })
  },

  goNextQuestion: function(){
    console.log(this.data.questionNumber)
    app.globalData.answer[this.data.questionNumber] ='111'
    console.log(app.globalData.answer)
    wx.navigateTo({
      url: '../question/question?id=' + this.options.id + '&questionNumber=' + this.data.nextQuestion + '&group=' + this.options.group
    })
  },
  submitAnswer: function(){
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
  },
})