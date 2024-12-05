<script setup lang="ts">
const log = () => {
  window.electronAPI.logAPI.logDebug('This is a debug message.');
  window.electronAPI.logAPI.logInfo('This is an info message.');
  window.electronAPI.logAPI.logWarn('This is a warning message.');
  window.electronAPI.logAPI.logError('This is an error with stack trace.');
};
</script>

<template>
  <el-divider>winston</el-divider>
  <button @click="log()">log</button>
  <el-divider></el-divider>
</template>

<style scoped>
</style>