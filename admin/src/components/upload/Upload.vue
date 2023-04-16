<template>
    <el-upload class="avatar-uploader"
        action=""
        :show-file-list="false"  
        :auto-upload="false"
        :on-change="handleChang">

        <img v-if="props.avater" :src="uploadAvater" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import { ref,defineEmits,defineProps ,computed} from 'vue'
const emit = defineEmits('uploadChange')
const props = defineProps(['avater'])
const handleChang = (uploadFile)=>{
    emit('uploadChange',uploadFile.raw)
}
const uploadAvater = computed(()=>{    
    return props.avater.includes('blob') ? props.avater :'http://localhost:3000'+props.avater 
})
</script>

<style scoped lang="scss">
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
::v-deep  .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep  .el-upload:hover {
  border-color: var(--el-color-primary);
}
 
::v-deep .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>