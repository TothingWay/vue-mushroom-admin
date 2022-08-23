<script setup lang="ts">
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import VerticalBar from './components/Sidebar/Vertical.vue'
import TagsView from './components/TagsView/index.vue'

import { useAppStore } from '@/store/app'
import { getConfig } from '@/utils/sysHelper'

const appStore = useAppStore()

const sidebarOpened = appStore.sidebarOpened
const device = appStore.device

const hasTagsView = getConfig('VITE_TAGS_VIEW') === '1'

const classObj = computed(() => {
  return {
    hideSidebar: !sidebarOpened,
    openSidebar: sidebarOpened,
    mobile: device === 'mobile',
  }
})

// 点击遮罩层，关闭菜单栏
const handleClickOutside = () => {
  appStore.closeSideBar()
}
</script>

<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebarOpened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <VerticalBar class="sidebar-container" />
    <div :class="{ hasTagsView }" class="main-container">
      <div class="app-header">
        <Navbar />
        <TagsView v-if="hasTagsView" />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: var(--el-overlay-color-lighter);
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.app-header {
  width: 100%;
  transition: width 0.28s;
}

.hideSidebar .app-header {
  width: calc(100% - 54px);
}

.mobile .app-header {
  width: 100%;
}
</style>
