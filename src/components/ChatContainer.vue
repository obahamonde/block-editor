<script setup lang="ts">
import type { User, Message as ChatMessage } from "~/types";
const { state } = useChatStore();

const props = defineProps<{
  user: User;
  namespace: string;
}>();

const showEvent = ref(false);

const currentMessage = ref<ChatMessage>({
  namespace: props.namespace,
  owner: "agent",
  content: "",
  ts: new Date().getTime(),
  ref: "",
});

const postMessage = async () => {
  const body = JSON.stringify(currentMessage.value);
  const { data } = await useFetch("/api/messages/" + props.namespace, {
    method: "POST",
    body,
  }).json();
  const newMessage = unref(data) as ChatMessage;
  state.messages.unshift(newMessage);

  currentMessage.value = {
    namespace: props.namespace,
    owner: "agent",
    content: "",
    ts: new Date().getTime(),
    ref: "",
  };
  showEvent.value = !showEvent.value;
};

const sendMessage = async (text: string) => {
  if (!props.user.ref) return;
  currentMessage.value = {
    namespace: props.namespace,
    owner: props.user.ref,
    content: text,
    ts: new Date().getTime(),
    ref: "",
  };
};

const fetchMessages = async () => {
  const { data } = await useFetch(
    "/api/messages/list/" + props.namespace,
  ).json();
  const messages: ChatMessage[] = unref(data) as ChatMessage[];
  state.messages = messages ? messages.reverse() : [];
};

onMounted(async () => {
  await fetchMessages();
});

watch(currentMessage, async (val) => {
  if (val.content) {
    await postMessage();
    await fetchMessages();
    currentMessage.value.content = "";
  }
});

const rxProps = reactive(props);

watch(rxProps, async (newProps) => {
  if (newProps) {
    await fetchMessages();
  }
});

const handleSend = (text: string) => {
  if (!props.user.ref) return;
  currentMessage.value.content = text;
};
</script>

<template>
  <div class="chat-wrapper w-168" v-if="props.namespace">
    <div class="message-wrapper">
      <div class="chat-wrapper">
        <ServerEvent
          :url="
            '/api/chat/' +
            props.namespace +
            '?text=' +
            state.messages[0].content
          "
          v-if="showEvent"
          @done="postMessage()"
          @close="showEvent = false"
          @send="handleSend($event)"
        >
          <template #default="{ data }">
            <ChatMessage image="/chatbot.svg" :content="data" :reverse="false" />
          </template>
        </ServerEvent>
      </div>
    </div>

    <div
      class="message-wrapper"
      :class="message.owner == props.user.ref ? 'reverse' : ''"
      v-for="message in state.messages"
    >
      <div class="chat-wrapper">
        <ChatMessage
          :image="
            message.owner == props.user.ref ? props.user.picture! : '/chatbot.svg'
          "
          :content="message.content"
          :ts="message.ts"
          :reverse="message.owner == props.user.ref"
          :author="message.owner"
        />
      </div>
    </div>
  </div>

  <ChatInput @send="sendMessage" />
</template>
