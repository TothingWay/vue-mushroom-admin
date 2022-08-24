<template>
  <el-scrollbar class="app-main-scroll-wrapper container-left">
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
  position: relative;
  background: #f5f7fa;
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
