const db = wx.cloud.database()

// pages/question_list/question_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  goQuestion(event){
    //console.log(event.currentTarget.dataset.num)
    wx.redirectTo({
      url: '../question/question?id=' + this.options.id + '&questionNumber=' + event.currentTarget.dataset.num +'&group=' + this.options.group
    })
  }
})