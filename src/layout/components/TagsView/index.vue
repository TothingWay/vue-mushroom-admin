<script setup lang="ts">
import ScrollPane from './ScrollPane.vue'
import path from 'path'
import { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'

import { useAppStore } from '@/store/app'
import { usePermissionStore } from '@/store/permission'
import { useTagsViewStore } from '@/store/tagsView'
import { useSettingStore } from '@/store/settings'

const appStore = useAppStore()
const permissionStore = usePermissionStore()
const tagsViewStore = useTagsViewStore()
const settingStore = useSettingStore()

const visible = ref(false)
const top = ref(0)
const left = ref(0)
const selectedTag = ref<any>({})
const affixTags = ref<any>([])
// 刷新按钮动画class切换 'rotate-animation' || ''
const refreshBtnClass = ref('')

const visitedViews = computed(() => {
  return tagsViewStore.visitedViews
})
const routes = computed(() => {
  return permissionStore.routes
})
const tagsViewStyle = computed(() => {
  return settingStore.tagsViewStyle
})
const fullscreen = computed(() => {
  return appStore.fullscreen
})

const handleFullscreen = () => {
  return appStore.toggleFullscreen()
}

// 路由对象
const $route = useRoute()
const $router = useRouter()

const isActive = (route: RouteLocationNormalizedLoaded) => {
  return route.fullPath === $route.fullPath
}
const isAffix = (tag: RouteLocationNormalizedLoaded) => {
  return tag.meta && tag.meta.affix
}
const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
  let tags: any[] = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name as string,
        meta: { ...route.meta },
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

const initTags = () => {
  const affixTagList = (affixTags.value = filterAffixTags(routes.value as any))
  for (const tag of affixTagList) {
    // Must have tag name
    if (tag.name) {
      tagsViewStore.addVisitedView(tag)
    }
  }
}

const addTags = () => {
  const { name } = $route
  if (name) {
    tagsViewStore.addView($route)
  }
}

const tagRefs = ref<any>([])
const scrollPaneRef = ref<InstanceType<typeof ScrollPane> | null>(null)
const moveToCurrentTag = () => {
  nextTick(() => {
    for (const tag of tagRefs.value) {
      if (tag.to.path === $route.path) {
        scrollPaneRef.value?.moveToTarget(tag)
        // when query is different then update
        if (tag.to.fullPath !== $route.fullPath) {
          tagsViewStore.updateVisitedView($route)
        }
        break
      }
    }
  })
}
const refreshSelectedTag = (view: RouteLocationNormalizedLoaded) => {
  tagsViewStore.delCachedView(view).then(() => {
    const { fullPath, query } = unref(view)
    nextTick(() => {
      $router.replace({
        path: '/redirect' + fullPath,
        query,
      })
    })
  })
}
const toLastView = (
  visitedViews: RouteLocationNormalizedLoaded[],
  view: RouteLocationNormalizedLoaded
) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    $router.push(latestView.fullPath)
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === 'Dashboard') {
      // to reload home page
      $router.replace({ path: '/redirect' + view.fullPath })
    } else {
      $router.push('/')
    }
  }
}
const closeSelectedTag = (view: RouteLocationNormalizedLoaded) => {
  tagsViewStore.delView(view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view)
    }
  })
}

const closeOthersTags = () => {
  $router.push(selectedTag.value)
  tagsViewStore.delOthersViews(selectedTag.value).then(() => {
    moveToCurrentTag()
  })
}

const closeAllTags = (view: RouteLocationNormalizedLoaded) => {
  tagsViewStore.delAllViews().then(({ visitedViews }) => {
    if (
      affixTags.value.some((tag: RouteLocationNormalizedLoaded) => tag.fullPath === view.fullPath)
    ) {
      return
    }
    toLastView(visitedViews, view)
  })
}

const tagsViewContainerRef = ref<HTMLDivElement | null>(null)

const openMenu = (tag: RouteLocationNormalizedLoaded, e: MouseEvent) => {
  const menuMinWidth = 105
  const offsetLeft = tagsViewContainerRef.value!.getBoundingClientRect().left // container margin left
  const offsetWidth = tagsViewContainerRef.value!.offsetWidth // container width
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const currentLeft = e.clientX - offsetLeft + 15 // 15: margin right

  if (currentLeft > maxLeft) {
    left.value = maxLeft
  } else {
    left.value = currentLeft
  }

  top.value = e.clientY
  visible.value = true
  selectedTag.value = tag
}

const closeMenu = () => {
  visible.value = false
}

const handleScroll = () => {
  closeMenu()
}

const handleRefresh = () => {
  if (!refreshBtnClass.value) {
    refreshBtnClass.value = 'rotate-animation'
    refreshSelectedTag($route)
    setTimeout(() => {
      refreshBtnClass.value = ''
    }, 600)
  }
}

watch($route, () => {
  addTags()
  moveToCurrentTag()
})

watch(visible, (value: boolean) => {
  if (value) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

onMounted(() => {
  initTags()
  addTags()
})

defineExpose({
  tagRefs,
})
</script>

<template>
  <div id="tags-view-container" ref="tagsViewContainerRef" class="tags-view-container">
    <scroll-pane ref="scrollPaneRef" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        ref="tagRefs"
        :key="tag.fullPath"
        :class="{
          active: isActive(tag),
          'is-affix': isAffix(tag),
          [`tags-view-item-${tagsViewStyle}`]: true,
        }"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath } as any"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ $t((tag as any).title) }}
        <i-ep-close-bold
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>

    <div class="tags-view-btn right-40px" @click="handleRefresh">
      <i-ep-refresh-right :class="[refreshBtnClass]" />
    </div>

    <div class="tags-view-btn right-0" @click="handleFullscreen">
      <svg-icon
        :icon-class="fullscreen ? 'compressOutlined' : 'expandOutlined'"
        style="width: 1.1em; height: 1.1em"
      />
    </div>

    <ul v-show="visible" :style="{ left: left + 'px', top: top - 48 + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">{{ $t('layout.tagsView.refresh') }}</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        {{ $t('layout.tagsView.close') }}
      </li>
      <li class="contextmenu-divider" @click="closeOthersTags">
        {{ $t('layout.tagsView.closeOthers') }}
      </li>
      <li @click="closeAllTags(selectedTag)">{{ $t('layout.tagsView.closeAll') }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  height: 37px;
  width: 100%;
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-lighter);
  position: relative;

  .tags-view-wrapper {
    width: calc(100% - 80px);
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
        background-color: rgba(var(--el-color-primary-rgb), 0.1);
        color: var(--el-color-primary);
      }

      &.is-affix {
        padding-right: 8px;
      }
    }
  }

  .tags-view-btn {
    position: absolute;
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
    padding: 8px;
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
        background: rgba(var(--el-color-primary-rgb), 0.1);
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
