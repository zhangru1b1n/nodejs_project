<template>
    <div class="navbar">
        <el-menu :default-active="route.fullPath"
         class="el-menu-demo" 
         mode="horizontal" 
         router>
            <el-menu-item index="/">首页</el-menu-item>            
            <el-menu-item index="/news">新闻中心</el-menu-item>
            <el-menu-item index="/product">产品与服务</el-menu-item>
            <el-menu-item index="" @click="handleLogin">登录</el-menu-item>
        </el-menu>
        <div class="right">门户官网</div>
    </div>
    
</template>

<script setup>
import { ref } from 'vue'
import {useRoute} from 'vue-router'
const route = useRoute()
const handleLogin = ()=>{
    window.location = "http://localhost:8080"
}
</script>

<style scoped lang="scss">
.navbar{
    position: sticky;
    top:0px;
    z-index:1000;
}
.right{
    position: fixed;
    top:0;
    right: 20px;
    width: 100px;
    line-height: 59px;
    text-align: center;
}
</style>