import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'
import { getConfig } from '@/utils/sysHelper'
const isDark = useDark()

export const useSettingStore = defineStore('setting', {
  state: () => ({
    isDark: isDark.value,
    menuMode: getConfig('VITE_MENU_MODE'),
    showLogo: getConfig('VITE_SHOW_LOGO'),
  }),
  actions: {
    toggleTheme(val: boolean) {
      this.isDark = val
      isDark.value = val
    },
  },
})
