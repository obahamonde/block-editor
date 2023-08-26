<script setup lang="ts">
const props = defineProps<{
  url: string;
  contentType: string;
}>();
</script>
<template>
  <div class="col center">
    <img v-if="props.contentType.includes('image')" :src="props.url" />
    <video
      v-else-if="props.contentType.includes('video')"
      :src="props.url"
      controls
    ></video>
    <audio
      v-else-if="props.contentType.includes('audio')"
      :src="props.url"
      controls
    ></audio>
    <iframe
      v-else-if="props.contentType.includes('pdf')"
      :src="props.url"
      class="w-100 h-100"
    ></iframe>
    <p v-else>
      <a
        :href="props.url"
        class="text-center bg-gray-500 px-2 py-1 sh"
        target="_blank"
        >Download</a
      >
    </p>
  </div>
</template>
