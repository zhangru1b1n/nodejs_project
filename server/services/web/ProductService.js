const ProductModel = require('../../models/ProductModel')

const ProductService = {
    getList:async()=>{
        return ProductModel.find()
    }
}
module.exports = ProductService