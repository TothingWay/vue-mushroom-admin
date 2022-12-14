<script setup lang="ts">
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import VerticalBar from './components/Sidebar/Vertical.vue'
import TagsView from './components/TagsView/index.vue'

import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store/settings'

const appStore = useAppStore()
const { sidebarOpened, device, withoutAnimation, fullscreen } = storeToRefs(appStore)
const settingStore = useSettingStore()
const { menuMode, hasTagsView } = storeToRefs(settingStore)

// 兼容移动端，当为移动端时，导航模式始终为 vertical 模式
const menuModeResponsive = computed(() => {
  if (device.value === 'desktop') {
    return menuMode.value
  } else {
    return 'vertical'
  }
})

// 菜单模式下导航的展开状态
/* const isSidebarOpened = computed(() => {
  if (menuMode.value === 'vertical') {
    return sidebarOpened.value
  } else {
    return true
  }
}) */

const classObj = computed(() => {
  return {
    hideSidebar: menuModeResponsive.value === 'vertical' && !sidebarOpened.value,
    openSidebar: menuModeResponsive.value === 'vertical' && sidebarOpened.value,
    mobile: device.value === 'mobile',
    withoutAnimation: withoutAnimation.value,
    fullscreen: fullscreen.value,
  }
})

// 点击遮罩层，关闭菜单栏
const handleClickOutside = () => {
  appStore.closeSideBar(false)
}

// 是否存在多级路由
const hasMultipleRoutes = ref(true)
// 水平与垂直导航结合情况下，无二级菜单则隐藏
const showSidebar = computed(() => {
  if (menuModeResponsive.value === 'horizontalSplit') {
    return hasMultipleRoutes.value
  } else if (menuModeResponsive.value === 'horizontal') {
    return false
  } else {
    return true
  }
})

// 兼容移动端
const { body } = document
const WIDTH = 768 // refer to Bootstrap's responsive design
const $route = useRoute()
watch($route, () => {
  if (device.value === 'mobile' && sidebarOpened) {
    appStore.closeSideBar(false)
  }
})
const isMobile = () => {
  const rect = body.getBoundingClientRect()
  return rect.width - 1 < WIDTH
}
const resizeHandler = () => {
  if (!document.hidden) {
    appStore.toggleDevice(isMobile() ? 'mobile' : 'desktop')

    if (isMobile()) {
      appStore.closeSideBar(true)
    }
  }
}
onBeforeMount(() => {
  window.addEventListener('resize', resizeHandler)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
})
onMounted(() => {
  if (isMobile()) {
    appStore.toggleDevice('mobile')
    appStore.closeSideBar(true)
  }
})
</script>

<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebarOpened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <VerticalBar
      v-if="menuModeResponsive !== 'horizontal'"
      v-show="!fullscreen && showSidebar"
      class="sidebar-container"
      :menu-mode-responsive="menuModeResponsive"
      @show="(val) => (hasMultipleRoutes = val)"
    />

    <div
      class="app-header container-left transition-none!"
      :class="{
        'horizontal-bar': menuModeResponsive === 'horizontal' || !showSidebar,
      }"
    >
      <Navbar v-show="!fullscreen" :menu-mode-responsive="menuModeResponsive" />
      <TagsView v-if="hasTagsView === '1'" />
    </div>
    <AppMain
      :has-tags-view="hasTagsView"
      :class="{
        'horizontal-bar': menuModeResponsive === 'horizontal' || !showSidebar,
      }"
    />
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

  &.fullscreen {
    .container-left {
      margin-left: 0 !important;
    }

    :deep(.app-main) {
      height: calc(100% - var(--tagsview-height));
    }
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

.hideSidebar .app-header {
  width: calc(100% - 54px);
}

.mobile .app-header {
  width: 100%;
}
</style>
