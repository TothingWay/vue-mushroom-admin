<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChildTmp.children || onlyOneChildTmp.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link
        v-if="onlyOneChildTmp.meta"
        :to="resolvePath(onlyOneChildTmp.path)"
        :horizontal-split="horizontalSplit"
        :item="item"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChildTmp.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            :show-icon="showIcon"
            :icon="onlyOneChildTmp.meta.icon || (item.meta && item.meta.icon)"
            :title="$t(onlyOneChildTmp.meta.title)"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <item
          v-if="item.meta"
          :show-icon="showIcon"
          :icon="item.meta && item.meta.icon"
          :title="$t(item.meta.title)"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item.vue'
import AppLink from './Link.vue'

export default defineComponent({
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
    horizontalSplit: {
      type: Boolean,
      default: false,
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    // TODO: refactor with render function
    ;(this as any).onlyOneChild = null
    return {}
  },
  computed: {
    onlyOneChildTmp() {
      return this.onlyOneChild as any
    },
  },
  methods: {
    hasOneShowingChild(children: any[] = [], parent: any) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath: string) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
  },
})
</script>
