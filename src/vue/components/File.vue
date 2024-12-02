<script setup lang="ts">
import {ElLoading, ElMessage} from 'element-plus';

const importChromeBookmark = async () => {
  const loading = ElLoading.service({
    lock: true
  });
  //@ts-ignore
  const status = await window.electronAPI.fileAPI.importChromeBookmark();
  loading.close();
  if (status) {
    ElMessage.success('Import successfully.');
  } else {
    ElMessage.error('Import failed.');
  }
};
</script>

<template>
  <el-divider>file</el-divider>
  <button @click="importChromeBookmark()">import chrome bookmark</button>
  <el-divider></el-divider>
</template>

<style scoped>

</style>