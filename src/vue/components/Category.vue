<script lang="ts" setup>
import {Category} from "../../models/Category";
import {onMounted, reactive} from 'vue';

const data = reactive<Category[]>([]);
const defaultProps = [
  {
    label: 'label',
    children: 'children',
  }
];

onMounted(async () => {
  const rootCategories: Category[] = await window.electronAPI.categoryAPI.findCategoryTree();
  data.push(...formatTreeData(rootCategories));

  function formatTreeData(descendants: Category[]): any[] {
    return descendants.map(item => ({
      id: item.id,
      label: item.name,
      children: item.children ? formatTreeData(item.children) : [],
    }));
  }
});
</script>

<template>
  <el-divider>category</el-divider>
  <el-tree
      :data="data"
      :props="defaultProps"
  >
    <template #default="{ node }">
      {{ node.label }}
    </template>
  </el-tree>
  <el-divider></el-divider>
</template>
