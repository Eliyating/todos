
const cloud = require('wx-server-sdk')

cloud.init()

let db = cloud.database();
exports.main = async (event, context) => {
  return await db.collection('todos').doc('3a573aaa5e83561a002b71ce537f6020').update({
    data:{
      time:123,
      price:321
    }
  })
}