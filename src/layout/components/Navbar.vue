<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import HorizontalBar from './Sidebar/Horizontal.vue'
import Settings from './Settings.vue'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
import { ElMessageBox } from 'element-plus'

const appStore = useAppStore()
const userStore = useUserStore()
const { sidebarOpened } = storeToRefs(appStore)
const { name } = storeToRefs(userStore)
const { toggleSideBar } = appStore

defineProps({
  menuModeResponsive: {
    type: String,
    required: true,
  },
})

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const logout = () => {
  ElMessageBox.confirm(t('login.logOutMsg'), t('login.logOut'), {
    type: 'warning',
  })
    .then(() => {
      userStore.resetToken().then(() => {
        nextTick(() => {
          router.push(`/login?redirect=${route.fullPath}`)
        })
      })
    })
    .catch(() => {
      return false
    })
}

// 系统设置抽屉
const settingsVisible = ref(false)

// 全屏
const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <div class="navbar">
    <div class="left-menu">
      <hamburger
        v-if="menuModeResponsive === 'vertical'"
        id="hamburger-container"
        :is-active="sidebarOpened"
        class="hamburger-container"
        @toggle-click="toggleSideBar"
      />

      <HorizontalBar
        v-if="menuModeResponsive !== 'vertical'"
        :menu-mode-responsive="menuModeResponsive"
        class="horizontal-menu-container"
      />
    </div>

    <div class="right-menu">
      <!-- 全屏 -->
      <svg-icon
        class="right-menu-item hover-effect"
        :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
        @click="toggle"
      />

      <!-- 用户 -->
      <el-dropdown size="default" class="avatar-container right-menu-item hover-effect">
        <div class="avatar-wrapper flex-center">
          <el-avatar class="user-avatar">{{ name.substring(0, 1) }}</el-avatar>

          <span class="username">{{ name || '未命名' }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">
              <i-ep-switch-button class="h-15px mr-4px" />
              {{ $t('login.logOut') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 系统设置 -->
      <i-ep-setting class="right-menu-item hover-effect h-20px" @click="settingsVisible = true" />
    </div>

    <Settings v-model="settingsVisible" />
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
      padding: 0 10px;
      height: 100%;
      font-size: 16px;
      vertical-align: text-bottom;
      color: var(--el-text-color-primary);

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
      .avatar-wrapper {
        position: relative;

        .username {
          font-size: 14px;
          margin-left: 5px;
          white-space: nowrap;
          color: var(--el-text-color-primary);
        }

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>
