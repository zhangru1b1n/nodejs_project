const UserModel = require('../../models/UserModel')

const UserService = {
    login:async ({username,password})=>{
        
        const result = await UserModel.find({
            username,password
        })
        return result
    },
    upload:async({_id,gender,username,avater,introduction})=>{
        if(avater){
            return UserModel.updateOne({_id},{
                gender,username,avater,introduction
            })
        }
        else{
            return UserModel.updateOne({_id},{
                gender,username,introduction
            })
        }
    },
    add:async({username,introduction,role,gender,avater,password})=>{
        return UserModel.create({
            username,introduction,role,gender,avater,password
        })
    },
    getList:async ()=>{
        return UserModel.find()
    },
    delList:async (_id)=>{
        return UserModel.deleteOne({_id})
    },
    changeUser:async (data)=>{
        const {_id,username,role,password,introduction,gender} = data
        return UserModel.updateOne({_id},{
            username,password,introduction,gender:Number(gender),role:Number(role)
        })
    }
}
module.exports = UserService