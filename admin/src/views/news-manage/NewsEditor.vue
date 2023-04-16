<template>
    <div>
        <el-page-header @back="handleBack()" title="新闻管理" content='编辑新闻' />

        <el-form ref="newsFormRef" :model="newsForm" status-icon :rules="newsFormrRules" label-width="80px"
            class="demo-ruleForm">

            <el-form-item label="标题" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <Editor @sendTxt='sendTxt' :txt="newsForm.content" v-if="newsForm.content"></Editor>
            </el-form-item>
            <el-form-item label="分类" prop="category">
                <el-select v-model="newsForm.category" class="m-2" placeholder="请选择角色">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <!-- <el-input v-model="newsForm.category" /> -->
            </el-form-item>
            <el-form-item label="上传图片" prop="cover">
                <Upload :avater="newsForm.cover" @uploadChange="handleChange" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm()">更改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, reactive } from 'vue'
import Editor from '@/components/Editor/Editor'
import { useRoute, useRouter } from 'vue-router'
import upload from '@/util/upload.js'
import Upload from '@/components/upload/Upload.vue'
import { ElMessage } from 'element-plus'
const route = useRoute()
const router = useRouter()
console.log(route.params.id)

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
const newsFormRef = ref()
const newsForm = ref({})
const sendTxt = (txt) => {
    newsForm.value.content = txt
}
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
const handleChange = (uploadFile) => {
    newsForm.value.cover = URL.createObjectURL(uploadFile)
    newsForm.value.file = uploadFile
}
onMounted(() => {
    getData()
})
const getData = async () => {
    const result = await axios.put(`/adminapi/news/list/${route.params.id}`)
    console.log(result.data.data)
    newsForm.value = result.data.data
}
const handleBack = () => {
    router.back()
}

const submitForm = () => {
    newsFormRef.value.validate(async (valid) => {
        if (valid) {
            console.log(newsForm)
            const res = await upload("/adminapi/news/update", newsForm.value)
            if (res.data.ActionType == 'ok') {
                router.push('/news-manage/newslist')
                // store.commit('changeuserInfo',res.data.data)
                ElMessage.success('更改成功')
            }
        }
    })
}
</script>

<style scoped lang="scss">
.demo-ruleForm {
    margin-top: 30px;
}
</style>