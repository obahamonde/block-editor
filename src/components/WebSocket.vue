<script setup lang="ts">
const { state } = useStore();

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});
const { data, open, close, status, send } = useWebSocket(props.url, {
  autoReconnect: true,
});

const emit = defineEmits(["receive"]);

onMounted(() => {
  open();
});

onUnmounted(() => {
  close();
});

watchEffect(() => {
  if (status.value === "CLOSED") {
    open();
  }
});

watch(data, async (newData) => {
  if (!state.user) return;
  emit("receive", newData);
  for (let i = 0; i < newData.length; i += 1) {
    const chunk = newData.slice(i, i + 1);
    state.messages[0].content += chunk;
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
});

defineExpose({
  send,
  message: data,
});
</script>
<template>
  <slot :status="status" />
</template>
