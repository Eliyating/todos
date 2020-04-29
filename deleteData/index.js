
const cloud = require('wx-server-sdk')

cloud.init()

let db = cloud.database();

exports.main = async (event, context) => {
  return await db.collection('todos').doc('79a2c43f5e955d710096f6481747d03d').remove();
}