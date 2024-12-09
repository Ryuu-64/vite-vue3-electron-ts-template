<script setup lang="ts">
import {routes} from "@/vue/router";
</script>

<template>
  <div class="side-menu">
    <el-menu
        class="side-menu-el-menu"
        router
    >
      <template v-for="item in routes">
        <template v-if="item.children">
          <el-sub-menu :index="item.path" :key="item.path">
            <template #title>
              {{ item.name }}
            </template>
            <template v-for="secondLevelItem in item.children">
              <el-sub-menu
                  v-if="secondLevelItem.children"
                  :index="secondLevelItem.path"
                  :key="secondLevelItem.path"
              >
                <template #title>{{ secondLevelItem.name }}</template>
                <el-menu-item
                    v-for="(thirdLevelItem, i) in secondLevelItem.children"
                    :key="i"
                    :index="thirdLevelItem.path"
                >
                  {{ thirdLevelItem.name }}
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="secondLevelItem.path">
                {{ secondLevelItem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item
              :index="item.path"
          >
            <template #title>{{ item.name }}</template>
          </el-menu-item>
        </template>
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
