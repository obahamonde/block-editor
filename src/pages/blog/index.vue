<script setup lang="ts">
import { v4 as uuid4 } from 'uuid';
const { state } = useChatStore()
const router = useRouter()
const generateBlogRoute = async() => {
	const id = uuid4()
	router.push(`/blog/${state.currentNamespace.ref}?id=${id}`)
}

</script>
<template>
<div class="col center">
<h1 class="text-white">Blog</h1>
<button class="btn-get" @click="generateBlogRoute">Create Blog</button>
</div>
</template>