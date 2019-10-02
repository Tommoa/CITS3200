//login

const cloud = require('wx-server-sdk')

// init cloud

// cloud.init({

//   env: 'cits3200-jtijd',     // environment id

//   traceUser: true,    //if can check in the concle

// })

exports.main = (event, context) => {

  console.log(event)

  console.log(context)

  // get WX Context，include OPENID、APPID、and UNIONID

  const wxContext = cloud.getWXContext()

  return {

    event,

    openid: wxContext.OPENID,

    appid: wxContext.APPID,

    unionid: wxContext.UNIONID,

  }

}