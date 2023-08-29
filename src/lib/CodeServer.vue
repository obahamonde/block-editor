<script setup lang="ts">
const props = defineProps<{
	content: string;
}>();
</script>
<template>
<p class="text-xs text-gray-500 row center bg-primary p-4 rounded-lg sh m-6">
	<a :href="props.content" target="_blank" class="text-white no-underline text-xs text-caption">
		{{ props.content }}
	</a>
</p>
</template>