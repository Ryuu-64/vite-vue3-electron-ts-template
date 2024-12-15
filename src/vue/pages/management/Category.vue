<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Category} from "@/models/Category";
import ElTableActionColumn from "@/vue/components/table/column/ElTableActionColumn.vue";
import {ElMessageBox} from "element-plus";

const category = ref<Category[]>([]);

onMounted(async () => {
  category.value = await window.electronAPI.categoryAPI.findAllCategoriesWithParent();
});

const viewRow = (row: any) => {
  console.log(row);
};

const editRow = (row: any) => {
  console.log(row);
};

const deleteRow = (row: any) => {
  ElMessageBox.confirm(
      '此操作将永久删除该文件, 是否继续?',
      '警告',
      {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }
  ).then(() => {
    window.electronAPI.categoryAPI
        .deleteCategoryById(row.id)
        .then((category) => {
          if (category.id === row.id) {
            console.log('文件已删除');
          } else {
            console.log('文件删除失败');
          }
        });
  }).catch(() => {
    console.log('取消删除');
  });
};

</script>

<template>
  <el-table :data="category" stripe>
    <el-table-column prop="name" label="name"/>
    <el-table-column label="parent name">
      <template v-slot="scope">
        <span v-if="scope.row.parent">
        {{ scope.row.parent.name }}
        </span>
      </template>
    </el-table-column>
    <el-table-action-column
        :on-view="viewRow"
        :on-edit="editRow"
        :on-delete="deleteRow"
    />
  </el-table>
</template>
