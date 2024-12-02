<script setup lang="ts">
import {ElLoading, ElMessage} from 'element-plus'

const importChromeBookmark = async () => {
  const loading = ElLoading.service({
    lock: true
  })
  setTimeout(
      () => {
        ElMessage.error('import chrome bookmark timeout.')
        loading.close();
      },
      5_000
  )
  //@ts-ignore
  await window.electronAPI.fileAPI.importChromeBookmark();
  loading.close();
};
</script>

<template>
  <el-divider>file</el-divider>
  <button @click="importChromeBookmark()">import chrome bookmark</button>
  <el-divider></el-divider>
</template>

<style scoped>

</style>