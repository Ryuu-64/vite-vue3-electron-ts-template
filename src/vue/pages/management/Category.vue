<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Category} from "@/models/Category";
import ElTableActionColumn from "@/vue/components/table/column/ElTableActionColumn.vue";

const category = ref<Category[]>([]);

onMounted(async () => {
  category.value = await window.electronAPI.categoryAPI.findAllCategoriesWithParent();
});

const viewRow = (row: any) => {
  console.log(row)
}
const editRow = (row: any) => {
  console.log(row)

}
const deleteRow = (row: any) => {
  console.log(row)
}
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
