<script setup lang="ts">
const props = defineProps({
	content: String
})
</script>
<template>
<div class="markdown-body" v-html="props.content"></div>
</template>
<style scoped lang="scss">

.markdown-body {
  font-family: "Open Sans", sans-serif;
  font-size: 1.0em;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  margin: 0 auto;
  max-width: 768px;
	min-width: 768px;
  min-height: 100vh;
  background-color: #fff;
  color: #333;
  transition: 0.2s;
	overflow-y: auto;


}
</style>