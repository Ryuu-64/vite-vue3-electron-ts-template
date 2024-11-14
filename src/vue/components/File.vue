<script setup lang="ts">
const openChromeBookmark = async () => {
  //@ts-ignore
  const {filePath, fileContent} = await window.electronAPI.fileAPI.openChromeBookmark();
  console.log(filePath, fileContent);
};
</script>

<template>
  <el-divider>file</el-divider>
  <button @click="openChromeBookmark()">openChromeBookmark</button>
  <el-divider></el-divider>
</template>

<style scoped>

</style>