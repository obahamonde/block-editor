<script setup lang="ts">
import { useEditor, EditorContent, Editor } from "@tiptap/vue-3";
import { ShallowRef } from "vue";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TaskItem from "@tiptap/extension-task-item";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { Block, BlockMapping, User, Namespace } from "~/types";
import { v4 as uuid4 } from "uuid";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
const props = defineProps<{
  user: User;
}>();
const { useColor } = useUtils();
const ydoc = new Y.Doc();
const provider = new WebrtcProvider("block-editor", ydoc);
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
const blocks = ref<Block[]>([]);
watch(
  () => editor.value?.getHTML(),
  (newContent) => {
    if (!editor.value) return;
    if (!newContent) return;
    if (blocks.value.length > 0) {
      const lastBlock = blocks.value[blocks.value.length - 1];
      lastBlock.content = newContent;
    }
    editor.value
      .chain()
      .focus()
      .setTextSelection(editor.value.state.doc.content.size)
      .run();
  },
);

const isSlash = computed(() => {
  if (!editor.value) return false;
  const _ = editor.value.getText().startsWith("/");
  if (_ === undefined) return false;
  selectRef.value?.focus();
  return _;
});

const availableComponents = ref(Object.keys(BlockMapping)); // Assuming BlockMapping is an object where keys are component names

const filteredComponents = computed(() => {
  if (!editor.value) return [];
  const textAfterSlash = editor.value.getText().substring(1); // Remove the leading '/'
  return availableComponents.value.filter((comp) =>
    comp.toLowerCase().includes(textAfterSlash.toLowerCase()),
  );
});

const selectRef = ref(null) as Ref<HTMLSelectElement | null>;

watch(
  () => isSlash,
  async (newVal) => {
    if (newVal) {
      await nextTick(); // Wait for the DOM to update
      selectRef.value?.focus(); // Focus the select element
    }
  },
);

const hoveredBlockId = ref<string>("");
const selectedComponent = ref<"TextBlock">();
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === "Enter") {
    if (!editor.value) return;
    const newBlock: Block = {
      id: uuid4(),
      type: "TextBlock",
      content: editor.value.getHTML(),
    };
    blocks.value.push(newBlock);
    editor.value.commands.clearContent();
  } else {
    return;
  }
};

const deleteBlock = (id: string) => {
  const block = blocks.value.filter((block) => block.id !== id);
  blocks.value.splice(0, blocks.value.length, ...block);
};

const insertBlock = (component: "TextBlock") => {
  if (!editor.value) return;
  const newBlock: Block = {
    id: uuid4(),
    type: component,
    content: "",
  };
  blocks.value.push(newBlock);
  editor.value.commands.clearContent();
};

const handleComponentClick = (componentType: "TextBlock") => {
  insertBlock(componentType);
  selectedComponent.value = undefined; // Reset the selected component
};

onMounted(() => {
  if (!editor.value) return;
  editor.value.commands.focus();
  blocks.value.push({
    id: uuid4(),
    type: "TextBlock",
    content: `<h1>Title</h1>`,
  });
});
</script>
<template>
  <div v-if="isSlash">HI</div>
  <div class="col start absolute tl m-8">
    <EditorContent
      :editor="editor"
      class="opacity-0 x1 overflow-hidden"
      @keydown="handleKeyDown"
    />
    <div
      v-for="block in blocks"
      :key="block.id"
      class="row"
      @click="editor?.commands.focus()"
    >
      <div v-if="isSlash" class="tooltip-dropdown">
        <select
          ref="selectRef"
          v-model="selectedComponent"
          @change="handleComponentClick(selectedComponent!)"
        >
          <option
            v-for="component in filteredComponents"
            :key="component"
            :value="component"
          >
            {{ component }}
          </option>
        </select>
      </div>
      <p
        class="col start my-2 py-2 gap-2 h-full sh"
        @mouseover="hoveredBlockId = block.id"
        @mouseleave="hoveredBlockId = ''"
      >
        <Icon
          icon="mdi-delete"
          @click="deleteBlock(block.id)"
          class="cp scale"
        />
        <Icon icon="mdi-drag" class="cursor-move scale" />
        <Icon icon="mdi-dots-vertical" class="cp scale" />
      </p>

      <component
        :is="BlockMapping[block.type]"
        class="w-50vw"
        :content="block.content"
      >
      </component>
    </div>
  </div>
</template>
<style lang="scss">
.tooltip-dropdown {
  position: absolute;
  margin-top: 1rem;
  margin-left: 2rem;
  background-color: #444;
  border: 1px solid #ccc;
  z-index: 1000;
  /* Add more styles as needed */
}

/* Basic editor styles */
.tiptap {
  > * + * {
    margin-top: 0.75em;
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
</style>
