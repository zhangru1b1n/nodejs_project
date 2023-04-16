<template>
    <div class="container">
        <div class="news-header" :style="{ backgroundImage: `url(${require('@/assets/下载.jpg')}` }"></div>
        <div class="search">
            <el-popover placement="bottom" title="检索结果" width="50%" :visible="visible">
                <template #reference>
                    <el-input v-model="searchText" class="w-50 m-2" placeholder="请输入新闻关键字" :prefix-icon="Search"
                        type="search" size="large" @input="handleChange" @blur="visible = false" />
                </template>
                <div v-if="searchNewsList.length">
                    <div class="search-item" v-for="item in searchNewsList" :key="item._id"
                        @click="handleChangePage(item._id)">
                        {{ item.title }}
                    </div>
                </div>
                <div v-else>
                    <el-empty description="空空如也" :image-size="50" />
                </div>
            </el-popover>
        </div>
        <div class="topNews">
            <el-row :gutter="20">
                <el-col :span="24 / topNewsList.length"   v-for="item in topNewsList" :key="item._id">
                    <div>
                        <el-card @click="handleChangePage(item._id)" :body-style="{ padding: '0px' }" shadow="hover">
                            <div class="image" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }">
                            </div>
                            <div style="padding: 14px">
                                <span>{{ item.title }}</span>
                                <div class="bottom">
                                    <time class="time">{{ formatTime.getTime(item.editTime) }}</time>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-col>

            </el-row>
        </div>

        <el-tabs v-model="activeName" class="demo-tabs" style="margin:20px">
            <el-tab-pane :label="item.label" :name="item.name" v-for="item in tablist" :key="item.name">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <div   v-for="data in tabNews[item.name]" :key="data._id" style="padding:10px">
                            <el-card @click="handleChangePage(data._id)" :body-style="{ padding: '0px' }" shadow="hover">
                                <div class="tab-image"
                                    :style="{ backgroundImage: `url(http://localhost:3000${data.cover})` }"></div>
                                <div style="padding: 14px;float: left;">
                                    <span>{{ data.title }}</span>
                                    <div class="bottom">
                                        <time class="tab-time">{{ formatTime.getTime(data.editTime) }}</time>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-timeline>
                            <el-timeline-item v-for="(activity, index) in tabNews[item.name]" :key="index"
                                :timestamp="formatTime.getTime(activity.editTime)">
                                {{ activity.title }}
                            </el-timeline-item>
                        </el-timeline>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        <el-backtop />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { Search } from '@element-plus/icons-vue'
import formatTime from "@/util/formatTime.js"
import {useRouter} from 'vue-router'
import _ from 'lodash'
const activeName = ref(1)
const router = useRouter()
onMounted(async () => {
    const result = await axios.get('/webapi/news/list')
    newsList.value = result.data.data
})
const newsList = ref([])
const searchNewsList = computed(() => {
    return searchText.value ? newsList.value.filter(item => {
        return item.title.includes(searchText.value)
    }) : []
})
const topNewsList = computed(() => {
    return newsList.value.slice(0, 4)
})

const tabNews = computed(() => {
    return _.groupBy(newsList.value, item => item.category)
})
const tablist = [
    {
        label: "最新动态",
        name: 1
    },
    {
        label: "典型案例",
        name: 2
    },
    {
        label: "通知公告",
        name: 3
    }
]
const searchText = ref('')
const visible = ref(false)
const handleChange = () => {
    // if(!searchText.value){
    //     searchNewsList.value = []
    // }
    visible.value = true

}
const handleChangePage = (id)=>{
    router.push(`/newsdetail/${id}`)
}
</script>

<style scoped lang="scss">
.container {
    position: relative;
}

.image {
    width: 100%;
    // overflow: hidden;
    height: 200px;
    // background-attachment: fixed;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.news-header {
    width: 100%;
    // overflow: hidden;
    height: 400px;
    // background-attachment: fixed;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.search {
    position: absolute;
    top: 295.5px;
    // left: 300px;
    width: 100%;
    text-align: center;

    .el-input {
        width: 50%;
    }
}

.search-item {
    line-height: 50px;

    &:hover {
        background: whitesmoke;
        color: red
    }
}

.time {
    font-size: 14px;
    color: grey;
}

.topNews {
    margin: 20px;
}

.tab-image {

    width: 200px;
    // overflow: hidden;
    height: 100px;
    // background-attachment: fixed;
    background-size: 100% 100%;
    float: left;
    background-repeat: no-repeat;
}

.tab-time {
    font-size: 14px;
    color: grey;
}
</style>