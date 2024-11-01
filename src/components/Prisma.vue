<script setup lang="ts">
const createUser = async () => {
  // @ts-ignore
  const user = await window.electronAPI.createUser('111', '111');
  console.log("User created:", user);
};
const getUser = async () => {
  // @ts-ignore
  const user = await window.electronAPI.getUser(1);
  console.log("User created:", user);
};
</script>

<template>
  <el-divider>prisma</el-divider>
  <button @click="createUser()">createUser</button>
  <br/>
  <button @click="getUser()">getUser</button>
  <el-divider></el-divider>
</template>

<style scoped>

</style>