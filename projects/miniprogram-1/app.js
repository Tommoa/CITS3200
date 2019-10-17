//app.js
App({
  onLaunch: function () {

    this.checkIsIPhoneX()

      if(!wx.cloud){
      console.error("cloud is wrong")
    } else{
      wx.cloud.init({
        traceUser: true,
        env: "cits3200-jtijd"
      })
    }

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  checkIsIPhoneX: function () {
    const self = this
    wx.getSystemInfo({
      success: function (res) {
        // if (res.model.search('iPhone X') != -1) {
        //   self.globalData.isIPX = true
        // }
        if (res.screenHeight / res.screenWidth > 1.78) {
          self.globalData.isIPX = true
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    isIPX: false,
    currentSurveyID: null
  }
})