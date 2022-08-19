import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'
const isDark = useDark()

export const useSettingStore = defineStore('setting', {
  state: () => ({
    isDark: isDark.value,
  }),
  actions: {
    toggleTheme(val: boolean) {
      this.isDark = val
      isDark.value = val
    },
  },
})
