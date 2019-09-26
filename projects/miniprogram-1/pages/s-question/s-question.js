// pages/s-question/s-question.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    radioItems: [
      { name: 'Choice 1', value: '0' },
      { name: 'Choice 2', value: '1', checked: true }
    ],
    checkboxItems: [
      { name: 'Choice 1', value: '0', checked: true },
      { name: 'Choice 2', value: '1' }
    ],
    isIPX: app.globalData.isIPX
  },
  radioChange: function (e) {
    console.log('radio change，value: ', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },
  checkboxChange: function (e) {
    console.log('checkbox change，value: ', e.detail.value);

    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
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

  bindViewTap: function () {
    wx.navigateTo({
      url: '../my/my'
    })
  },
  nextTap: function () {
    wx.redirectTo({
      url: '../s-final/final',
    })
  },
  viewTap: function () {
    wx.navigateTo({
      url: '../s-history/s-history'
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})