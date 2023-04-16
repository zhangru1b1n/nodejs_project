<template>
    <div>
        <el-page-header @back="handleBack()" title="产品管理" content='编辑产品' />

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
                <el-button type="primary" @click="submitForm()">更改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, reactive,onMounted } from 'vue'
import upload from '@/util/upload.js'
import Upload from '@/components/upload/Upload.vue'

import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const route = useRoute()
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
const productForm = reactive({})
onMounted(() => {
    getData()
})
const getData = async () => {
    const result = await axios.put(`/adminapi/product/list/${route.params.id}`)
    console.log(result.data.data)
    // productForm = result.data.data
    Object.assign(productForm,result.data.data)
}
const handleBack = () => {
    router.back()
}
const handleChange = (uploadFile) => {
    productForm.cover = URL.createObjectURL(uploadFile)
    productForm.file = uploadFile
}

const submitForm = () => {
    productFormRef.value.validate(async (valid) => {
        if (valid) {
            const res = await upload("/adminapi/product/update", productForm)
            if (res.data.ActionType == 'ok') {
                router.push('/product-manage/productlist')
                // store.commit('changeuserInfo',res.data.data)
                ElMessage.success('编辑成功')
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