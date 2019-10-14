const app = getApp()
const db = wx.cloud.database()

// pages/question/question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionNumber: 0,
    questionList: [],
    nextQuestion: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.id)
    db.collection('question')
      .where({
       department: options.id,
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
      url: '../question_list/question_list?id=' + this.options.id
    })
  },

  goNextQuestion: function(){
    console.log(this.data.questionNumber)
    app.globalData.answer[this.data.questionNumber] ='111'
    console.log(app.globalData.answer)
    wx.navigateTo({
      url: '../question/question?id=' + this.options.id + '&questionNumber=' + this.data.nextQuestion
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
      // data 字段表示需新增的 JSON 数据
      data: {
        ans: app.globalData.answer,
        surveyID: this.options.id,
      }
    })
      .then(res => {
        console.log(res)
      })

  }
})