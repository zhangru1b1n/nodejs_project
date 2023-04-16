const mongoose = require('mongoose')
const UserType = {
    username:String,
    password:String,
    gender:Number,
    introduction:String,
    avater:String,
    role:Number //管理员1 编辑2
}
const UserModel = mongoose.model("user",new mongoose.Schema(UserType))
module.exports = UserModel