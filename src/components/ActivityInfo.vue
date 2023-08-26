<template>
  <div class="activity-info-header">
    <span class="info-header-bold">Current Week</span>
    <span class="info-header-light">Activity</span>
  </div>
  <div class="activity-days-wrapper">
    <div
      class="day"
      :style="`height: ${day.chart * 100}px;`"
      v-for="day in days"
    >
      <div class="chart"></div>
      <span>{{ day.day }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
const days = ref([
  {
    day: "MON",
    chart: 0.8,
  },
  {
    day: "TUE",
    chart: 0.8,
  },
  {
    day: "WED",
    chart: 0.7,
  },
  {
    day: "THU",
    chart: 0.6,
  },
  {
    day: "FRI",
    chart: 0.6,
  },
  {
    day: "SAT",
    chart: 0.9,
  },
  {
    day: "SUN",
    chart: 0.8,
  },
]);
</script>
