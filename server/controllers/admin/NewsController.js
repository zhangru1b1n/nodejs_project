const JWT = require('../../util/JWT.js')
const NewsService = require('../../services/admin/NewsService')

const NewsController = {
    add:async(req,res)=>{
        console.log('hello')
        const cover = `/newsUploads/${req.file.filename}`
        const {title,content,category,isPublish} = req.body
        console.log(typeof title,content,category,isPublish,cover,'sv');
        await NewsService.add({
            title,content,category:Number(category),
            isPublish:Number(isPublish),cover,editTime:new Date()})
        res.send({
            ActionType:"ok",
        })
    },
    getList:async(req,res)=>{
        const result = await NewsService.getList()
        res.send({
            ActionType:"ok",
            data:result
        })
    },
    publishNews:async(req,res)=>{
        const {_id,isPublish} = req.body
        const result = await NewsService.publishNews({
            _id,isPublish:Number(isPublish),editTime:new Date()
        })
        res.send({
            ActionType:"ok",
        })
    },
    deleteNews:async(req,res)=>{
        const result = await NewsService.deleteNews({
            _id:req.params.id
        })
        res.send({
            ActionType:"ok",
        })
    },
    getNews:async(req,res)=>{
        const result = await NewsService.getNews({
            _id:req.params.id
        })
        res.send({
            ActionType:"ok",
            data:result[0]
        })
    },
    update:async(req,res)=>{
        const cover = req.file ? `/newsUploads/${req.file.filename}` :''
        const {_id,title,content,category} = req.body
        const result = await NewsService.update({
            _id,title,content,category,cover,editTime:new Date()
        })
        res.send({
            ActionType:"ok",
        })
    },
}
module.exports = NewsController