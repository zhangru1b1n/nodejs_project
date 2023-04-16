<template>
    <div>
        <el-carousel height="calc(100vh - 59px)" direction="vertical" :autoplay="false" v-if="loopList.length">
            <el-carousel-item v-for="item in loopList" :key="item._id">
                <div class="item" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }">
                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">
                                <h2>{{item.title}}</h2>
                            </div>
                        </template>
                        <div>{{ item.introduction }}</div>
                        <div style="margin-top: 20px;">{{ item.detail }}</div>
                        <div style="margin-top: 20px;">
                            更多信息,请访问:
                            <br>
                            http://zrb.com
                        </div>
                    </el-card>
                </div>
            </el-carousel-item>
        </el-carousel>
        <el-empty description="暂无数据" v-else />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const loopList = ref([])
onMounted(async () => {
    const result = await axios.get('/webapi/product/list')
    if (result.data.ActionType == 'ok') {
        loopList.value = result.data.data
    }
})
</script>

<style scoped>
.item {
    height: 100%;
    width: 100%;
    background-size: 100% 100%;
}
.box-card{
    height: 100%;
    width: 50%;
    background-color: rgba(255, 255, 255, 0.7);
}
</style>