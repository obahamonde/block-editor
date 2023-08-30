<script setup lang="ts">
import TextBlock from '~/lib/TextBlock.vue';
const props = defineProps<{
  image: string;
  content: string;
  ts?: number;
  reverse?: boolean;
  author?: string;
}>();
</script>
<template>
  <div class="message-wrapper" :class="{ reverse: props.reverse }">
    <img class="message-pp" :src="props.image" alt="profile-pic" />
    <div class="message-box-wrapper">
      <TextBlock :content="props.content" />
    </div>
  </div>
</template>
