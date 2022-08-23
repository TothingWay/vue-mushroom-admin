<template>
  <el-scrollbar class="app-main-scroll-wrapper">
    <section class="app-main">
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in" appear>
          <keep-alive :include="cachedViews">
            <component :is="Component" :key="$route.fullPath" />
          </keep-alive>
        </transition>
      </router-view>
    </section>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { useTagsViewStore } from '@/store/tagsView'
const tagsViewStore = useTagsViewStore()
const cachedViews = tagsViewStore.cachedViews
</script>

<style lang="scss" scoped>
.app-main-scroll-wrapper {
  /* 48= navbar  48  */
  height: calc(100vh - var(--navbar-height));
  width: 100%;
  position: relative;
  background: #f5f7fa;
}

.hasTagsView {
  .app-main-scroll-wrapper {
    /* 86 = navbar + tags-view = 48 + 38 */
    height: calc(100vh - var(--navbar-height) - var(--tagsview-height));
  }
}

.app-main {
  padding: var(--app-main-padding);
  box-sizing: border-box;
}

html.dark {
  .app-main-scroll-wrapper {
    background: #020409;
  }
}
</style>
