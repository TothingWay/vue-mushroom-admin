<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebar-logo-fade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img :src="logoIcon" class="sidebar-logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img :src="logoIcon" class="sidebar-logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts">
import logoIcon from '@/assets/logo.png'

defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
})

const title = ref('mushroom admin')
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: var(--navbar-height);
  line-height: var(--navbar-height);
  background: var(--menu-bg);
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    padding: 0 !important;

    & .sidebar-logo {
      height: 28px;
      vertical-align: middle;
      position: relative;
      top: -2px;
    }
  }
}
</style>
