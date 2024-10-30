<script setup lang="ts">
import {ref} from "vue";
import {storeToRefs} from "pinia";
import {useCounterStore} from "../store/counter";

defineProps<{ msg: string }>();

const {count} = storeToRefs(useCounterStore());
const filePath = ref(null);
const openFile = async () => {
  //@ts-ignore
  filePath.value = await window.electronAPI.openFile();
};
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Docs </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <p>
    <el-button @click="count++">count is: {{ count }}</el-button>
  </p>

  <p>
    <el-button @click="openFile()">Open a File</el-button>
  </p>

  <p>
    <el-text v-if="filePath">File Path: {{ filePath }}</el-text>
  </p>

  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <p>
    <!-- use the router-link component for navigation. -->
    <!-- specify the link by passing the `to` prop. -->
    <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
    <router-link to="/home">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
  </p>
  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <router-view/>
</template>

<style scoped>
.el-row {
  text-align: center;
  margin-bottom: 20px;
}
</style>
