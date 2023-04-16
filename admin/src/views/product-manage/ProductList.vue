<template>
    <div>
        <el-card>
            <el-page-header icon="null" title="产品管理" content='产品列表' />
            <el-table :data="tableData" style="width: 100%;margin-top: 30px;">
                <el-table-column prop="title" label="产品名称" />
                <el-table-column prop="introduction" label="简要描述" />

                <el-table-column label="更新时间">

                    <template #default="scope">
                        <div>
                            {{ formatTime.getTime(scope.row.editTime) }}
                        </div>
                    </template>
                </el-table-column>


                <el-table-column label="操作">
                    <template #default="scope">
                        <div>

                            <el-button  circle @click="handleEdit(scope.row)">
                                <el-icon><Edit /></el-icon>
                            </el-button>

                            <el-button type="danger" circle @click="handleDelete(scope.row)" >
                                <el-icon><Delete /></el-icon>
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>


        </el-card>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import {Delete,Edit} from '@element-plus/icons-vue'
import formatTime from '@/util/formatTime.js'
import { ElMessageBox } from 'element-plus'
import {useRouter} from 'vue-router'
const router = useRouter()
onMounted(() => {
    getTableData()
})
const tableData = ref([])
//获得列表数据
const getTableData = async () => {
    const result = await axios.get('/adminapi/product/list')
    console.log(result.data.data)
    tableData.value = result.data.data
}

const handleEdit = (row)=>{
    router.push(`/product-manage/editproduct/${row._id}`)
}

//删除
const handleDelete = async(row)=>{
    ElMessageBox.confirm(
        '你确定要删除吗',
        {
            confirmButtonText: '确定',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    ).then(async () => {
        const result = await axios.delete(`/adminapi/product/list/${row._id}`)
        if (result.data.ActionType == 'ok') {
            getTableData()
        }

    })
}
</script>

<style scoped lang="scss"></style>