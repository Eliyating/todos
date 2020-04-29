// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got')
cloud.init({
  env:"eliyating616-ijpme"
})

// 云函数入口函数
exports.main = async (event, context) => {
  let response = await got('https://wechat.com')
  return response.body;
}