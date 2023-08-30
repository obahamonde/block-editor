<script setup lang="ts">
import blocks from "~/lib"
const { state: store } = useChatStore();
const message = ref("");
const { isListening, speech, result } = useSpeech();

const MAPPING:Record<string,Component> = {
  chat: blocks.TextBlock,
  google_search: blocks.GoogleSearch,
  code_server: blocks.CodeServer,
  blog: blocks.BlogPost,
  song: blocks.Songs,
};

const useFunction = async () => {
  if (!message.value) return;
  if (!store.currentNamespace) return;
  try {
    const namespace = store.currentNamespace.ref;
    await useFetch(`/api/subscription/${namespace}?text=` + message.value, {
      method: "POST",
    }).text();
  } catch (e: any) {
    console.log(e);
  }
  message.value = "";
  isListening.value = false;
};

const handleSpeech = () => {
  if (isListening.value) {
    speech.stop();
    useFunction();
  } else {
    
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
    class="col center h-90vh pt-24   overflow-auto gap-8 center w-full text-white max-w-96 min-w-72"
    v-if="store.currentNamespace"
  >
    <PubSub :namespace="store.currentNamespace" v-if="store.currentNamespace">
      <template #default="{ state }">
        <div class="col center w-full pt-16 h-70vh overflow-auto" v-for="r in state">
          <component
            :is="MAPPING[r.name]"
            :content="r.data"
            :mounted="true"
          />
        </div>
      </template>
    </PubSub>
  
    <div class="z-50">
      <Icon
      :icon="!isListening ? 'mdi-microphone' : 'mdi-microphone-off'"
        class="x2 bottom-8 right-4 absolute chat-mic-btn"
        @click="handleSpeech"
      />
    </div>
  
  </div>
  <div v-else class="col center w-full">
      <p class="text-caption mr-16">Select a namespace to start using tools</p>
    </div>

    
      <input type="text" v-model="message" class="input br fixed mr-16 mb-9 bg-gray-500"
        @keyup.enter="useFunction()"
      />

</template>


<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
  margin-top: 10px;
  margin-right: 4rem;
  padding: 0 2px;
  overflow: auto;
  gap: 8px;
  width: 100%;
  text-align: center;
  color: white;
}

/* For tablets */
@media (min-width: 768px) {
  .main-container {
    max-width: 512px;
  }
}

/* For small laptops */
@media (min-width: 1024px) {
  .main-container {
    max-width: 768px;
  }
}

/* For laptops and desktops */
@media (min-width: 1280px) {
  .main-container {
    max-width: 1024px;
  }
}

/* For large screens */
@media (min-width: 1440px) {
  .main-container {
    max-width: 1280px;
  }
}
</style>