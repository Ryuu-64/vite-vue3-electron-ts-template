<script setup>
import SideMenu from "../components/home/SideMenu.vue";
</script>

<template>
  <div class="layout">
    <div class="side-menu-container">
      <side-menu/>
    </div>
    <div class="router-view-container">
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  width: 100%;
  height: 100%;
}

.side-menu-container {
  flex: 0 1 auto;
  min-width: 10%;
  max-width: 50%;
  height: 100%;
  overflow-y: auto;
}

.side-menu-container::-webkit-scrollbar {
  width: 0;
}

.router-view-container {
  flex: 1;
}
</style>
