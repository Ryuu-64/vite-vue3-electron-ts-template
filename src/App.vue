<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import DarkMode from "./components/DarkMode.vue";
import Prisma from "./components/Prisma.vue";
</script>

<template>
  <hello-world msg="Vite + Vue 3 + Electron + TypeScript"/>
  <dark-mode/>
  <prisma/>
</template>

<style>
#app {
  text-align: center;
}

</style>
