<script setup lang="ts">
import {ElLoading, ElMessage} from 'element-plus';

const importChromeBookmark = async () => {
  const loading = ElLoading.service({
    lock: true
  });
  const status = await window.electronAPI.fileAPI.importChromeBookmark();
  loading.close();
  if (status) {
    ElMessage.success('Import successfully.');
  } else {
    ElMessage.error('Import failed.');
  }
};
</script>

<template>
  <div>
    <button @click="importChromeBookmark()">{{ $t('page.import.chrome-bookmark') }}</button>
  </div>
</template>
