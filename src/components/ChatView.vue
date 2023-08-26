<script setup lang="ts">
import type { User } from "~/types";
const currentNamespace = ref("default");
const props = defineProps<{
  user: User;
}>();
</script>

<template>
  <div class="app-container">
    <div class="app-left">
      <AppTitle />
      <ProfileBox :user="props.user" />
      <ChatList :user="props.user" @change="currentNamespace = $event" />
    </div>
    <div class="app-main">
      <ChatContainer :user="props.user" :namespace="currentNamespace" />
    </div>
    <div class="app-right mt-16">
      <div class="b-2 b-blue rounded my-2">
        <UploadZone :user="props.user" />
      </div>
      <div class="app-activity-box">
        <Stats />
        <ActivityInfo />
      </div>
    </div>
  </div>
</template>
