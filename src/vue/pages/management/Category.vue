<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {useI18n} from "vue-i18n";
import ElTableActionColumn from "@/vue/components/table/column/ElTableActionColumn.vue";
import {Category} from "@/models/Category";
import {deepClone} from "@/utils/deep-clone-utils";

const $tRef = ref();
const isDialogVisible = ref(false);
const categoriesRef = ref<Category[]>([]);
const formCategory = ref<Category>({});
let currentRow: Category | null = null;

onMounted(async () => {
  let {t} = useI18n();
  $tRef.value = t;
  categoriesRef.value = await window.electronAPI.categoryAPI.findAllCategoriesWithParent();
});

const viewRow = (row: Category) => {
  console.log(row);
};

//region edit
const editRow = (row: Category) => {
  currentRow = row;
  formCategory.value = deepClone(row);
  isDialogVisible.value = true;
};

const editConfirm = async () => {
  isDialogVisible.value = false;
  if (formCategory.value.name === currentRow.name) {
    ElMessage.warning($tRef.value('common.action.failed.edit.no-change'));
    return;
  }

  // avoid Electron Structured Clone error
  const deepCloneFormCategory: Category = deepClone(formCategory.value);
  await window.electronAPI.categoryAPI.updateCategory(deepCloneFormCategory);
  currentRow.name = formCategory.value.name;
  ElMessage.success($tRef.value('component.el-message-box.edit.success'));
};

const editCancel = () => {
  isDialogVisible.value = false;
  ElMessage.info($tRef.value('component.el-message-box.edit.cancel'));
}
//endregion

const deleteRow = (row: Category) => {
  ElMessageBox.confirm(
      $tRef.value('component.el-message-box.delete.message'),
      $tRef.value('common.warning'),
      {
        confirmButtonText: $tRef.value('common.confirm'),
        cancelButtonText: $tRef.value('common.cancel'),
        type: 'warning'
      }
  ).then(
      () => {
        window.electronAPI.categoryAPI
            .deleteCategoryById(row.id)
            .then(
                category => {
                  if (category.id === row.id) {
                    ElMessage.success($tRef.value('component.el-message-box.delete.success'));
                    const index = categoriesRef.value.indexOf(row);
                    categoriesRef.value.splice(index, 1);
                  } else {
                    ElMessage.error($tRef.value('component.el-message-box.delete.fail'));
                  }
                }
            );
      }
  ).catch(
      () => {
        ElMessage.info($tRef.value('component.el-message-box.delete.cancel'));
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
      v-model="isDialogVisible"
      :title="$t('page.management.category.edit')"
  >
    <el-form
        :model="formCategory"
        :label-width="'10%'"
    >
      <el-form-item label="id">
        <el-input disabled v-model="formCategory.id"/>
      </el-form-item>
      <el-form-item label="name">
        <el-input v-model="formCategory.name"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="editCancel()">
          {{ $tRef('common.cancel') }}
        </el-button>
        <el-button type="primary" plain @click="editConfirm()">
          {{ $tRef('common.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
