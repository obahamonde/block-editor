<script setup lang="ts">
const { state } = useStore();
const { state:store } = useChatStore();
</script>
<template>
  <BlockEditor v-if="state.user && store.currentNamespace" :user="state.user" :namespace="store.currentNamespace.ref" />
</template>
