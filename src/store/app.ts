import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const sidebarOpened = useStorage('sidebarOpened', true)

export const useAppStore = defineStore('app', {
  state: () => ({
    sidebarOpened: sidebarOpened.value,
    device: 'desktop',
    withoutAnimation: false,
    // 顶部水平与侧边栏结合导航下 选中时候的index
    horizontalSplitMenuIndex: '',
  }),
  actions: {
    toggleSideBar() {
      this.sidebarOpened = !this.sidebarOpened
      sidebarOpened.value = this.sidebarOpened
      this.withoutAnimation = false
    },
    closeSideBar(withoutAnimation: boolean) {
      this.sidebarOpened = false
      sidebarOpened.value = false
      this.withoutAnimation = withoutAnimation
    },
    toggleDevice(device: string) {
      this.device = device
    },
    setHorizontalSplitMenuIndex(index: string) {
      this.horizontalSplitMenuIndex = index
    },
  },
})
