<script lang="ts" setup>
import {Category} from "@/models/Category";
import {onMounted, reactive} from 'vue';
import {VueDraggable} from 'vue-draggable-plus';

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

  treeData.value = await window.electronAPI.categoryAPI.findAllCategories();
});
</script>

<template>
  <vue-draggable v-model="treeData" target=".el-tree">
    <el-tree
        :data="treeData"
        :props="defaultProps"
    >
      <template #default="{ data }">
        <div>
          {{ data.label }}
        </div>
      </template>
    </el-tree>
  </vue-draggable>
</template>
