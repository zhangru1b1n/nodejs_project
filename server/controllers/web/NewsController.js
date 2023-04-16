const JWT = require('../../util/JWT.js')
const NewsService = require('../../services/web/NewsService')

const NewsController = {
    getList:async(req,res)=>{
        const result = await NewsService.getList()
        res.send({
            ActionType:"ok",
            data:result
        })
    },
    getNews:async(req,res)=>{
        const result = await NewsService.getNews(req.params.id)
        res.send({
            ActionType:"ok",
            data:result[0]
        })
    },
    getTopNews:async(req,res)=>{
        const result = await NewsService.getTopNews(req.query.limit)
        res.send({
            ActionType:"ok",
            data:result
        })
    },

}
module.exports = NewsController