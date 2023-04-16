<template>
    <div>
        <el-card>
            <el-page-header icon="null" title="用户管理" content='用户列表' />
            <el-table :data="tableData" style="width: 100%;margin-top: 30px;" >
            <el-table-column prop="username" label="用户名" width="180" />

            <el-table-column label="头像">
                <template #default="scope">
                    <div v-if="scope.row.avater">
                        <el-avatar :size="50" :src="'http://localhost:3000' + scope.row.avater"></el-avatar>
                    </div>
                    <div v-else>
                        <el-avatar :size="50"
                            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="身份">
                <template #default="scope">

                    <el-tag class="ml-2" type="warning">{{ scope.row.role === 1 ? '管理员' : '编辑' }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        </el-card>
        


        <el-dialog v-model="dialogFormVisible" title="编辑用户">
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
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>

                <el-form-item label="个人简介" prop="introduction">
                    <el-input type="textarea" v-model="userForm.introduction" />
                </el-form-item>

            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="confirmChange">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const tableData = ref([])
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const userForm = ref({})
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
    ]
})
onMounted(() => {
    getTableData()
})
//获得列表数据
const getTableData = async () => {
    const result = await axios.get('/adminapi/user/list')
    console.log(result.data.data)
    tableData.value = result.data.data
}
//编辑
const handleEdit = (row) => {
    userForm.value = { ...row }
    dialogFormVisible.value = true
}
//删除
const handleDelete = (row) => {
    ElMessageBox.confirm(
        '你确定要删除吗',
        {
            confirmButtonText: '确定',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    ).then(async () => {

        const result = await axios.delete(`/adminapi/user/list/${row._id}`)
        if (result.data.ActionType == 'ok') {
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
            getTableData()
        }

    })
}

//确定修改
const confirmChange = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            const result = await axios.post('/adminapi/user/list', userForm.value)
            if (result.data.ActionType == 'ok') {
                ElMessage({
                    type: 'success',
                    message: '编辑成功',
                })
                dialogFormVisible.value = false
                getTableData()
            }
        }
    })

}
</script>

<style scoped lang="scss"></style>