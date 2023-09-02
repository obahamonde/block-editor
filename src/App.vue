<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: "AioFauna",
  meta: [
    { name: "description", content: "The framework for building AI first applications" }
  ],
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: () => "/logo.png",
    },
  ],
});
</script>

<template>
  <RouterView />
</template>