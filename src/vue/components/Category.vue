<script lang="ts" setup>

interface Tree {
  label: string;
  children?: Tree[];
}

const handleNodeClick = (data: Tree) => {
  console.log(data);
};

const data: Tree[] = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
];

const defaultProps: Tree[] = [
  {
    label: 'Level one 1',
    children: [],
  }
];

//@ts-ignore
const newVar: any[] = await window.electronAPI.categoryAPI.findAllCategories();
console.log(newVar);
</script>

<template>
  <el-divider>category</el-divider>
  <el-tree
      style="max-width: 600px"
      :data="newVar"
      :props="defaultProps"
      @node-click="handleNodeClick"
  />
  <el-divider></el-divider>
</template>
