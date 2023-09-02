<script setup lang="ts">
import { useEditor, EditorContent, Editor } from "@tiptap/vue-3";
import { ShallowRef } from "vue";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TaskItem from "@tiptap/extension-task-item";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { Namespace, User } from "~/types";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
const { useColor } = useUtils();
const props = defineProps<{
	namespace: Namespace;
	user: User;
}>();
const ydoc = new Y.Doc();
const provider = new WebrtcProvider(props.namespace.ref, ydoc);
const editor: ShallowRef<Editor | undefined> = useEditor({
  extensions: [
    StarterKit,
    Link.configure({ openOnClick: true }),
    Image.configure(),
    TaskItem.configure({ nested: true }),
    Collaboration.configure({ document: ydoc }),
    CollaborationCursor.configure({
      provider: provider,
      user: {
        name: props.user.name,
        color: useColor(),
        avatar: props.user.picture,
      },
    }),
  ],
  content: `Title`,
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

const onTab = (e: KeyboardEvent) => {
  e.preventDefault();
  if (!editor.value) return;
  editor.value.chain().insertContent("\t").run();
};

const modelValue = ref<string>("");



defineExpose(
  {
    editor,
    modelValue,
  }
)
</script>
<template>
  <div class="h-screen min-w-168 max-w-196">
    <EditorContent
       class="tiptap bg-white text-black p-8"
      :editor="editor"
      v-model:model-value="modelValue"
      @keydown.tab="onTab"
      

      />
  </div>
</template>
<style lang="scss">
.tooltip-dropdown {
  position: absolute;
  margin-top: 1rem;
  margin-left: 2rem;
  background-color: #444;
  border: 1px solid #000;
  z-index: 1000;
  
}
/* Basic editor styles */
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }
  img {
    max-width: 50%;
  }
}

/* Placeholder (at the top) */
.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
    color: #adb5bd;
  pointer-events: none;
  height: 0;
}

/* Give a remote user a caret */
.collaboration-cursor__caret {
  position: relative;
  margin-left: -1px;
  margin-right: -1px;
  border-left: 1px solid #0d0d0d;
  border-right: 1px solid #0d0d0d;
  word-break: normal;
  pointer-events: none;
}

/* Render the username above the caret */
.collaboration-cursor__label {
  position: absolute;
  top: -1.4em;
  left: -1px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  user-select: none;
  color: #0d0d0d;
  padding: 0.1rem 0.3rem;
  border-radius: 3px 3px 3px 0;
  white-space: nowrap;
}

textarea,input,.tiptap {
  border: none !important; /* Use !important to override any existing styles */
}
</style>
