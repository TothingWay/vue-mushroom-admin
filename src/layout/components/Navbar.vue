<script setup lang="ts">
import { useSettingStore } from '@/store/settings'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const settingStore = useSettingStore()
const { menuMode } = storeToRefs(settingStore)
const { sidebarOpened } = storeToRefs(appStore)
const { toggleSideBar } = appStore
</script>

<template>
  <div class="navbar">
    <div class="left-menu">
      <hamburger
        v-if="menuMode === 'vertical'"
        id="hamburger-container"
        :is-active="sidebarOpened"
        class="hamburger-container"
        @toggle-click="toggleSideBar"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  height: var(--navbar-height);
  overflow: hidden;
  position: relative;
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-lighter);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .hamburger-container {
    height: var(--navbar-height);
    line-height: 46px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: var(--el-border-color-extra-light);
    }
  }

  .left-menu {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    overflow: hidden;

    .horizontal-menu-container {
      width: 100%;
    }
  }

  .right-menu {
    height: 100%;
    display: flex;
    flex: 0 0 auto;
    align-items: center;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      vertical-align: text-bottom;
      color: var(--el-text-color-secondary);

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: var(--el-border-color-extra-light);
        }
      }
      &.right-menu-svgicon {
        width: 16px;
        font-size: 16px;
      }
    }

    .avatar-container {
      margin-right: 15px;

      .avatar-wrapper {
        position: relative;
        margin-top: 8px;
        display: flex;
        justify-content: center;
        align-items: center;

        .username {
          font-size: 14px;
          margin-left: 5px;
          white-space: nowrap;
          color: var(--el-text-color-primary);
        }

        .user-avatar {
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
