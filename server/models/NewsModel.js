const mongoose = require('mongoose')
const NewsType = {
    title:String,
    content:String,
    category:Number,
    cover:String,
    isPublish:Number,
    editTime:Date
}
const NewsModel = mongoose.model("news",new mongoose.Schema(NewsType))
module.exports = NewsModel