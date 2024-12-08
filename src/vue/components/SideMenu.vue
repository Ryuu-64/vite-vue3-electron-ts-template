<script setup lang="ts">
import {routes} from "../router";
</script>

<template>
  <div class="side-menu">
    <el-menu
        class="side-menu-el-menu"
        router
    >
      <template v-for="item in routes">
        <el-menu-item
            :index="item.path"
        >
          <template #title>{{ item.name }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
.side-menu {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
}

.side-menu::-webkit-scrollbar {
  width: 0;
}

.side-menu-el-menu {
  width: 200px;
}

.side-menu-el-menu {
  min-height: 100%;
}
</style>