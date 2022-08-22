<template>
  <el-dropdown popper-class="translation-dropdown" trigger="click">
    <i-svg-translation
      style="font-size: 20px"
      class="ml-1.5 outline-none cursor-pointer hover:color-primary"
    />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          :class="{ 'active-lang': $i18n.locale === 'zh' }"
          @click="$i18n.locale = 'zh'"
        >
          简体中文
        </el-dropdown-item>
        <el-dropdown-item
          :class="{ 'active-lang': $i18n.locale === 'en' }"
          @click="$i18n.locale = 'en'"
        >
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss">
.translation-dropdown {
  .active-lang {
    background-color: var(--el-color-primary) !important;
    color: var(--el-color-white) !important;
  }
}
</style>
