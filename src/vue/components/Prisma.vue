<script setup lang="ts">

const createBookmark = async () => {
  const bookmark = await window.electronAPI.bookmarkAPI.createBookmark(
      'test', 'test', 'test', 'test',
      new Date(), new Date(), '111', []
  );
  console.log(bookmark);
};

const findBookmark = async () => {
  const bookmark = await window.electronAPI.bookmarkAPI.findBookmark('1');
  console.log(bookmark);
};

const findAllBookmarks = async () => {
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