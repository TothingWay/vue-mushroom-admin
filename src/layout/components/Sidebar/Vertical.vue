<script setup lang="ts">
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import path from 'path'
import { deepClone } from '@/utils'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store/settings'
import { useAppStore } from '@/store/app'
import { usePermissionStore } from '@/store/permission'
import { routeType } from '@/store/types'

const props = defineProps({
  menuModeResponsive: {
    type: String,
    required: true,
  },
})

const settingStore = useSettingStore()
const appStore = useAppStore()
const permissionStore = usePermissionStore()

const { sidebarOpened, horizontalSplitMenuIndex } = storeToRefs(appStore)
const { showLogo } = storeToRefs(settingStore)
const { routes } = storeToRefs(permissionStore)

const activeMenu = computed(() => {
  const { meta, path } = useRoute()
  if (meta.activeMenu) {
    return meta.activeMenu as string
  }
  return path
})

const emit = defineEmits(['show'])

const verticalRoutes = computed(() => {
  const permissionRoutes = deepClone(routes.value)
  const currentMenuPath = horizontalSplitMenuIndex.value
  let verticalRoutes = []
  // 查找父级路由对象
  const route = permissionRoutes.find((item: routeType) => item.path === currentMenuPath)

  if (route) {
    verticalRoutes = route.children.map((item: routeType) => {
      return {
        ...item,
        path: path.resolve(currentMenuPath, item.path),
      }
    })
  } else {
    verticalRoutes = []
  }

  // 控制是否显示左侧导航
  if (verticalRoutes.length) {
    if (props.menuModeResponsive === 'horizontalSplit' && !sidebarOpened) {
      appStore.toggleSideBar()
    }

    emit('show', true)
  } else {
    emit('show', false)
  }

  return props.menuModeResponsive === 'horizontalSplit' ? verticalRoutes : permissionRoutes
})

const $route = useRoute()

watch(
  $route,
  (route) => {
    const parent = route.meta.parent
    if (parent) {
      appStore.setHorizontalSplitMenuIndex(parent as string)
    } else {
      appStore.setHorizontalSplitMenuIndex(route.path)
    }
  },
  {
    immediate: true,
    deep: true,
  }
)
</script>

<template>
  <div :class="{ 'has-logo': showLogo === '1' }">
    <Logo
      v-if="showLogo === '1' && menuModeResponsive === 'vertical'"
      :menu-mode-responsive="menuModeResponsive"
      :collapse="!sidebarOpened"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="!sidebarOpened"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in verticalRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped></style>
