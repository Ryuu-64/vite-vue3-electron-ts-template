<script setup lang="ts">

import {colorThemeMode, toggleColorThemeMode} from "../composables";
</script>

<template>
  <el-text>{{ $t('color-theme-mode') }}:&nbsp;</el-text>
  <el-button size="small" @click="toggleColorThemeMode()">{{ colorThemeMode }}</el-button>
</template>

<style scoped>
</style>
