//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Welcome to UWA Survey Tool',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    surveyid: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../my/my'
    })
  },
  getID: function(e){
    this.setData({
      surveyid: e.detail.value
    })
  },
  searchSurveyFunc: function(){
    if(this.data.surveyid != ''){
      wx.navigateTo({
        url: '../survey/survey?id=' + this.data.surveyid
      })
    }
  },
  onLoad: function () {
    var openid
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        //console.log('callFunction test result: ', res.result)
        openid = res.result.openid
      }
    })
    wx.getUserInfo({
      success: function (res){
        var logged
        var information = res.userInfo
        const db = wx.cloud.database()
        const userInfo = db.collection('usr_information')
        // console.log('userInfo is : ', information)
        userInfo.where({ openid: openid }).get({
          success: function (res) {
            //console.log(res.data)
            //console.log(res.data.length)
            logged = res.data.length
            //console.log(logged)
            if (logged == 0) {
              userInfo.add({
                data: {
                  Location: information.city,
                  Gender: information.gender,
                  
                },
                success: function (res) {
                  // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                  //console.log("data is" ,res)
                },
                fail: console.error
              })
            }
          }
        })
        
      }
    })
  }
  
  
})
