//用于校验token的时效性

const jsonwebtoken = require('jsonwebtoken')
const secrte = 'zrb'
const JWT = {
    //加密
    generate(value,expires){
        return jsonwebtoken.sign(value,secrte,{expiresIn:expires})
    },
    //解密
    verify(token){
        try {
            return jsonwebtoken.verify(token,secrte)
        } catch (error) {
            return false
        }
    }    
}

// console.log(token,JWT.verify(token));
module.exports = JWT