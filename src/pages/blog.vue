<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';
const { complete, text } = useCompletion()
const { state } = useChatStore();
const { state:store } = useStore();
const props = reactive({
	user: store.user,
	namespace: state.currentNamespace,
});
const editorRef = ref<any>(null);
const focused = ref<string>("editor")
const focusThis = (name: string) => {
	focused.value = name
}
const focusing = computed(()=>focused.value)
const posts = ref<{content:string, user: string, namespace: string, ref: string, ts: number}[]>([])
const fetchContent = async()=> {
	if (!props.user) return;
	if (!props.namespace) return;
	const { data } = await useFetch("/api/blog/" + props.namespace.ref, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	}).json()
	posts.value = unref(data) as {content:string, user: string, namespace: string, ref: string, ts: number}[]
	if (!posts.value.length) return;
	focusThis("posts")
}
const postContent = async()=>{
	if (!editorRef.value) return;
	if (!props.user) return;
	if (!props.namespace) return;
	const editor = editorRef.value.editor as Editor
	const content = editor.getHTML()
	await useFetch("/api/blog", {
		method: "POST",
		body: JSON.stringify({
			user: props.user.ref,
			namespace: props.namespace.ref,
			content
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});
	store.notifications.push({
		status: "success",
		message: "Content saved",
	});
}
const deletePost = async(ref: string)=>{
	if (!props.user) return;
	if (!props.namespace) return;
	await useFetch("/api/blog/" + ref, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
	store.notifications.push({
		status: "success",
		message: "Content deleted",
	});
	await fetchContent()
}

const handleKeydown = async() => {
		const editor = editorRef.value.editor as Editor
		await complete(editor.getText())
		editor.chain().insertContent(text.value).run()			
	}

const handleKeyDownUpdate = async(id: string) => {
		const content = document.getElementById(id)?.innerHTML as string
		await complete(content)
		document.getElementById(id)!.innerHTML = content + text.value
	}


const fetchAll = async () => {
const { data } =  await useFetch("/api/blog", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	}).json()
	posts.value = unref(data) as {content:string, user: string, namespace: string, ref: string, ts: number}[]
	focusThis("feed")
}

onMounted(async () => {
	await fetchAll()
})

const updateContent = async (id: string) => {
	if (!props.user) return;
	if (!props.namespace) return;
	if (focused.value !== "posts") return;
	const content = document.getElementById(id)?.innerHTML
	await useFetch("/api/blog/" + id + "?content=" + content, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
	});
	store.notifications.push({
		status: "success",
		message: "Content saved",
	});
};
</script>
<template>
<section class="row center w-full h-full" v-if="props.user">
<div class="app-left max-w-48 col center">
<ProfileBox :user="props.user" />
<ChatList :user="props.user" />
</div>
<div class="app-main col center h-full">

	<nav class="row center top-2 gap-4 absolute z-50 bg-gray-500  max-w-128 w-full rounded-lg sh py-1">
	<Icon icon="mdi-newspaper" class="text-lime-300 row center cp scale hover:text-blue" @click="fetchAll" />
	<Icon icon="mdi-pencil" class="text-lime-300 row center cp scale hover:text-blue" @click="focusThis('editor')" />
	<Icon icon="mdi-floppy" class="text-lime-300 row center cp scale hover:text-blue" @click="postContent" />
	<Icon icon="mdi-post" class="text-lime-300 row center cp scale hover:text-blue" @click="fetchContent" />
</nav>

	<div v-if="focusing === 'editor'" class="pt-8">
<Tiptap :namespace="props.namespace" :user="props.user" 

  ref="editorRef" @keyup.ctrl.space="handleKeydown"
/>

</div>
<div v-else-if="focusing === 'posts'" class="w-full h-full">
	 <div class="col center rounded-lg pt-8" v-for="post in posts" :key="post.ref" >
			<p class="text-gray-300 text-xs row center">{{ new Date(Number(post.ts)).toLocaleString() }}
			<Icon icon="mdi-delete" class="text-lime-300 row center cp scale hover:text-blue" @click="deletePost(post.ref)" />
			<Icon icon="mdi-floppy" class="text-lime-300 row center cp scale hover:text-blue" @click="updateContent(post.ref)" />
			</p>
			<Tiptap :namespace="props.namespace" :user="props.user" 
			 :content="post.content"
				:id="post.ref"
				@keyup.ctrl.space="handleKeyDownUpdate(post.ref)"
			/>
			</div>
</div>
<div v-else-if="focusing === 'feed'">
	 <div class="col center rounded-lg pt-8" v-for="post in posts" :key="post.ref" >
			<p class="text-gray-300 text-xs row center">{{ new Date(Number(post.ts)).toLocaleString() }}
			</p>
			<Raw :content="post.content"  />
</div>
</div>
</div>
</section>
  </template>

