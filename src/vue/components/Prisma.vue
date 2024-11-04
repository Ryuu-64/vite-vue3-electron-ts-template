<script setup lang="ts">
import {Bookmark} from "@prisma/client";

const createBookmark = async () => {
  const bookmark: Bookmark = await window.electronAPI.createBookmark('111', '111');
  console.log(bookmark);
};

const findBookmark = async () => {
  const bookmark: Bookmark = await window.electronAPI.findBookmark(1);
  console.log(bookmark);
};

const findAllBookmarks = async () => {
  const users: Bookmark[] = await window.electronAPI.findAllBookmarks();
  console.log(users);
};
</script>

<template>
  <el-divider>prisma</el-divider>
  <button @click="createBookmark()">createBookmark</button>
  <br/>
  <button @click="findBookmark()">findBookmark</button>
  <br/>
  <button @click="findAllBookmarks()">findAllBookmarks</button>
  <el-divider></el-divider>
</template>

<style scoped>
</style>