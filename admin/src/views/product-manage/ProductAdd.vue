<template>
    <div>
        <el-page-header icon="null" title="产品管理" content='添加产品' />
        <el-form ref="productFormRef" :model="productForm" status-icon :rules="productFormrRules" label-width="80px"
            class="demo-ruleForm">

            <el-form-item label="产品名称" prop="title">
                <el-input v-model="productForm.title" />
            </el-form-item>

            <el-form-item label="产品简要描述" prop="introduction">
                <el-input v-model="productForm.introduction" type="textarea" />
            </el-form-item>

            <el-form-item label="产品详细描述" prop="detail">
                <el-input v-model="productForm.detail" type="textarea" />
            </el-form-item>


            <el-form-item label="产品图片" prop="cover">
                <Upload :avater="productForm.cover" @uploadChange="handleChange" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm()">添加产品</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import upload from '@/util/upload.js'
import Upload from '@/components/upload/Upload.vue'

import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const productFormRef = ref()
const productFormrRules = reactive({
    title: [
        { required: true, message: '请输入产品名称', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入简介', trigger: 'blur' },
    ],
    detail: [
        { required: true, message: '请输入详细描述', trigger: 'blur' },
    ],
    cover: [
        { required: true, message: '请上传图片', trigger: 'blur' },
    ]
})
const productForm = reactive({
    title: "",
    introduction: "",
    detail: "",
    cover: "",
    file: null
})

const handleChange = (uploadFile) => {
    productForm.cover = URL.createObjectURL(uploadFile)
    productForm.file = uploadFile
}

const submitForm = () => {
    productFormRef.value.validate(async (valid) => {
        if (valid) {
            // console.log(productForm)
            const res = await upload("/adminapi/product/add",productForm)
            if(res.data.ActionType=='ok'){
                router.push('/product-manage/productlist')
                // store.commit('changeuserInfo',res.data.data)
                ElMessage.success('添加成功')
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