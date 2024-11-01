<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import DarkMode from "./components/DarkMode.vue";

const createUser = async () => {
  // @ts-ignore
  const user = await window.electronAPI.createUser('111', '111');
  console.log("User created:", user);
}
</script>

<template>
  <hello-world msg="Vite + Vue 3 + Electron + TypeScript"/>
  <dark-mode/>
  <button @click="createUser()">createUser</button>
</template>

<style>
#app {
  text-align: center;
}

</style>
