// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  async function getAccessWechatToken() {
    const result = await rp({
      url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appId=${wx8a5acf420d5ed0f7}&secret=${9887197bc7937eb89ae9033ec5b09ba2}`,
      method: 'GET'
    });

    //TODO:需要验证IP白名单失效问题（ip改变导致无法获取到token）
    console.info(result)
    let rbody = (typeof result === 'object') ? result : JSON.parse(result);
    return rbody;
  },
 
async function getWechatPosts(accessToken, offset, count) {
  let url = `https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=${accessToken}`
   var options = {
      method: 'POST',
      json: true,
      uri: url,
      body: {
        "type": "news",
        "offset": offset,
        "count": count
      }
    },
    const result = await rp(options)
    let rbody = (typeof result === 'object') ? result : JSON.parse(result);
    return rbody;
  }
  /**
 * 同步公众号文章至云数据库
 */
  async function syncWechatPosts(isUpdate) {
    let collection = "mini_posts"
    let accessToken = await getCacheAccessToken(1)
    var offset = 0
    var count = 10
    var isContinue = true
    while (isContinue) {
      var posts = await getWechatPosts(accessToken, offset, count)
      if (posts.item.length == 0) {
        isContinue = false
        break;
      }

      for (var index in posts.item) {
        //判断是否存在
        let existPost = await db.collection(collection).where(
          {
            uniqueId: posts.item[index].media_id,
            sourceFrom: "wechat"
          }).get();

        if (existPost.code) {
          continue;
        }
        if (!existPost.data.length) {

          var data = {
            uniqueId: posts.item[index].media_id,
            sourceFrom: "wechat",
            content: posts.item[index].content.news_item[0].content,
            author: posts.item[index].content.news_item[0].author,
            title: posts.item[index].content.news_item[0].title,
            defaultImageUrl: posts.item[index].content.news_item[0].thumb_url,
            createTime: posts.item[index].update_time,
            totalComments: 0,//总的点评数
            totalVisits: 100,//总的访问数
            totalZans: 50,//总的点赞数
            label: [],//标签
            classify: 0,//分类
            contentTyep: "html"
          }

          await db.collection(collection).add({
            data: data
          });
        }
        else {
          //不需要更新直接继续
          if (!isUpdate) {
            continue
          }

          let id = existPost.data[0]._id;
          await db.collection(collection).doc(id).set({
            data: {
              content: posts.item[index].content.news_item[0].content,
              author: posts.item[index].content.news_item[0].author,
              title: posts.item[index].content.news_item[0].title,
              defaultImageUrl: posts.item[index].content.news_item[0].thumb_url,
              createTime: posts.item[index].update_time
            }
          });

        }
      }

      offset = offset + count
    }
  }
}
  

  