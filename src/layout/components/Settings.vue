<template>
  <el-drawer
    :model-value="modelValue"
    :title="$t('layout.preferences')"
    direction="rtl"
    :before-close="beforeClose"
  >
    <el-divider class="mt-10px!">
      {{ $t('layout.theme') }}
    </el-divider>
    <el-switch
      v-model="theme"
      class="flex-center!"
      inline-prompt
      :active-icon="MoonSvgIcon"
      style="
        --el-switch-on-color: var(--el-border-color);
        --el-switch-off-color: var(--el-color-primary);
      "
      :inactive-icon="SunSvgIcon"
      size="default"
    />

    <el-divider>
      {{ $t('layout.menuMode') }}
    </el-divider>

    <el-radio-group v-model="menuMode" class="flex-center!" @change="toggleMenuMode">
      <el-radio label="vertical" border>
        <div class="layout-radio theme-default" />
        <div class="layout-name">{{ $t('layout.menuModeVertical') }}</div>
      </el-radio>
      <el-radio label="horizontal" border>
        <div class="layout-radio menu-horizontal" />
        <div class="layout-name">{{ $t('layout.menuModeHorizontal') }}</div>
      </el-radio>
      <el-radio label="horizontalSplit" border>
        <div class="layout-radio menu-horizontalSplit" />
        <div class="layout-name">{{ $t('layout.menuModeHorizontalSplit') }}</div>
      </el-radio>
    </el-radio-group>

    <el-divider>
      {{ $t('layout.interfaceDisplay') }}
    </el-divider>

    <div class="setting-items">
      <div class="setting-item-name">{{ $t('layout.showLogo') }}</div>
      <el-switch v-model="showLogo" active-value="1" inactive-value="0" @change="toggleLogo" />
    </div>

    <!-- <div class="setting-items">
      <div class="setting-item-name">{{ $t('layout.i18n') }}</div>
      <el-switch v-model="showI18n" @change="toggleI18nDisplay" />
    </div>

    <div class="setting-items">
      <div class="setting-item-name">{{ $t('layout.notice') }}</div>
      <el-switch v-model="showNotice" @change="toggleNoticeDisplay" />
    </div>

    <div class="setting-items">
      <div class="setting-item-name">{{ $t('layout.attention') }}</div>
      <el-switch v-model="showAttention" @change="toggleAttentionDisplay" />
    </div>

    <div class="setting-items">
      <div class="setting-item-name">{{ $t('layout.screenfull') }}</div>
      <el-switch v-model="showScreenfull" @change="toggleScreenfullDisplay" />
    </div> -->
  </el-drawer>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/store/settings'
import SunSvgIcon from '~icons/svg/sun'
import MoonSvgIcon from '~icons/svg/moon'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'

// 抽屉关闭逻辑
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])
const beforeClose = (done: () => void) => {
  emit('update:modelValue', false)
  done()
}

// 暗黑模式切换
const settingStore = useSettingStore()
const appStore = useAppStore()
const { isDark, menuMode, showLogo } = storeToRefs(settingStore)

const theme = computed({
  get() {
    return isDark.value
  },
  set(val: boolean) {
    settingStore.toggleTheme(val)
  },
})

// 导航模式切换
const toggleMenuMode = (mode: any) => {
  settingStore.changeMenuMode(mode)
  if (mode === 'horizontalSplit' && !appStore.sidebarOpened) {
    appStore.toggleSideBar()
  }
}

// logo切换
const toggleLogo = (show: any) => {
  settingStore.toggleLogo(show)
}

// // 标签风格切换
// const tagsViewStyle = ref(store.getters.tagsViewStyle)
// const tagsViewStyleOptions = reactive([
//   {
//     label: $t('navbar.tagsViewStyleMode.bread'),
//     value: 'bread',
//   },
//   {
//     label: $t('navbar.tagsViewStyleMode.border'),
//     value: 'border',
//   },
//   {
//     label: $t('navbar.tagsViewStyleMode.card'),
//     value: 'card',
//   },
// ])
// const toggleTagsViewStyle = (style) => {
//   store.dispatch('settings/changeSetting', { key: 'tagsViewStyle', value: style })
// }

// // 是否显示国际化切换按钮
// const showI18n = ref(store.getters.showI18n)
// const toggleI18nDisplay = (value) => {
//   store.dispatch('settings/changeSetting', { key: 'showI18n', value })
// }

// // 是否显示全屏切换按钮
// const showScreenfull = ref(store.getters.showScreenfull)
// const toggleScreenfullDisplay = (value) => {
//   store.dispatch('settings/changeSetting', { key: 'showScreenfull', value })
// }

// // 是否显示关注按钮
// const showAttention = ref(store.getters.showAttention)
// const toggleAttentionDisplay = (value) => {
//   store.dispatch('settings/changeSetting', { key: 'showAttention', value })
// }

// // 是否显示通知按钮
// const showNotice = ref(store.getters.showNotice)
// const toggleNoticeDisplay = (value) => {
//   store.dispatch('settings/changeSetting', { key: 'showNotice', value })
// }
</script>

<style lang="scss" scoped>
:deep(.el-radio) {
  padding: 0 !important;
  height: auto !important;
  border-radius: 2px !important;
  border-width: 2px !important;
  margin-right: 16px !important;
  margin-bottom: 40px;
  .el-radio__input {
    display: none;
  }
  .el-radio__label {
    padding-left: 0;
  }
}

.layout-radio {
  width: 68px;
  height: 48px;
  &::before {
    content: '';
    display: block;
    width: 16px;
    height: 100%;
  }
}

.theme-default {
  background: #fff;
  &::before {
    background: #0e2133;
  }
}
.theme-dark {
  background: rgba(#0e2133, 0.8);
  &::before {
    background: #0e2133;
  }
}

.menu-horizontal {
  background: #fff;
  &::before {
    width: 100%;
    height: 7px;
    background: #0e2133;
  }
}

.menu-horizontalSplit {
  background: #fff;
  &::before {
    width: 100%;
    height: 7px;
    background: #0e2133;
  }
  &::after {
    content: '';
    display: block;
    width: 16px;
    height: calc(100% - 7px);
    border-right: 1px solid #d3d9e3;
  }
}

.layout-name {
  position: absolute;
  bottom: -25px;
  width: 100%;
  color: var(--el-text-color-primary) !important;
  text-align: center;
}

.setting-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding: 10px 0;
  &:first-child {
    margin-top: 10px;
  }
  .setting-item-name {
    font-size: 14px;
    color: var(--el-text-color-primary);
    line-height: 20px;
  }
}
</style>
