<template>
  <el-scrollbar class="app-main container-left" :class="{ hasTagsView: hasTagsView === '1' }">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in" appear>
        <keep-alive :include="cachedViews">
          <component :is="wrap($route.fullPath, Component)" :key="$route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { useTagsViewStore } from '@/store/tagsView'
import type { VNode } from 'vue'
import { ElScrollbar } from 'element-plus'

defineProps({
  hasTagsView: {
    type: String,
    required: true,
  },
})

const tagsViewStore = useTagsViewStore()
const cachedViews = tagsViewStore.cachedViews

// 自定义name的壳的集合
const cachedWrapperComponents = new Map()

// 为keep-alive里的component接收的组件包上一层自定义name的壳
const wrap = (fullPath: string, component: VNode) => {
  let wrapper

  if (cachedWrapperComponents.has(fullPath)) {
    wrapper = cachedWrapperComponents.get(fullPath)
  } else {
    wrapper = {
      name: fullPath,
      render() {
        return h('div', { class: 'app-main-wapper' }, component)
      },
    }
    cachedWrapperComponents.set(fullPath, wrapper)
  }
  return h(wrapper)
}

// 监听cachedViews的变化，当清除标签页缓存时移除相应的 wapper components
watch(cachedViews, (fullPaths) => {
  cachedWrapperComponents.forEach((value, key) => {
    if (!fullPaths.includes(key)) {
      cachedWrapperComponents.delete(key)
    }
  })
})
</script>

<style lang="scss" scoped>
.app-main {
  height: calc(100% - var(--navbar-height));
  background: #f5f7fa;
  &.hasTagsView {
    height: calc(100% - var(--navbar-height) - var(--tagsview-height));
  }

  /* > :deep(.el-scrollbar__wrap) {
    .el-scrollbar__view {
      padding: var(--app-main-padding);
      box-sizing: border-box;
    }
  } */

  .app-main-wapper {
    padding: var(--app-main-padding);
    box-sizing: border-box;
  }
}

html.dark {
  .app-main {
    background: #020409;
  }
}
</style>
