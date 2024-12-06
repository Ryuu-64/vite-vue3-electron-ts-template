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
  console.log(rootCategories);

  function formatTreeData(descendants: Category[]): Category[] {
    return descendants.map(item => ({
      id: item.id,
      label: item.name,
      children: item.children ? formatTreeData(item.children) : [],
    }));
  }
});

const onNodeClick = (node: any, data: any) => {
  console.log(node);
  console.log(data);
};
</script>

<template>
  <el-divider>category</el-divider>
  <el-tree
      style="max-width: 600px"
      :data="data"
      :props="defaultProps"
  >
    <template #default="{ node, data }">
      <div @click="onNodeClick(node,data)">
        {{ data.label }}
      </div>
    </template>
  </el-tree>
  <el-divider></el-divider>
</template>
