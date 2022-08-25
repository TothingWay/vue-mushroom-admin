<script setup lang="ts">
import SidebarItem from './SidebarItem.vue'
import Logo from './Logo.vue'
import { deepClone } from '@/utils'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store/settings'
import { useAppStore } from '@/store/app'
import { usePermissionStore } from '@/store/permission'

const settingStore = useSettingStore()
const { setHorizontalSplitMenuIndex } = useAppStore()
const permissionStore = usePermissionStore()

const { menuMode, showLogo } = storeToRefs(settingStore)
const { routes } = storeToRefs(permissionStore)

const activeMenu = computed(() => {
  const { meta, path } = useRoute()
  if (meta.activeMenu) {
    return meta.activeMenu as string
  }
  return path
})

const horizontalRoutes = computed(() => {
  const permissionRoutes = deepClone(routes.value)

  for (let i = 0; i < permissionRoutes.length; i++) {
    permissionRoutes[i].alwaysShow = false
    if (!permissionRoutes[i].children || permissionRoutes[i].children.length !== 1) {
      delete permissionRoutes[i].children
    }
  }

  return menuMode.value === 'horizontalSplit' ? permissionRoutes : routes.value
})

const handleMenuSelect = (index: string) => {
  setHorizontalSplitMenuIndex(index)
}
</script>

<template>
  <div class="horizontal-menu-container">
    <logo
      v-if="showLogo && menuMode !== 'vertical'"
      class="horizontal-menu-logo"
      :collapse="false"
      :menu-mode="menuMode"
    />
    <el-menu
      class="horizontal-menu"
      :default-active="activeMenu"
      unique-opened
      mode="horizontal"
      @select="handleMenuSelect"
    >
      <SidebarItem
        v-for="route in horizontalRoutes"
        :key="route.path"
        :item="route"
        :horizontal-split="menuMode === 'horizontalSplit'"
        :base-path="route.path"
        :show-icon="false"
      />
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.horizontal-menu-container {
  display: flex;
  .horizontal-menu-logo {
    width: var(--sidebar-width);
    flex: 0 0 var(--sidebar-width);
    background: var(--el-bg-color);
    color: var(--menu-active-bg);
  }

  .horizontal-menu {
    width: 100%;
  }
}
</style>
