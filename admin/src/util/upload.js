import axios from "axios"



const upload = (path, userForm) => {
    //因为涉及到了文件上传 所以需要使用FormData对象
    const params = new FormData()
    for (let i in userForm) {
        params.append(i, userForm[i])
    }
    //文件上传给后端需要加header
    return axios.post(path, params, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}
export default upload