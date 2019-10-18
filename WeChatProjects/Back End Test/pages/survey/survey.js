const app = getApp()
const db = wx.cloud.database()

// pages/survey/survey.js
Page({

  data: {
    surveyID: '',
    grouplist: [],
    group: 0
  },
  setGroup: function() {
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
      if(sum1 >= random && count == 0){
        groupvalue = i+1
        count++
      }
    }
    //console.log(groupvalue)
    this.setData({
      group: groupvalue
    })
    //console.log(this.data.group)
  },
  onLoad: function(options) {
    console.log(app.globalData.answer)
    app.globalData.answer = []
    console.log(app.globalData.answer)
    db.collection('survey')
      .where({
        surveyID: options.id
      }).get({
        success: res => {
          //console.log(res.data[0].group)
          this.setData({
            survey: res.data,
            surveyID: options.id,
            group: res.data[0].group
          })
          this.setGroup()
          if (res.data.length == 0) {
            wx.navigateTo({
              url: '../index/index'
            })
          }
        }
      })
    //console.log('id is '+ options.id)
  },

  onReady: function() {},

  onShow: function() {},

  onHide: function() {

  },

  onUnload: function() {

  },

  onPullDownRefresh: function() {

  },

  onReachBottom: function() {

  },

  onShareAppMessage: function() {

  },
  goQuestion: function() {
    wx.navigateTo({
      url: '../question/question?id=' + this.data.surveyID + '&questionNumber=' + 0+'&group=' +this.data.group
    })
  }
})