<script setup lang="ts">
const topic = ref("")
const user = ref("")
const messages = ref([]) as Ref<string[]>
const url = computed(() => {
	return `wss://www.aiofauna.com/api/interview/${user.value}?topic=${topic.value}`
})
const message = ref("")
const handleReceive = (data:string) => {
	messages.value.push(data)
}
const handleSend = (s:(str:string)=>void,msg:string)=>{
	s(msg)
}
</script>
<template>
<input class="input bg-gray-500" v-model="user" placeholder="User" />
<input class="input bg-gray-500" v-model="topic" placeholder="Topic" />
<input class="input bg-gray-500" v-model="message" placeholder="Messages" />
<WebSocket :url="url" @receive="handleReceive" v-if="user && topic">
<template #default="{data,status,send}">
<div>{{ data }}</div>
<div>{{ status }}</div>
<button class="btn" @click="handleSend(send,message)">Send</button>
</template>
</WebSocket>
</template>