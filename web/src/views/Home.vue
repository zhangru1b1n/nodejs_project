<template>
    <div class="container">
        <el-carousel height="calc(100vh - 59px)">
            <el-carousel-item :key="1">
                <div :style="{backgroundImage:`url(${require('@/assets/u=1679095755,879545411&fm=253&fmt=auto&app=138&f=JPEG.webp')}`}"></div>
            </el-carousel-item>

            <el-carousel-item :key="2">
                <div :style="{backgroundImage:`url(${require('@/assets/u=1972414519,980098271&fm=253&fmt=auto&app=120&f=JPEG.webp')}`}"></div>
            </el-carousel-item>

            <el-carousel-item :key="3">
                <div :style="{backgroundImage:`url(${require('@/assets/u=2976844032,530174792&fm=253&fmt=auto&app=120&f=JPEG.webp')}`}"></div>
            </el-carousel-item>
        </el-carousel>
        <div class="center">互联网+时代</div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

</script>

<style scoped lang="scss">
    .el-carousel div{
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
    }
    .container{
        position:relative;
    }
    .center{
        position: absolute;
        font-size: 60px;
        color:white;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
</style>