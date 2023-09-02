<script setup lang="ts">
const router = useRouter();
</script>

<template>
  <div class="app-left-header hover:brightness-200 cp rounded-xl row center py-4 px-2"
    @click="router.push('/')"
  >
    <div class="app-logo ">
      <img src="/logo.png" class="x4 cp hover:animate-pulse" alt="logo" />
    </div>
    <h1 class="text-success text-title text-4xl">AioFauna</h1>
  </div>
</template>
