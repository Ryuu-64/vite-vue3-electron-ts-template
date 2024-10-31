<script setup lang="ts">

import {isDarkMode, toggleDarkMode} from "../composables";
</script>

<template>
  <el-divider>dark mode</el-divider>
  <el-button @click="toggleDarkMode()">Toggle Dark Mode</el-button>
  <br/>
  <br/>
  <el-text size="large">is dark mode: {{ isDarkMode }}</el-text>
  <el-divider></el-divider>
</template>

<style scoped>
</style>