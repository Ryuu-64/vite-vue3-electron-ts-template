<script setup lang="ts">

const log = async () => {
  //@ts-ignore
  await window.electronAPI.logDebug('This is a debug message.');
  //@ts-ignore
  await window.electronAPI.logInfo('This is an info message.');
  //@ts-ignore
  await window.electronAPI.logWarn('This is a warning message.');
  //@ts-ignore
  await window.electronAPI.logError('This is an error with stack trace.', new Error('Example Error'));
};
</script>

<template>
  <el-divider>winston</el-divider>
  <button @click="log()">log</button>
  <el-divider></el-divider>
</template>

<style scoped>
</style>