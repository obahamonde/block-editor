<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

const props = defineProps({
  content: {
    type: String,
    default: "",
  },
});

const editor= useEditor({
  extensions: [
    StarterKit,
    Link.configure({ openOnClick: true }),
    Image.configure(),
  ],
  content: props.content,
});


const onTab = (e: KeyboardEvent) => {
  e.preventDefault();
  if (!editor.value) return;
  editor.value.chain().insertContent("\t").run();
};


defineExpose(
  {
    editor
  }
)
</script>
<template>
<div class="min-w-168 w-full mt-6">
    <EditorContent
       class="tiptap bg-white  min-h-80vh text-black p-8 rounded sh"
      :editor="editor"
      @keydown.tab="onTab"
      />

  </div>
</template>
<style lang="scss">

/* Basic editor styles */
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }
  img {
    max-width: 50%;
  }
}
</style>
