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

const settingStore = useSettingStore()
const appStore = useAppStore()
const permissionStore = usePermissionStore()

const { sidebarOpened, horizontalSplitMenuIndex } = storeToRefs(appStore)
const { menuMode, showLogo } = storeToRefs(settingStore)
const { routes } = storeToRefs(permissionStore)
const isCollapse = !sidebarOpened

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
    if (menuMode.value === 'horizontalSplit' && isCollapse) {
      appStore.toggleSideBar()
    }

    emit('show', true)
  } else {
    emit('show', false)
  }

  return menuMode.value === 'horizontalSplit' ? verticalRoutes : permissionRoutes
})

watch(
  () => useRoute(),
  (route) => {
    const parent = route.meta.parent as string | undefined
    if (parent) {
      appStore.setHorizontalSplitMenuIndex(parent)
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
  <div :class="{ 'has-logo': showLogo }">
    <Logo v-if="showLogo && menuMode === 'vertical'" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
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
