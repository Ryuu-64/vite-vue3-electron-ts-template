<script setup lang="ts">
import {Bookmark} from "@/models/Bookmark";
import {onMounted, ref} from "vue";

const bookmarks = ref<Bookmark[]>([]);

onMounted(async () => {
  bookmarks.value = await window.electronAPI.bookmarkAPI.findAllBookmarks();
});
</script>

<template>
  <el-table :data="bookmarks" stripe>
    <el-table-column prop="id" label="id"/>
    <el-table-column prop="url" label="url"/>
    <el-table-column prop="description" label="description"/>
    <el-table-column prop="createdAt" label="createdAt"/>
    <el-table-column prop="updatedAt" label="updatedAt"/>
    <el-table-column prop="categoryId" label="categoryId"/>
  </el-table>
</template>
