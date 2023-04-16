<template>
    <div>
        <el-card>
            <el-page-header icon="null" title="新闻管理" content='新闻列表' />
            <el-table :data="tableData" style="width: 100%;margin-top: 30px;">
                <el-table-column prop="title" label="标题" />
                <el-table-column label="分类">
                    <template #default="scope">
                        <div>
                            {{ scope.row.category == 1 ? "最新动态" : (scope.row.category == 2) ? '典型案例' : '通知公告' }}
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="是否发布">
                    <template #default="scope">
                        <div>
                            <el-switch @change="publishNews(scope.row)" v-model="scope.row.isPublish" class="ml-2"
                               :active-value="1" :inactive-value="0" style="--el-switch-on-color: #13ce66; " />
                        </div>
                    </template>
                </el-table-column>

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
                            <el-button type="success" circle @click="handlePriview(scope.row)" >
                                <el-icon><Star /></el-icon>
                            </el-button>

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

        <el-dialog v-model="dialogVisible" title="预览新闻">
        <div>
            <h2>{{previreData.title}}</h2>
            <div style="font-size: 12px;">
                {{ formatTime.getTime(previreData.titleeditTime) }}
            </div>
            <el-divider />
            <div v-html="previreData.content" class="htmlContent"></div>
        </div>
        </el-dialog>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import {Star,Delete,Edit} from '@element-plus/icons-vue'
import formatTime from '@/util/formatTime.js'
import { ElMessageBox } from 'element-plus'
import {useRouter} from 'vue-router'
onMounted(() => {
    getTableData()
})
const router = useRouter()
const tableData = ref([])
const previreData = ref({})
const dialogVisible = ref(false)
//获得列表数据
const getTableData = async () => {
    const result = await axios.get('/adminapi/news/list')
    console.log(result.data.data)
    tableData.value = result.data.data
}
//发布
const publishNews =async (row)=>{
    console.log(row.isPublish)
    await axios.post('/adminapi/news/list',row)
    getTableData()
    
}
//预览
const handlePriview = (row)=>{
    previreData.value = row
    dialogVisible.value =true
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
        const result = await axios.delete(`/adminapi/news/list/${row._id}`)
        if (result.data.ActionType == 'ok') {
            getTableData()
        }

    })
}

//编辑
const handleEdit = (row)=>{
    router.push(`/news-manage/editnews/${row._id}`)
}
</script>

<style scoped lang="scss">
::v-deep .htmlContent{
    img{
        max-width: 100%;
    }
}
</style>