<script setup lang="ts">

import File from "./File.vue";
import Category from "./Category.vue";
import Winston from "./Winston.vue";
import Prisma from "./Prisma.vue";
import DarkMode from "./DarkMode.vue";
</script>

<template>
  <el-divider>miscellaneous</el-divider>
  <dark-mode/>
  <prisma/>
  <file/>
  <category/>
  <winston/>
  <el-divider></el-divider>
</template>

<style scoped>
</style>
