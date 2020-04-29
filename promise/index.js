// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
var rp = require('request-promise');
// 云函数入口函数
exports.main = async (event, context) => {
  return rp(`http://www.liulongbin.top:3005/api/getnewslist?key=0df993c66c0c636e29ecbb5344252a4a&start=${event.start}&count=${event.count}`).then(function (res) {
    console.log(res);
    return res;
  }).catch(function (err) {
    console.error(err);
  })
}
