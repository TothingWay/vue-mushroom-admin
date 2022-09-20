<script setup lang="ts">
const $route = useRoute()
const componentPath = $route.meta.componentPath ? `：/src/views/${$route.meta.componentPath}` : ''
</script>

<template>
  <el-empty :description="$t('component.componentNotFound') + componentPath" />
</template>

<style lang="scss" scoped></style>
