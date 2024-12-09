<script setup lang="ts">

import {colorThemeMode, toggleColorThemeMode} from "../composables";
</script>

<template>
  <el-text>is dark mode:&nbsp;</el-text>
  <el-button @click="toggleColorThemeMode()">{{ colorThemeMode }}</el-button>
</template>

<style scoped>
</style>
