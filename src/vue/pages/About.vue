<script setup lang="ts">
</script>

<template>
  <el-divider>about</el-divider>
  <el-text>released under the&nbsp;</el-text>
  <el-link href="https://opensource.org/license/MIT" target="_blank" rel="noopener noreferrer" type="primary">
    MIT License
  </el-link>
  <div>
    <el-text>powered by:</el-text>
    <div class="icon-containers">
      <!--suppress CheckImageSize -->
      <img alt="ts-logo" width="32" src="@/assets/images/ts.png"/>
      <!--suppress CheckImageSize -->
      <img alt="electron-logo" width="32" src="@/assets/images/electron.png"/>
      <!--suppress CheckImageSize -->
      <img alt="vue-logo" width="32" src="@/assets/images/logo.png"/>
      <img alt="vite-logo" width="32" src="@/assets/images/vite.svg"/>
      <img alt="pinia logo" width="32" src="@/assets/images/pinia.svg"/>
      <img alt="element-plus-logo" width="128" src="@/assets/images/element-plus-logo.svg"/>
    </div>
  </div>
  <el-divider></el-divider>
</template>

<style scoped>
.icon-containers {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-containers > * {
  margin: 8px;
}

</style>