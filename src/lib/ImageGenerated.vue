<script setup lang="ts">
const props = defineProps<{
	content:string;
}>();
</script>
<template>
<img :src="props.content" class="x12 rounded-xl sh" />
</template>