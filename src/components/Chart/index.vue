<template>
  <div
    ref="chart"
    v-visibility="handleVisible"
    v-resize="handleResize"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script lang="ts">
import { useSettingStore } from '@/store/settings'
import * as echarts from 'echarts'
import { mapState } from 'pinia'
// echarts 主题
import echartsTheme from './theme.json'

export default defineComponent({
  props: {
    className: {
      type: String,
      default: 'chart',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '350px',
    },
    data: {
      type: Object,
      required: true,
    },
    // 见 https://echarts.apache.org/zh/api.html#echartsInstance.setOption 组件合并模式
    notMerge: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      chart: null as echarts.ECharts | null,
      chartVisible: true,
    }
  },
  computed: {
    ...mapState(useSettingStore, ['isDark']),
    theme() {
      return this.isDark ? 'dark' : 'wonderland'
    },
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        this.$nextTick(() => {
          this.setOptions(val)
        })
      },
    },
    theme() {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    height() {
      this.$nextTick(() => {
        this.chart?.resize()
      })
    },
  },
  mounted() {
    echarts.registerTheme('wonderland', echartsTheme)
  },
  beforeUnmount() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      if (this.chart) {
        this.chart.dispose()
      }
      this.chart = markRaw(echarts.init(this.$refs.chart as HTMLElement, this.theme))
      this.setOptions(this.data)
    },
    setOptions(data = {}) {
      this.chart?.setOption(data, this.notMerge)
    },
    // 调整echart大小
    resize() {
      const { chart } = this
      chart && chart.resize()
    },
    // 当元素从隐藏切换为显示时自动resize
    handleVisible([{ isIntersecting }]: any) {
      if (isIntersecting) {
        if (!this.chart) {
          this.initChart()
        } else {
          this.resize()
        }
      }
    },
    handleResize({ width, height }: { width: number; height: number }) {
      if (width && height) {
        this.$nextTick(() => {
          if (this.chartVisible) {
            this.resize()
          }
        })
      }
    },
  },
})
</script>
