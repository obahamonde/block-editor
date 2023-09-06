<script setup lang="ts">
const props = defineProps<{
	content:string[]
}>();
</script>
<template>
<div class="grid3 gap-4">
<img v-for="i in props.content" :src="i" class="x4 rounded-xl sh bg-gray-300"  />
</div>
</template>