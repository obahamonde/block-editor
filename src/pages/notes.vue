<script setup lang="ts">
const { state } = useStore();
</script>
<template>
<BlockEditor v-if="state.user" :user="state.user" />
</template>