<script lang="ts" setup>
import {Category} from "../../models/Category";
import {onMounted, reactive, ref} from 'vue';
import {VueDraggable} from 'vue-draggable-plus'

const listData = ref<Category[]>([])
const treeData = reactive<Category[]>([]);
const defaultProps = [
  {
    label: 'label',
    children: 'children',
  }
];

onMounted(async () => {
  const rootCategories: Category[] = await window.electronAPI.categoryAPI.findCategoryTree();
  treeData.push(...formatTreeData(rootCategories));

  function formatTreeData(descendants: Category[]): Category[] {
    return descendants.map(item => ({
      id: item.id,
      label: item.name,
      children: item.children ? formatTreeData(item.children) : [],
    }));
  }

  listData.value = await window.electronAPI.categoryAPI.findAllCategories();
});
</script>

<template>
  <el-divider>category</el-divider>
  <vue-draggable v-model="listData" target=".el-tree">
    <el-tree
        :data="listData"
        :props="defaultProps"
    >
      <template #default="{ node, data }">
        <div>
          {{ data }}
        </div>
      </template>
    </el-tree>
  </vue-draggable>
  <el-divider></el-divider>
</template>
