const NewsModel = require('../../models/NewsModel')

const NewsService = {
    getList:async()=>{
        return NewsModel.find({isPublish:1}).sort({editTime:-1})
    },
    getNews:async(_id)=>{
        return NewsModel.find({_id})
    },
    getTopNews:async(limit)=>{
        return NewsModel.find({isPublish:1}).limit(limit).sort({editTime:-1})
    },
}
module.exports = NewsService