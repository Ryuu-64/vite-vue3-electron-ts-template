<script setup lang="ts">
import {routes} from "../../router";
</script>

<template>
  <div class="side-menu">
    <el-menu
        class="side-menu-el-menu"
        router
    >
      <template v-for="item in routes">
        <template v-if="item.children">
          <el-sub-menu
              :index="item.path"
              :key="item.path"
          >
            <template #title>
              {{ $t('component.side-menu.' + String(item.name)) }}
            </template>
            <template v-for="secondLevelItem in item.children">
              <el-sub-menu
                  v-if="secondLevelItem.children"
                  :index="secondLevelItem.path"
                  :key="secondLevelItem.path"
              >
                <template #title>
                  {{ secondLevelItem.name }}
                </template>
              </el-sub-menu>
              <el-menu-item v-else :index="secondLevelItem.path">
                {{ $t('component.side-menu.' + String(secondLevelItem.name)) }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else-if="!item.redirect">
          <el-menu-item
              :index="item.path"
          >
            <template #title>
              {{ $t('component.side-menu.' + String(item.name)) }}
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
.side-menu {
  width: 100%;
  height: 100%;
}

.side-menu-el-menu {
  width: 100%;
  min-height: 100%;
}
</style>
