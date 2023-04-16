const NewsModel = require('../../models/NewsModel')

const NewsService = {
    add:async ({title,content,category,isPublish,cover,editTime})=>{
        
        const result = await NewsModel.create({
            title,content,category,isPublish,cover,editTime
        })
        return result
    },
    getList:async()=>{
        return NewsModel.find()
    },
    publishNews:async({_id,isPublish,editTime})=>{
        return NewsModel.updateOne({_id},{isPublish,editTime})
    },
    deleteNews:async({_id})=>{
        return NewsModel.deleteOne({_id})
    },
    getNews:async({_id})=>{
        return NewsModel.find({_id})
    },
    update:async({_id,title,content,category,cover,editTime})=>{
        if(cover){
            return NewsModel.updateOne({_id},{title,content,category,cover,editTime})
        }
        else{
            return NewsModel.updateOne({_id},{title,content,category,editTime})
        }
    }
}
module.exports = NewsService