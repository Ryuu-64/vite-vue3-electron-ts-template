<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Category} from "@/models/Category";

const category = ref<Category[]>([]);

onMounted(async () => {
  category.value = await window.electronAPI.categoryAPI.findAllCategoriesWithParent();
});
</script>

<template>
  <el-table :data="category" stripe>
    <el-table-column prop="name" label="name"/>
    <el-table-column prop="parentName" label="parentName"/>
  </el-table>
</template>

<style scoped>
</style>
