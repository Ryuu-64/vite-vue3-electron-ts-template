<script setup lang="ts">
import {useI18n} from 'vue-i18n';

const {locale} = useI18n();

const switchLanguage = () => {
  if (locale.value === 'en') {
    locale.value = 'zh';
  } else {
    locale.value = 'en';
  }
};
</script>

<template>
  <div>
    <button @click="switchLanguage">{{ $t('switch-language') }}</button>
  </div>
</template>
