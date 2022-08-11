<template>
  <el-config-provider size="small" :locale="messages[$i18n.locale]">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { messages } from '@/lang'
</script>
