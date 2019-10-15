// pages/s-question/s-question.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * Page initial data
   */
  data: {
    questionNumber: 0,
    questionList: [],
    nextQuestion: 0,
    allQuesion:0,
    radioItems: [{
        name: 'Choice 1',
        value: '0'
      },
      {
        name: 'Choice 2',
        value: '1',
        checked: true
      }
    ],
    checkboxItems: [{
        name: 'Choice 1',
        value: '0',
        checked: true
      },
      {
        name: 'Choice 2',
        value: '1'
      }
    ],
    isIPX: app.globalData.isIPX
  },
  radioChange: function(e) {
    console.log('radio change，value: ', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },
  checkboxChange: function(e) {
    console.log('checkbox change，value: ', e.detail.value);

    var checkboxItems = this.data.checkboxItems,
      values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  },

  bindViewTap: function() {
    wx.navigateTo({
      url: '../my/my'
    })
  },
  nextTap: function() {
    wx.redirectTo({
      url: '../s-final/final',
    })
  },
  goNextQuestion: function() {
    console.log(this.data.questionNumber)
    app.globalData.answer[this.data.questionNumber] = '111'
    console.log(app.globalData.answer)
    wx.redirectTo({
      url: '../s-question/s-question?id=' + this.options.id + '&questionNumber=' + this.data.nextQuestion + '&group=' + this.options.group
    })
  },
  viewTap: function() {
    wx.navigateTo({
      url: '../s-history/s-history?id=' + this.options.id + '&group=' + this.options.group + '&questionNumber=' + this.data.questionNumber
    })
  },
  viewTap2: function () {
    wx.redirectTo({
      url: '../s-history/s-history?id=' + this.options.id + '&group=' + this.options.group + '&questionNumber=' + this.data.questionNumber
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
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
          console.log(this.data.allQuesion)
        }
      }),
      this.setData({
        nextQuestion: parseInt(options.questionNumber) + 1
      })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})