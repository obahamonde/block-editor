<template>
  <div class="fixed top-0 right-0 h-full w-64 bg-teal-600 overflow-y-auto text-white">
    <div class="text-lg font-semibold p-4 border-b border-gray-700">EXPLORER</div>
    <ExplorerItem v-for="node in state.assets" :key="node.path" :node="node" />
  </div>
</template>

<script setup lang="ts">
const { state } = useAssetsStore()
onMounted(async () => {
  const { data } = await useFetch("/api/assets").json()
  state.assets = unref(data)
})
</script>
