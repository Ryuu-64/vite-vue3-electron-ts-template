<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import {isDarkMode, toggleDarkMode} from "./composables";
</script>

<template>
  <el-divider>icon</el-divider>
  <img alt="vite-logo" width="120" src="./assets/images/vite.svg"/>
  <img alt="vue-logo" width="120" src="./assets/images/logo.png"/>
  <img alt="electron-logo" width="120" src="./assets/images/electron.png"/>
  <img alt="ts-logo" width="120" src="./assets/images/ts.png"/>
  <el-divider>component</el-divider>
  <HelloWorld msg="Vite + Vue 3 + Electron + TypeScript"/>
  <el-divider>dark mode</el-divider>
  <p>
    <el-button @click="toggleDarkMode()">Toggle Dark Mode</el-button>
  </p>
  <p>
    <el-text size="large">is dark mode: {{ isDarkMode }}</el-text>
  </p>
  <el-divider>Plugins</el-divider>
  <img alt="pinia logo" width="120" src="./assets/images/pinia.svg"/>
  <img alt="element-plus-logo" width="240" src="./assets/images/element-plus-logo.svg"/>
</template>

<style>
#app {
  text-align: center;
}

img {
  margin: 5px;
}

</style>
