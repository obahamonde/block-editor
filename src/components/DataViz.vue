<script setup lang="ts">
import { Chart, registerables, ChartData, ChartOptions } from "chart.js";
import type { DataVisualization } from "~/types";
const { useColor } = useUtils();
Chart.register(...registerables);
const props = defineProps<{
  dataviz: DataVisualization;
}>();
const toggleLegend = ref(true);
const chart = ref<Chart<"doughnut" | "bar" | "line" | "pie" | "radar">>();
const ctx = ref<HTMLCanvasElement>();
const chartType = ref<"doughnut" | "bar" | "line" | "pie" | "radar">(
  "doughnut",
);
const dataviz = ref<DataVisualization>(props.dataviz);
const testData = computed<ChartData<"doughnut">>(() => ({
  labels: dataviz.value.labels,
  datasets: dataviz.value.datasets.map((dataset) => ({
    data: dataset as number[],
    backgroundColor: useColor(),
    hoverOffset: 4,
  })),
}));
const options = computed<
  ChartOptions<"doughnut" | "bar" | "line" | "pie" | "radar">
>(() => ({
  scales: {
    myScale: {
      type: "logarithmic",
      position: toggleLegend.value ? "left" : "right",
    },
  },
  plugins: {
    legend: {
      position: toggleLegend.value ? "top" : "bottom",
    },
    title: {
      display: true,
      text: "Chart.js Doughnut Chart",
    },
  },
}));

onMounted(() => {
  if (!ctx.value) return;
  const canvasCtx = ctx.value.getContext("2d");
  if (!canvasCtx) return;
  chart.value = new Chart(canvasCtx, {
    type: chartType.value,
    data: testData.value,
    options: options.value,
  });
});
</script>
<template>
  <div>
    <canvas ref="ctx" width="400" height="400"></canvas>
  </div>
</template>
