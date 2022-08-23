<script setup lang="ts"></script>

<template>
  <div class="tags-view-container">tagsview</div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  height: 37px;
  width: 100%;
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-lighter);
  position: relative;

  .tags-view-wrapper {
    width: calc(100% - 40px);
    .tags-view-item {
      display: flex;
      position: relative;
      align-items: center;
      cursor: pointer;
      height: 28px;
      color: var(--el-text-color-primary);
      background: var(--el-bg-color);
      padding: 0 8px;
      font-size: 14px;
      margin-left: 4px;
      margin-top: 5px;
      text-decoration: none;
      box-sizing: border-box;
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      &:last-of-type {
        margin-right: 4px;
      }

      &.tags-view-item-bread {
        background-color: var(--el-border-color-lighter);
        border-radius: 4px 4px 0 0;
      }

      // 标签边框样式
      &.tags-view-item-border {
        border-radius: 4px;
        border: 1px solid var(--el-border-color-lighter);
        .el-icon-close {
          color: var(--el-text-color-secondary);
        }
        &.active {
          border: 1px solid var(--el-color-primary);
          .el-icon-close {
            color: var(--el-color-primary);
          }
          &:hover {
            .el-icon-close {
              &:hover {
                background-color: rgba(var(--el-color-primary-rgb), 0.1);
              }
            }
          }
        }
        &:hover {
          .el-icon-close {
            &:hover {
              background-color: var(--el-text-color-secondary);
            }
          }
        }
      }

      // 标签卡片样式
      &.tags-view-item-card {
        border-radius: 4px;
        background: var(--el-border-color-lighter);
        .el-icon-close {
          color: var(--el-text-color-secondary);
        }
        &.active {
          .el-icon-close {
            color: var(--el-color-primary);
          }
          &:hover {
            .el-icon-close {
              &:hover {
                background-color: rgba(var(--el-color-primary-rgb), 0.1);
              }
            }
          }
        }
        &:hover {
          .el-icon-close {
            &:hover {
              background-color: var(--el-text-color-secondary);
            }
          }
        }
      }

      &:hover {
        padding-right: 26px;
      }

      &.active {
        background-color: rgba(var(--el-color-primary), 0.1);
        color: var(--el-color-primary);
      }

      &.is-affix {
        padding-right: 8px;
      }
    }
  }

  .tags-view-refresh {
    position: absolute;
    right: 0;
    top: 0;
    width: 39px;
    height: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid var(--el-border-color-lighter);
    cursor: pointer;
    color: var(--el-text-color-regular);
  }

  /* 刷新按钮动画效果 */
  .rotate-animation {
    -webkit-animation: rotate 600ms linear infinite;
    -moz-animation: rotate 600ms linear infinite;
    -o-animation: rotate 600ms linear infinite;
    animation: rotate 600ms linear infinite;
  }

  .contextmenu {
    margin: 0;
    background: var(--el-bg-color);
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 4px 8px;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 400;
    color: var(--el-text-color-primary);
    box-shadow: 0 4px 19px -8px #8a959c;
    li {
      margin: 0;
      padding: 0 8px;
      border-radius: 4px;
      cursor: pointer;
      height: 28px;
      line-height: 28px;
      margin-bottom: 4px;
      &:last-child {
        margin-bottom: 0;
      }
      &:hover {
        background: rgba(var(--el-color-primary), 0.1);
      }

      &.contextmenu-divider {
        position: relative;
        margin-top: 9px;
        &::before {
          content: '';
          display: block;
          height: 1px;
          width: 100%;
          position: absolute;
          left: 0;
          top: -5px;
          background: var(--el-border-color-lighter);
        }
      }
    }
  }
}
</style>

<style lang="scss">
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      display: none;
      width: 12px;
      height: 12px;
      padding: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      position: absolute;
      right: -4px;

      &:hover {
        background-color: rgba(var(--el-color-primary-rgb), 0.1);
        color: var(--el-color-primary);
      }
    }

    &:hover {
      padding-right: 22px;
      .el-icon-close {
        display: block;
        right: 8px;
      }
    }
  }
}
</style>
