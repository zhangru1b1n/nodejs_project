<template>
  <div id="div1">

  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits,defineProps } from 'vue'
import E from 'wangeditor'
const emit = defineEmits(['sendTxt'])
const props = defineProps(['txt'])
onMounted(() => {
  const editor = new E('#div1')
  editor.create()
  props.txt && editor.txt.html(props.txt)
  editor.config.onchange = function (newHtml) {
    //   console.log( newHtml);
    emit("sendTxt", newHtml)
  };
})

</script>

<style scoped lang="scss"></style>