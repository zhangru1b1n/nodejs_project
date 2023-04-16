<template>
    <div>
        <el-page-header icon="null" title="用户管理" content='添加用户'/>

        <el-form ref="userFormRef" :model="userForm" status-icon :rules="userFormrRules" label-width="80px"
                        class="demo-ruleForm">

                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userForm.username" />
                        </el-form-item>

                        <el-form-item label="密码" prop="password">
                            <el-input v-model="userForm.password" type="password" />
                        </el-form-item>

                        <el-form-item label="角色" prop="role">
                            <el-select v-model="userForm.role" class="m-2" placeholder="请选择角色">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="简介" prop="introduction">
                            <el-input type="textarea" v-model="userForm.introduction" />
                        </el-form-item>

                        <el-form-item label="头像" prop="avater">
                            <Upload  :avater="userForm.avater" @uploadChange="handleChang" />
                        </el-form-item>


                        <el-form-item>
                            <el-button type="primary" @click="submitForm()">添加用户</el-button>
                        </el-form-item>
                    </el-form>


    </div>
</template>

<script setup>
import { ref ,reactive} from 'vue'
import { useStore } from 'vuex'
import {useRouter} from 'vue-router'
import { ElMessage } from 'element-plus'
import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload.js'
const store = useStore()
const router = useRouter()
const userFormRef = ref()
const options = [
    {
        value: 1,
        label: '管理员',
    },
    {
        value: 2,
        label: '编辑',
    }
]
const userFormrRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    role: [
        { required: true, message: '请选择角色', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入简介', trigger: 'blur' },
    ],
    avater: [
        { required: true, message: '请输入头像', trigger: 'blur' },
    ],
})
const userForm = reactive({
    username:'',
    password:'',
    role:2,
    introduction:'',
    avater:'',
    file:null,
    gender:0
})
const handleChang = (uploadFile)=>{
    userForm.avater = URL.createObjectURL(uploadFile)
    userForm.file = uploadFile
}


const submitForm = ()=>{
    userFormRef.value.validate(async (valid)=>{
        if(valid){   
            console.log(userForm)         
            const res = await upload("/adminapi/user/add",userForm)
            if(res.data.ActionType=='ok'){
                ElMessage.success('添加成功')
                router.push('/user-manage/userlist')
            }                        
        }
    })
}
</script>

<style scoped lang="scss">
.demo-ruleForm{
    margin-top:30px;
}
</style>