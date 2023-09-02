<script setup lang="ts">
import type { User, Namespace, Message, Conversation } from "~/types";
import { useAuth0} from '@auth0/auth0-vue'
import { onMounted } from "vue";

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
});




const { getAccessTokenSilently } = useAuth0()
const user = ref<User | undefined>(undefined)
const conversation = ref<Conversation | undefined>(undefined)
const messages = ref<Message[]>([])
const namespace = ref<Namespace | undefined>(undefined)
const editorRef = ref()

const fetchNamespace = async ()=>{
  const { data:ns } = await useFetch("/api/namespace/get/" + props.name).json();
  namespace.value = unref(ns) as Namespace;
}

const fetchUser = async()=>{
  const token = await getAccessTokenSilently();
  const res = await fetch("/api/auth", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
	user.value = data;
}

const fetchConversation = async()=>{
  const { data } = await useFetch("/api/namespace/fetch/" + props.name);
  conversation.value = unref(data) as Conversation;
}

const fetchMessages = async()=>{
	const { data } = await useFetch(
    "/api/messages/list/" + props.name,
  ).json();
  messages.value = unref(data) as Message[];
}










onMounted(async()=>{
  await fetchUser()
  await fetchConversation()
  await fetchNamespace()
  await fetchMessages()
}
)

</script>
<template>
<main v-if="namespace && user" class="markdown-body">
<Tiptap :namespace="namespace" :user="user"
  ref="editorRef"
/>
</main>

  </template>

