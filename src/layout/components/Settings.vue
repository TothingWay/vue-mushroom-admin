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

    <div class="setting-items">
      <div class="setting-item-name">{{ $t('layout.hasTagsView') }}</div>
      <el-switch
        v-model="hasTagsView"
        active-value="1"
        inactive-value="0"
        @change="toggleTagsView"
      />
    </div>

    <div class="setting-items">
      <div class="setting-item-name">{{ $t('layout.tagsViewStyle') }}</div>
      <el-select v-model="tagsViewStyle" style="width: 80px" @change="changeTagsViewStyle">
        <el-option
          v-for="item in tagsViewStyleOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/store/settings'
import SunSvgIcon from '~icons/svg/sun'
import MoonSvgIcon from '~icons/svg/moon'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'

// ??????????????????
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

const settingStore = useSettingStore()
const appStore = useAppStore()
const { isDark, menuMode, showLogo, hasTagsView, tagsViewStyle } = storeToRefs(settingStore)

// ??????????????????
const theme = computed({
  get() {
    return isDark.value
  },
  set(val: boolean) {
    settingStore.toggleTheme(val)
  },
})

// ??????????????????
const toggleMenuMode = (mode: any) => {
  settingStore.changeMenuMode(mode)
  if (mode === 'horizontalSplit' && !appStore.sidebarOpened) {
    appStore.toggleSideBar()
  }
}

// Logo ??????
const toggleLogo = (show: any) => {
  settingStore.toggleLogo(show)
}

// TagsView ??????
const toggleTagsView = (show: any) => {
  settingStore.toggleTagsView(show)
}

const { t } = useI18n()

// // ??????????????????
const tagsViewStyleOptions = reactive([
  {
    label: t('layout.tagsViewStyleMode.bread'),
    value: 'bread',
  },
  {
    label: t('layout.tagsViewStyleMode.border'),
    value: 'border',
  },
  {
    label: t('layout.tagsViewStyleMode.card'),
    value: 'card',
  },
])
const changeTagsViewStyle = (style: 'bread' | 'border' | 'card') => {
  settingStore.changeTagsViewStyle(style)
}
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
