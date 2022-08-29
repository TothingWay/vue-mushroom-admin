<script setup lang="ts">
import { ElMessage } from 'element-plus'

const $router = useRouter()

const handleOpenPage = (id: string) => {
  if (!id) {
    ElMessage.warning('Please enter the id')
    return
  }
  $router.push(`/keepAlive/params/${id}`)
}

const id = ref('')
</script>

<template>
  <el-descriptions title="支持params参数多页签缓存" border :column="1">
    <el-descriptions-item label="params: {id: '1'}">
      <el-button class="w-100%" type="primary" @click="handleOpenPage('1')">
        <i-ep-promotion />
        <span class="ml-1">View</span>
      </el-button>
    </el-descriptions-item>
    <el-descriptions-item label="params: {id: '2'}">
      <el-button class="w-100%" type="primary" @click="handleOpenPage('2')">
        <i-ep-promotion />
        <span class="ml-1">View</span>
      </el-button>
    </el-descriptions-item>
    <el-descriptions-item label="params: {id: 'custom'}">
      <div class="flex">
        <el-input v-model="id" placeholder="Please input custom id" />
        <el-button class="ml-1" type="primary" @click="handleOpenPage(id)">
          <i-ep-promotion />
          <span class="ml-1">View</span>
        </el-button>
      </div>
    </el-descriptions-item>
  </el-descriptions>
</template>

<style lang="scss" scoped></style>
