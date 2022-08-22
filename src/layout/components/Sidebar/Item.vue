<template>
  <svg-icon v-if="showIcon && icon" :icon-class="icon" />
  <span v-if="title">{{ title }}</span>
</template>
<script>
export default {
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
