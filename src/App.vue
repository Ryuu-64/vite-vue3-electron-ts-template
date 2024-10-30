<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import {toggleThemeMode} from "./composables";
</script>

<template>
  <img alt="Vite logo" width="120" src="./assets/images/vite.svg"/>
  <img alt="Vue logo" width="120" src="./assets/images/logo.png"/>
  <img alt="Electron logo" width="120" src="./assets/images/electron.png"/>
  <img alt="TS logo" width="120" src="./assets/images/ts.png"/>
  <HelloWorld msg="Vite + Vue 3 + Electron + TypeScript"/>
  <p>
    <el-button @click="toggleThemeMode()">Toggle Theme Mode</el-button>
  </p>
  <p>
    <el-text size="large">Plugins</el-text>
  </p>
  <img alt="vue router logo" width="120" src="./assets/images/vueRouter.png"/>
  <img alt="pinia logo" width="120" src="./assets/images/pinia.svg"/>
</template>

<style>
#app {
  text-align: center;
}

img {
  margin: 5px;
}

</style>
