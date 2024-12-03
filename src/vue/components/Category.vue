<script lang="ts" setup>
import {Category} from "../../models/Category";
import {onMounted, reactive} from 'vue';

// 声明树的数据结构
const data = reactive<Category[]>([]);
const defaultProps = [
  {
    label: 'label',
    children: 'children',
  }
];

// 通过 onMounted 获取数据并格式化树数据
onMounted(async () => {
  const rootCategories: Category[] = await window.electronAPI.categoryAPI.findCategoryTree();
  data.push(...formatTreeData(rootCategories));  // 使用 reactive 数据更新树
  console.log(rootCategories);

  // 格式化数据
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
      style="max-width: 600px"
      :data="data"
      :props="defaultProps"
  />
  <el-divider></el-divider>
</template>
