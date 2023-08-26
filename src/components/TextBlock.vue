<script setup lang="ts">
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
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
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});

const props = defineProps({
  content: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <div
    class="markdown-body bg-gray-400 rounded sh"
    v-html="md.render(props.content)"
  ></div>
</template>
