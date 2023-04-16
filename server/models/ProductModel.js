const mongoose = require('mongoose')
const ProductType = {
    title:String,
    introduction:String,
    detail:String,
    cover:String,
    editTime:Date
}
const ProductModel = mongoose.model("product",new mongoose.Schema(ProductType))
module.exports = ProductModel