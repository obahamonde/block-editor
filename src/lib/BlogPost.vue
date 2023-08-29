<script setup lang="ts">
import type { Blog } from '~/types';
const props = defineProps<{
	content:Blog,
}>();
</script>
<template>
<section class="bg-gray-500 sh rounded-lg py-4 px-2 overflow-auto">
<h1 class="text-title">
	{{ props.content.title }}
</h1>
<div class="text-caption text-xs">
{{  props.content.content }}
</div>
</section>
</template>