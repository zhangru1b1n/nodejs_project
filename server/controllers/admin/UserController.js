const JWT = require('../../util/JWT.js')
const UserService = require('../../services/admin/UserService')

const UserController = {
    login:async (req,res)=>{
        const result = await UserService.login(req.body)
        if(result.length==0){
            res.send({
                code:-1,
                error:"用户名密码不匹配"
            })
        }
        else{
            //设置token返回给前端
            const token = JWT.generate({
                _id:result[0]._id,
                username:result[0].username
            },"1d") 
            res.header("Authorization",token)
            res.send({
                ActionType:"OK",
                data:{
                    username:result[0].username,
                    gender:result[0].gender?result[0].gender:0,
                    introduction:result[0].introduction,
                    avater:result[0].avater,
                    role:result[0].role //管理员1 编辑2
                }
            })
        }
    },
    upload:async(req,res)=>{
        const token = req.headers["authorization"].split(" ")[1]
        const {username,introduction,gender} = req.body
        const payload = JWT.verify(token)
        const avater = req.file ? `/avaterUploads/${req.file.filename}`:""
        const result = await UserService.upload({_id:payload._id,username,introduction,gender:Number(gender),avater})
        console.log(result)
        if(result.acknowledged){
            if(avater){
                res.send({
                    ActionType:"ok",
                    data:{
                        username,introduction,gender:Number(gender),avater
                    }
                })
            }
            else{
                res.send({
                    ActionType:"ok",
                    data:{
                        username,introduction,gender:Number(gender)
                    }
                })
            }
            
        }
        
    },
    add:async(req,res)=>{
        const {username,introduction,gender,role,password} = req.body
        const avater = `/avaterUploads/${req.file.filename}`
        const result = await UserService.add({username,password,introduction,role:Number(role),gender:Number(gender),avater})
        res.send({
            ActionType:"ok",
        })
    },
    getList:async(req,res)=>{
        const result = await UserService.getList()
        res.send({
            ActionType:"ok",
            data:result
        })
    },
    delList:async(req,res)=>{
        const result = await UserService.delList(req.params.id)      
        res.send({
            ActionType:"ok",
        })
    },
    changeUser:async(req,res)=>{
        const result = await UserService.changeUser(req.body)      
        res.send({
            ActionType:"ok",
        })
    },
}
module.exports = UserController