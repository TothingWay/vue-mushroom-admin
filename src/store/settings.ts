import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'
import { getConfig, config } from '@/utils/sysHelper'
const isDark = useDark()

export const useSettingStore = defineStore('setting', {
  state: () => ({
    isDark: isDark.value,
    menuMode: getConfig('VITE_MENU_MODE'),
    showLogo: getConfig('VITE_SHOW_LOGO'),
    hasTagsView: getConfig('VITE_TAGS_VIEW'),
    tagsViewStyle: getConfig('VITE_TAGS_VIEW_STYLE'),
  }),
  actions: {
    toggleTheme(val: boolean) {
      this.isDark = val
      isDark.value = val
    },
    changeMenuMode(mode: 'vertical' | 'horizontal' | 'horizontalSplit') {
      config.value.VITE_MENU_MODE = mode
      this.menuMode = mode
    },
    changeTagsViewStyle(mode: 'bread' | 'border' | 'card') {
      config.value.VITE_TAGS_VIEW_STYLE = mode
      this.tagsViewStyle = mode
    },
    toggleLogo(show: '1' | '0') {
      config.value.VITE_SHOW_LOGO = show
      this.showLogo = show
    },
    toggleTagsView(show: '1' | '0') {
      config.value.VITE_TAGS_VIEW = show
      this.hasTagsView = show
    },
  },
})
