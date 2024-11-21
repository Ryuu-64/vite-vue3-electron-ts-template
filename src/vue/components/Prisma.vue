<script setup lang="ts">

const createBookmark = async () => {
  //@ts-ignore
  const bookmark = await window.electronAPI.bookmarkAPI.createBookmark('111', '111');
  console.log(bookmark);
};

const findBookmark = async () => {
  //@ts-ignore
  const bookmark = await window.electronAPI.bookmarkAPI.findBookmark('1');
  console.log(bookmark);
};

const findAllBookmarks = async () => {
  //@ts-ignore
  const bookmarks = await window.electronAPI.bookmarkAPI.findAllBookmarks();
  console.log(bookmarks);
};

</script>

<template>
  <el-divider>prisma book mark</el-divider>
  <button @click="createBookmark()">create</button>
  <br/>
  <button @click="findBookmark()">find</button>
  <br/>
  <button @click="findAllBookmarks()">findAll</button>
  <el-divider></el-divider>
</template>

<style scoped>
</style>