<script setup lang="ts">
import {defineProps} from 'vue';

const props = defineProps({
  onView: {
    type: Function,
    required: true
  },
  onEdit: {
    type: Function,
    required: true
  },
  onDelete: {
    type: Function,
    required: true
  }
});

</script>

<template>
  <el-table-column :label="$t('component.el-table-action-column.label')">
    <template #default="{ row }">
      <el-button size="small" @click="props.onView(row)">{{ $t('component.el-table-action-column.view') }}</el-button>
      <el-button size="small" @click="props.onEdit(row)">{{ $t('component.el-table-action-column.edit') }}</el-button>
      <el-button size="small" @click="props.onDelete(row)">{{ $t('component.el-table-action-column.delete') }}</el-button>
    </template>
  </el-table-column>
</template>
