<script setup lang="ts">
const { state } = useStore();
</script>
<template>
  <ChatView v-if="state.user" :user="state.user" />
</template>
