<template>
    <div>
        <el-page-header icon="null" title="门户管理系统">
            <template #content>
                <span class="text-large font-600 mr-3"> 首页 </span>
            </template>
        </el-page-header>


        <el-card shadow="always" class="card">
            <el-row>
                <el-col :span="4">
                    <el-avatar :size="100" :src="avater" />
                </el-col>
                <el-col :span="20">
                    <h3 style="line-height: 100px;">欢迎{{store.state.userInfo.username  }}回来,{{ welcomeText }}</h3>
                </el-col>
            </el-row>
        </el-card>

        <el-card shadow="always" class="card">
            <template #header>
                <div class="card-header">
                    <span>公司产品</span>
                </div>
            </template>

            <el-carousel :interval="4000" type="card" height="400px">
                <el-carousel-item v-for="item in productList" :key="item.id">
                    <div>
                        <img :src="'http://localhost:3000'+item.cover" style="width: 100%;height: 400px;">
                        
                    </div>
                </el-carousel-item>
            </el-carousel>
        </el-card>
    </div>
</template>

<script setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { UserFilled } from '@element-plus/icons-vue'
const productList = ref([])
onMounted(async () => {
    const result = await axios.get('/adminapi/product/list')
    if(result.data.ActionType=='ok'){
        console.log(result.data.data)
        productList.value = result.data.data
    }
})
const store = useStore()
const avater = computed(()=>{
    return store.state.userInfo.avater ? 'http://localhost:3000'+store.state.userInfo.avater: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})
const welcomeText = computed(()=>{
    return new Date().getHours()< 12 ? '开心每一天' : '你可能有点累了,喝杯咖啡提提神吧' 
})
</script>

<style scoped lang="scss">
.card {
    margin-top: 30px;
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 400px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>