const cloud = require('wx-server-sdk')
const{WXMINIUser,WXMINIMEssage} = require('wx-js-utils');

const appId = 'wx8a5acf420d5ed0f7'
const secret = '9887197bc7937eb89ae9033ec5b09ba2'
cloud.init()

exports.main = async (event, context) => {
  const {OPENID} = cloud.getWXContext();
  let wXMINUser = new WXMINIUser({
    appId,secret
  });
  
  let access_token = await wXMINUser.getAccessToken()

  const touser = OPENID
  const form_id = event.form_id
  const template_id = 'dqTgFLhHM_xlLUm-U6cwqfQ9bLl0i_lINoUqFnjcwPo'

  let wXMINIMessage = new WXMINIMEssage();
  let result = await wXMINIMessage.sendMessage({
    access_token,
    touser,
    form_id,
    template_id,
    data:{
      keyword1:
      {
        value:'xxxx'
      },
      keyword2:{
        value:'xxx'
      }
    },
    page:'/page/index/index'
  })
  return result
}