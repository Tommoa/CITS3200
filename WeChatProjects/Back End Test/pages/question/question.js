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
            questionNumber: options.questionNumber,
          })
          console.log(res.data)
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
    wx.navigateTo({
      url: '../question/question?id=' + this.options.id + '&questionNumber=' + this.data.nextQuestion
    })
  }
})