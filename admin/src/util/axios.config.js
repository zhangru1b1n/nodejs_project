import axios from "axios";


axios.interceptors.request.use(function (config){
    //发送ajax前给后端token
    const token = localStorage.getItem('token')
    config.headers.Authorization=`Bearer ${token}`
    return config;
},function (error){
    return Promise.reject(error)
})

axios.interceptors.response.use((res)=>{
    //返回时设置token
    // console.log(res)
    res.headers.authorization && localStorage.setItem('token',res.headers.authorization)
    return res
},(error)=>{
    //如果token过期则返回登录界面
    if(error.response.status==401){
        localStorage.removeItem("token")
        window.location.href = "#/login"
    }
    return Promise.reject(new Error('faile'))
})