<template>
    <div>
        <el-page-header icon="null" title="门户管理系统" content='个人中心'>

        </el-page-header>

        <el-row :gutter="20" class="box">
            <el-col :span="6">
                <el-card shadow="always" class="card">
                    <el-avatar :size="100" :src="avaterUrl" />
                    <h3>{{ store.state.userInfo.username }}</h3>
                    <h5>{{ store.state.userInfo.role == 1 ? '管理员' : '编辑' }}</h5>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card shadow="always">
                    <template #header>
                        <div class="card-header">
                            <span>个人信息</span>
                        </div>
                    </template>
                    <el-form ref="userFormRef" :model="userForm" status-icon :rules="userFormrRules" label-width="80px"
                        class="demo-ruleForm">

                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userForm.username" />
                        </el-form-item>

                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="userForm.gender" class="m-2" placeholder="请选择性别">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="简介" prop="introduction">
                            <el-input type="textarea" v-model="userForm.introduction" />
                        </el-form-item>

                        <el-form-item label="头像" prop="avater">
                            <Upload  :avater="userForm.avater" @uploadChange="handleChange" />
                        </el-form-item>


                        <el-form-item>
                            <el-button type="primary" @click="submitForm()">更新</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

import axios from 'axios'
import upload from '@/util/upload.js'
import Upload from '@/components/upload/Upload.vue'
const store = useStore()
const { username, gender, introduction, avater } = store.state.userInfo

const avaterUrl = computed(() => {
    return store.state.userInfo.avater ? 'http://localhost:3000'+store.state.userInfo.avater : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

const userFormRef = ref()
const userFormrRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入简介', trigger: 'blur' },
    ],
    avater: [
        { required: true, message: '请输入头像', trigger: 'blur' },
    ],
})

const userForm = reactive({
    username,
    gender,
    introduction,
    avater,
    file:null
})

const options = [
    {
        value: 0,
        label: '保密',
    },
    {
        value: 1,
        label: '男',
    },
    {
        value: 2,
        label: '女',
    }
]


//每次处理完图片后的回调
const handleChange = (uploadFile)=>{
    userForm.avater = URL.createObjectURL(uploadFile)
    userForm.file = uploadFile
}

const submitForm = ()=>{
    userFormRef.value.validate(async (valid)=>{
        if(valid){            
            const res = await upload("/adminapi/user/upload",userForm)
            if(res.data.ActionType=='ok'){
                store.commit('changeuserInfo',res.data.data)
                ElMessage.success('更新成功')
            }                        
        }
    })
}
</script>




<style scoped lang="scss">
.box {
    margin-top: 20px;

    .card {
        text-align: center;
    }
}


</style>