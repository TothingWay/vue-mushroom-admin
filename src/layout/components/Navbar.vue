<script setup lang="ts"></script>

<template>
  <div class="navbar">Navbar</div>
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
