<script setup lang="ts">
const value = ref('')
</script>

<template>
  <div class="mb-2">params: { id : {{ $route.params.id }} }</div>
  <div class="flex">
    <el-input v-model="value" placeholder="Please input any">
      <template #prepend>Keep Alive</template>
    </el-input>
  </div>
</template>

<style lang="scss" scoped></style>
