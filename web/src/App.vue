<template>
  <div>
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

//滚动条
::-webkit-scrollbar {
  width: 5px;
  position: absolute;
}

::-webkit-scrollbar-thumb {
  background-color: #1890ff;
}

::-webkit-scrollbar-track {
  background-color: #ddd;
}</style>