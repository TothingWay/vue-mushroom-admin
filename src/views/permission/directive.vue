<template>
  <div>
    <div class="mb-2">The editor tag is not visible</div>

    <el-tag v-permission="['admin']" class="mr-2">admin</el-tag>
    <el-tag v-permission="['editor']">editor</el-tag>
  </div>
</template>

<style lang="scss" scoped></style>
