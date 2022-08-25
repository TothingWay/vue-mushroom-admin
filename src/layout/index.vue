<script setup lang="ts">
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import VerticalBar from './components/Sidebar/Vertical.vue'
import TagsView from './components/TagsView/index.vue'

import { useAppStore } from '@/store/app'
import { getConfig } from '@/utils/sysHelper'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store/settings'

const appStore = useAppStore()
const { sidebarOpened, device, withoutAnimation } = storeToRefs(appStore)
const settingStore = useSettingStore()
const { menuMode } = storeToRefs(settingStore)

const hasTagsView = getConfig('VITE_TAGS_VIEW') === '1'

const classObj = computed(() => {
  return {
    hideSidebar: !sidebarOpened.value,
    openSidebar: sidebarOpened.value,
    mobile: device.value === 'mobile',
    withoutAnimation: withoutAnimation.value,
  }
})

// 点击遮罩层，关闭菜单栏
const handleClickOutside = () => {
  appStore.closeSideBar(false)
}

// 兼容移动端，当为移动端时，导航模式始终为 vertical 模式
const menuModeResponsive = computed(() => {
  if (appStore.device === 'desktop') {
    return menuMode.value
  } else {
    return 'vertical'
  }
})

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
const WIDTH = 992 // refer to Bootstrap's responsive design
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
      v-show="showSidebar"
      class="sidebar-container"
      @show="(val) => (hasMultipleRoutes = val)"
    />

    <div
      class="app-header container-left transition-none!"
      :class="{
        'horizontal-bar': menuModeResponsive === 'horizontal' || !showSidebar,
      }"
    >
      <Navbar />
      <TagsView v-if="hasTagsView" />
    </div>
    <AppMain
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
