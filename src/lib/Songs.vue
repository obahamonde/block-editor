<script setup lang="ts">
import type { Song } from '~/types';
const props = defineProps<{
	content:Song,
}>();
</script>
<template>
<div class="bg-purple-500 sh rounded-lg text-white text-xs text-mono py-4 px-2 overflow-auto">
<h1 class="text-amber text-xs overflow-auto">
	{{ props.content.title }}
</h1>
<p class="text-white bg-black sh rounded-xl text-xs">{{ props.content.genre }}</p>
<p class="font-cursive">
{{ props.content.lyrics }}
</p>
</div>
</template>