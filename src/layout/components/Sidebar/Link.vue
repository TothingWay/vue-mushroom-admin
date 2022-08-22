<script setup lang="ts">
import { isExternal } from '@/utils/validate'

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  horizontalSplit: {
    type: Boolean,
    default: false,
  },
  // route object
  item: {
    type: Object,
    required: true,
  },
})

const type = computed(() => {
  if (props.horizontalSplit && props.item.isLayout) {
    return 'div'
  }
  if (isExternal(props.to)) {
    return 'a'
  }
  return 'router-link'
})

const linkProps = (to: string) => {
  if (isExternal(props.to)) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener',
    }
  }
  return {
    to,
  }
}
</script>

<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>
