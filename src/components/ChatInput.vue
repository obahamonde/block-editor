<script setup lang="ts">
const text = ref("");
const { isListening, speech, result } = useSpeech();
watch(result, (val) => {
  if (val) {
    text.value = val;
  }
});

const handleSpeech = () => {
  if (isListening.value) {
    speech.stop();
  } else {
    text.value = "";
    speech.start();
  }
};
</script>

<template>
  <div class="col center">
  <div class="chat-input-wrapper fixed bottom-4">
    <div class="input-wrapper">
      <input
        type="text"
        class="chat-input"
        placeholder="Enter your message here"
        v-model="text"
        @keyup.enter="
          $emit('send', text);
          text = '';
        "
      />
      </div>
      <button class="chat-mic-btn cp scale">
        <Icon
          :icon="!isListening ? 'mdi-microphone' : 'mdi-microphone-off'"
          class="x1"
          @click="handleSpeech"
        />
      </button>
    </div>
  </div>
</template>
