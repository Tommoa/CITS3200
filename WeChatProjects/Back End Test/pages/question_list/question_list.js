const db = wx.cloud.database()

// pages/question_list/question_list.js
Page({


  data: {
    questionList:[]

  },


  onLoad: function (options) {
    // console.log(options.id)
    db.collection('question')
      .where({
        department: options.id,
        group: parseInt(options.group)
      }).get({
        success: res => {
          this.setData({
            questionList:res.data
          })
          //console.log(res.data)
        }
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

  goQuestion(event){
    //console.log(event.currentTarget.dataset.num)
    wx.redirectTo({
      url: '../question/question?id=' + this.options.id + '&questionNumber=' + event.currentTarget.dataset.num +'&group=' + this.options.group
    })
  }
})