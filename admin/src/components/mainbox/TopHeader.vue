<template>
    <el-header>
        <div class="left">
            <el-icon v-if="!$store.state.isCollapse" @click="changeCollapse">
                <ArrowLeftBold />
            </el-icon>
            <el-icon v-else @click="changeCollapse">
                <ArrowRightBold />
            </el-icon>
            <span>门户管理系统</span>
        </div>
        <div class="right">

            <el-dropdown>
                <span class="el-dropdown-link">
                    <span>欢迎 {{ $store.state.userInfo.username }} 回来</span>
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="()=>{
                            router.push('/center')
                        }">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="exit">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'
import {
    ArrowRightBold, ArrowLeftBold
} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
const store = useStore()
const router = useRouter()
const changeCollapse = () => {
    store.commit('changeCollapse')
}

const  exit = ()=>{
    localStorage.removeItem('token')
    store.commit('clearUserInfo')
    router.push('/login')
}
</script>

<style scoped lang="scss">
.el-header {
    display: flex;
    justify-content: space-between;
    // background-color: #2d3a4b;
    // text-align: center;
    line-height: 60px;
    height: 60px;

    .left{
        display: flex;
        i{
            margin: auto;
        }
    }
    .right{
        margin-top: 30px;
    }
}
:focus {
  outline: 0 !important;
}
</style>