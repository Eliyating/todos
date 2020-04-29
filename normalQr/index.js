
const {
  WXMINIUser,
  WXMINIQR
} = require('wx-js-utils');

const appId ='wx8a5acf420d5ed0f7';
const secret ='9887197bc7937eb89ae9033ec5b09ba2';

const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {

 //获取小程序码，A接口
  let wXMINIUser = new WXMINIUser({
    appId,
    secret
  });

  //获取access_token
  let access_token = await wXMINIUser.getAccessToken();
  let wXMINIQR = new WXMINIQR();
  let qrResult = await wXMINIQR.getQR({
    access_token,
    path: 'pages/index/index'
  });

  //上传云存储，返回结果是供小程序使用的fileID
  return await cloud.uploadFile({
    cloudPath: 'normalQr.png',
    fileContent: qrResult
  }) 
}