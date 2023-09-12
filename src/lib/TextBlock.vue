<script setup lang="ts">
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
const { fetchVoice } = useSpeech();
const props = defineProps({
  content: {
    type: String,
    default: "",
  },
  mounted:{
    type: Boolean,
    default: false,
  }
});
const md = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str: any, lang: any): any => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }
    return (
      '<pre class="hljs" ><code >' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});
onBeforeMount(async () => {
  if (!props.mounted) return;
  await fetchVoice(props.content);
});

</script>
<template>
  <div
    class="markdown-body bg-gray-500 text-white rounded sh max-w-lg text-xs p-2"
    v-html="md.render(props.content)"
  ></div>
</template>
