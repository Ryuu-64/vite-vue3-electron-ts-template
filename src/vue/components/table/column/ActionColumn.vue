<script setup lang="ts">
import {defineProps} from 'vue';

const props = defineProps({
  row: {
    type: Object,
    required: true
  },
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

const viewRow = () => props.onView(props.row);
const editRow = () => props.onEdit(props.row);
const deleteRow = () => props.onDelete(props.row);
</script>

<template>
    <el-button size="small" @click="viewRow">{{ $t('component.action-column.view') }}</el-button>
    <el-button size="small" @click="editRow">{{ $t('component.action-column.edit') }}</el-button>
    <el-button size="small" @click="deleteRow">{{ $t('component.action-column.delete') }}</el-button>
</template>
