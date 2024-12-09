<script setup>
import SideMenu from "../components/SideMenu.vue";
</script>

<template>
  <side-menu/>
  <div class="content">
    <router-view/>
  </div>
</template>

<style scoped>
.content {
  position: absolute;
  left: 200px;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
