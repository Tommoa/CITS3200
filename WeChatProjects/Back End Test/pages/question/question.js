const db = wx.cloud.database()

// pages/question/question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    db.collection('question')
      .where({
       department: options.id
      }).get({
        success: res => {
          console.log(res.data)
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

  goQuestionList: function () {
    wx.navigateTo({
      url: '../question_list/question_list?id=' + this.options.id
    })
  }
})