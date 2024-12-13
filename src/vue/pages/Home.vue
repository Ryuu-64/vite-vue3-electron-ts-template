<script setup>
import SideMenu from "../components/SideMenu.vue";
</script>

<template>
  <div class="side-menu-container">
    <side-menu/>
  </div>
  <div class="router-view-container">
    <router-view/>
  </div>
</template>

<style scoped>
.side-menu-container {
  display: block;
  position: absolute;
  left: 0;
  right: 88%;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
}

.side-menu-container::-webkit-scrollbar {
  width: 0;
}

.router-view-container {
  position: absolute;
  left: 12%;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
