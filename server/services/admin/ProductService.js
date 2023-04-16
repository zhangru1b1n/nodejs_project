const ProductModel = require('../../models/ProductModel')

const ProductService = {
    add:async ({title,introduction,detail,cover,editTime})=>{
        
        const result = await ProductModel.create({
            title,introduction,detail,cover,editTime
        })
        return result
    },
    getList:async()=>{
        return ProductModel.find()
    },
    deleteList:async({_id})=>{
        return ProductModel.deleteOne({_id})
    },
    getProduct:async({_id})=>{
        return ProductModel.find({_id})
    },
    updateProduct:async({_id,title,introduction,detail,cover,editTime})=>{
        if(cover){
            return ProductModel.updateOne({_id},{title,introduction,detail,cover,editTime})
        }
        else{
            return ProductModel.updateOne({_id},{title,introduction,detail,editTime})
        }
    }
}
module.exports = ProductService