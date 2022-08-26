<template>
  <el-scrollbar class="app-main container-left" :class="{ hasTagsView: hasTagsView === '1' }">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in" appear>
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="$route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { useTagsViewStore } from '@/store/tagsView'

defineProps({
  hasTagsView: {
    type: String,
    required: true,
  },
})
const tagsViewStore = useTagsViewStore()
const cachedViews = tagsViewStore.cachedViews
</script>

<style lang="scss" scoped>
.app-main {
  height: calc(100% - var(--navbar-height));
  background: #f5f7fa;
  &.hasTagsView {
    height: calc(100% - var(--navbar-height) - var(--tagsview-height));
  }

  > :deep(.el-scrollbar__wrap) {
    .el-scrollbar__view {
      padding: var(--app-main-padding);
      box-sizing: border-box;
    }
  }
}

html.dark {
  .app-main {
    background: #020409;
  }
}
</style>
