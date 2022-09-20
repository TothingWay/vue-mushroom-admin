<script setup lang="ts">
import Chart from '@/components/Chart/index.vue'

const lineChartData = ref({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
    },
  ],
})

const barChartData = ref({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)',
      },
    },
  ],
})

const activeName = ref('first')
</script>

<template>
  <el-tabs v-model="activeName" type="border-card">
    <el-tab-pane label="line" name="first"><Chart :data="lineChartData" /></el-tab-pane>
    <el-tab-pane label="bar" name="second" lazy><Chart :data="barChartData" /></el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped></style>
