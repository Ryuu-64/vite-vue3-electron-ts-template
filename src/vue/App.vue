<script setup lang="ts">
import DarkMode from "./components/DarkMode.vue";
import Prisma from "./components/Prisma.vue";
import File from "./components/File.vue";
import Winston from "./components/Winston.vue";
import Category from "./components/Category.vue";
</script>

<template>
  <dark-mode/>
  <prisma/>
  <file/>
  <category/>
  <winston/>
</template>

<style>
/*noinspection CssUnusedSymbol*/
#app {
  text-align: center;
}

</style>
