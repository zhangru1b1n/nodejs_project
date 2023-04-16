<template>
    <div>
        <el-row :gutter="0">
            <el-col :span="17" :offset="1">
                <div>
                    <h2>{{ newsInfo.title }}</h2>
                    <div class="time">{{ formatTime.getTime(newsInfo.editTime) }}</div>
                    <el-divider>
                        <el-icon><star-filled /></el-icon>
                    </el-divider>

                    <div v-html="newsInfo.content"></div>
                </div>
            </el-col>

            <el-col :span="4" :pull="1" :offset="1">
                <el-card class="box-card" style="margin-left:30px">
                    <template #header>
                        <div class="card-header">
                            <span style="font-size: 16px;font-weight: bold;">最近新闻</span>      
                        </div>
                    </template>
                    <div v-for="item in topList" :key="item._id" class="text item" style="padding:6px" @click="handleChange(item._id)">
                        {{ item.title }}
                        <div class="time">
                            {{ formatTime.getTime(item.editTime) }}
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import axios from 'axios'
import formatTime from "@/util/formatTime.js"
import { StarFilled } from '@element-plus/icons-vue'
const route = useRoute()
const router = useRouter()
const newsInfo = ref({})
const topList = ref([])
watchEffect(async () => {
    if(!route.params.id) return;
    let res = await axios.get(`/webapi/news/getNews/${route.params.id}`)
    let result = await axios.get(`/webapi/news/topList?limit=4`)
    if (res.data.ActionType == 'ok') {
        newsInfo.value = res.data.data
    }
    if (result.data.ActionType == 'ok') {
        topList.value = result.data.data
    }
})
const handleChange = (id)=>{
    router.push(`/newsdetail/${id}`)
}
</script>

<style scoped lang="scss">
.el-row {
    margin-top: 30px;
}

.time {
    font-size: 13px;
    color: grey;
}
</style>