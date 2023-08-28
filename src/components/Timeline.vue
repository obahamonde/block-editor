<script setup lang="ts">
const { state: store } = useChatStore();
const message = ref("");
const { isListening, speech, result } = useSpeech();


const useFunction = async () => {
  if (!message.value) return;
  if (!store.currentNamespace.ref) return;
  try {
    const namespace = store.currentNamespace.ref;
    await useFetch(`/api/subscription/${namespace}?text=` + message.value, {
      method: "POST",
    }).text();
  } catch (e: any) {
    console.log(e);
  }
  isListening.value = false;
};

const handleSpeech = () => {
  if (isListening.value) {
    speech.stop();
    useFunction();
  } else {
    message.value = "";
    speech.start();
  }
};

watch(result, (val) => {
  if (val) {
    message.value = val;
  }
});
</script>
<template>
  <div
    class="col h-90vh mt-10 px-2 overflow-auto gap-8 center w-72 text-white max-w-72 mr-16"
    v-if="store.currentNamespace.ref"
  >
    <PubSub :namespace="store.currentNamespace" v-if="store.currentNamespace">
      <template #default="{ state }">
        <div class="col center" v-for="r in state">
          <div v-if="r.name === 'chat'">
            <TextBlock class="p-8" :content="r.data" :mounted="true" />
            <div class="mt-2 text-start text-xs text-caption"> {{ new Date().toLocaleTimeString() }}</div>
            </div>
        </div>
      </template>
    </PubSub>
    <div class="z-50">
      <Icon
        icon="mdi-microphone"
        class="x2 bottom-8 right-4 absolute chat-mic-btn"
        @click="handleSpeech"
        v-if="!isListening"
      />
      <Icon
        icon="mdi-microphone-off"
        class="x2 bottom-8 right-4 absolute chat-mic-btn"
        @click="useFunction"
        v-if="isListening"
      />
    </div>
  </div>
</template>
