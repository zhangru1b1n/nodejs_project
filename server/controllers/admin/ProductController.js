const JWT = require('../../util/JWT.js')
const ProductService = require('../../services/admin/ProductService')

const ProductController = {
    add:async(req,res)=>{
        const cover = `/productUploads/${req.file.filename}`
        const {title,introduction,detail} = req.body
        await ProductService.add({title,introduction,detail,cover,editTime:new Date()})
        res.send({
            ActionType:"ok",
        })
    },
    getList:async(req,res)=>{
        const result = await ProductService.getList()
        res.send({
            ActionType:"ok",
            data:result
        })
    },
    deleteList:async(req,res)=>{
        const result = await ProductService.deleteList({_id:req.params.id})
        res.send({
            ActionType:"ok",
        })
    },
    getProduct:async(req,res)=>{
        const result = await ProductService.getProduct({_id:req.params.id})
        res.send({
            ActionType:"ok",
            data:result[0]
        })
    },
    updateProduct:async(req,res)=>{
        const cover = req.file ? `/productUploads/${req.file.filename}` :''
        const {_id,title,introduction,detail,} = req.body
        const result = await ProductService.updateProduct({
            _id,title,introduction,detail,cover,editTime:new Date()
        })
        res.send({
            ActionType:"ok",
        })
    },
    
}
module.exports = ProductController