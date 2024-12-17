<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Category} from "@/models/Category";
import ElTableActionColumn from "@/vue/components/table/column/ElTableActionColumn.vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {useI18n} from "vue-i18n";

const dialogVisible = ref(false)
const form = ref<Category>({})
const categoriesRef = ref<Category[]>([]);
const $t = ref();

onMounted(async () => {
  let {t} = useI18n();
  $t.value = t;
  categoriesRef.value = await window.electronAPI.categoryAPI.findAllCategoriesWithParent();
});

const viewRow = (row: any) => {
  console.log(row);
};

const editRow = (row: any) => {
  form.value = row;
  dialogVisible.value = true;
};

const deleteRow = (row: any) => {
  ElMessageBox.confirm(
      $t.value('component.el-message-box.delete.message'),
      $t.value('common.warning'),
      {
        confirmButtonText: $t.value('common.confirm'),
        cancelButtonText: $t.value('common.cancel'),
        type: 'warning'
      }
  ).then(
      () => {
        window.electronAPI.categoryAPI
            .deleteCategoryById(row.id)
            .then(
                category => {
                  if (category.id === row.id) {
                    ElMessage.success($t.value('component.el-message-box.delete.success'));
                    const index = categoriesRef.value.indexOf(row);
                    categoriesRef.value.splice(index, 1);
                  } else {
                    ElMessage.error($t.value('component.el-message-box.delete.fail'));
                  }
                }
            );
      }
  ).catch(
      () => {
        ElMessage.info($t.value('component.el-message-box.delete.cancel'));
      }
  );
};
</script>

<template>
  <el-table :data="categoriesRef" stripe>
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

  <el-dialog
      v-model="dialogVisible"
      title="Tips"
  >
    <el-form :model="form">
      <el-form-item label="id">
        <el-input v-model="form.id"/>
      </el-form-item>
      <el-form-item label="name">
        <el-input v-model="form.name"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
