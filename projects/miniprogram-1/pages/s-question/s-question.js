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
    mcAnswer: [true, false, false, false, false],
    rankAns:[0,0,0,0,0,0,0,0,0],
    rankNo:1,
    date: "2019-10-01",

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

    var mcAnswer = this.data.mcAnswer;
    for (var i = 0, len = mcAnswer.length; i < len; ++i) {
      mcAnswer[i] = i == e.detail.value;
      if (mcAnswer[i] == true){
        app.globalData.answer[this.data.questionNumber] = i;
      }
    }

    this.setData({
      mcAnswer: mcAnswer
    });
  },
  radioChangeRank: function (e) {
    console.log('radio change，value: ', e.detail.value);
    var rankAns = this.data.rankAns;
    rankAns[e.detail.value] = this.data.rankNo;
    this.data.rankNo = this.data.rankNo+1;
    app.globalData.answer[this.data.questionNumber] = rankAns;
      
    this.setData({
      rankAns: rankAns
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
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    app.globalData.answer[this.data.questionNumber] = e.detail.value;
  },
  goNextQuestion: function() {
    console.log(this.data.questionNumber)
    // app.globalData.answer[this.data.questionNumber] = '111'
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
      url: '../s-history/s-history?id=' + this.options.id + '&group=' + this.options.group + '&questionNumber=-1'
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
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
    app.globalData.answer[this.data.questionNumber] = 1;
      
  },
  input_answer: function (e) {
    app.globalData.answer[this.data.questionNumber] =e.detail.value
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