
const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {
  const fileId = ['cloud://eliyating616-ijpme.656c-eliyating616-ijpme-1301669748/img/主页4.png']
  return await cloud.getTempFileURL({
    fileList:fileId
  })
}