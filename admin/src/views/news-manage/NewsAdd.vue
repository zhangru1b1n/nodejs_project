<template>
    <div>
        <el-page-header icon="null" title="新闻管理" content='创建新闻' />

        <el-form ref="newsFormRef" :model="newsForm" status-icon :rules="newsFormrRules" label-width="80px"
            class="demo-ruleForm">

            <el-form-item label="标题" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <Editor @sendTxt='sendTxt'></Editor>
            </el-form-item>
            <el-form-item label="分类" prop="category">
                <el-select v-model="newsForm.category" class="m-2" placeholder="请选择角色">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
                <!-- <el-input v-model="newsForm.category" /> -->
            </el-form-item>
            <el-form-item label="上传图片" prop="cover">
                <Upload  :avater="newsForm.cover" @uploadChange="handleChange" />
            </el-form-item>

            <el-form-item>
                            <el-button type="primary" @click="submitForm()">添加新闻</el-button>
                        </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref,reactive } from 'vue'
import Editor from '@/components/Editor/Editor'
import upload from '@/util/upload.js'
import Upload from '@/components/upload/Upload.vue'
import {useRouter} from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const newsFormRef = ref()
const newsFormrRules = reactive({
    title: [
        { required: true, message: '请输入标题', trigger: 'blur' },
    ],
    content: [
        { required: true, message: '请输入内容', trigger: 'blur' },
    ],
    category: [
        { required: true, message: '请选择分类', trigger: 'blur' },
    ],
    cover: [
        { required: true, message: '请上传图片', trigger: 'blur' },
    ]
})

const newsForm = reactive({
    title:'',
    content:'',
    category:1, //1最新动态 2典型案例 3通知公告
    cover:'',
    file:null,
    isPublish:0  //0未发布 1发布   
})
const options = [
    {
        value: 1,
        label: '最新动态',
    },
    {
        value: 2,
        label: '典型案例',
    },
    {
        value: 3,
        label: '通知公告',
    }
]
const sendTxt = (txt)=>{
    newsForm.content= txt
}

const handleChange = (uploadFile)=>{
    newsForm.cover = URL.createObjectURL(uploadFile)
    newsForm.file = uploadFile
}

const submitForm = ()=>{
    newsFormRef.value.validate(async (valid)=>{
        if(valid){    
            // console.log(newsForm)        
            const res = await upload("/adminapi/news/add",newsForm)
            if(res.data.ActionType=='ok'){
                router.push('/news-manage/newslist')
                // store.commit('changeuserInfo',res.data.data)
                ElMessage.success('添加成功')
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