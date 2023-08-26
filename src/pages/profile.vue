<script setup lang="ts">
const { state } = useStore();
</script>
<template>
  <div v-if="state.user">
    <UploadPdf :user="state.user" />
    <WordCloud />
    <Uploadcsv :user="state.user" />
  </div>
</template>
