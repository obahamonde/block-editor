<script setup lang="ts">
import type { User } from "~/types";
const props = defineProps<{
  user: User;
}>();
const showSubMenu = ref(false);
</script>

<template>
  <div class="app-profile-box">
    <img :src="props.user.picture" alt="profile" />
    <div class="app-profile-box-name">
      {{ props.user.name }}
      <button class="app-setting">
        <Icon icon="mdi-cog" @click="showSubMenu = !showSubMenu" />
      </button>
    </div>
    <p class="app-profile-box-title">{{ props.user.email }}</p>
    <div class="switch-status">
      <input type="checkbox" name="switchStatus" id="switchStatus" checked />
      <label class="label-toggle" for="switchStatus"></label>
      <span class="toggle-text toggle-online">Online</span>
      <span class="toggle-text toggle-offline">Offline</span>
    </div>
  </div>
</template>
