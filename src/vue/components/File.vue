<script setup lang="ts">
const importChromeBookmark = async () => {
  //@ts-ignore
  await window.electronAPI.fileAPI.importChromeBookmark();
};
</script>

<template>
  <el-divider>file</el-divider>
  <button @click="importChromeBookmark()">import chrome bookmark</button>
  <el-divider></el-divider>
</template>

<style scoped>

</style>