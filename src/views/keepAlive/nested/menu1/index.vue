<script setup lang="ts">
const input = ref('')
</script>

<template>
  <div>
    <p>{{ $t('route.keepAlive.nested.index') }}</p>
    <p style="text-indent: 2em">{{ $t('route.keepAlive.nested.menu1') }}</p>
    <el-input v-model="input" />
  </div>
</template>
