import { BlockMapping } from "~/types";
import { Editor } from "@tiptap/vue-3";
export const useSlash = (editor: Editor) => {
  const startWithSlash = computed(() => {
    const editorText = editor.getHTML();
    return editorText.startsWith("/");
  });
  const text = computed(() => {
    if (!startWithSlash.value) return "...";
    return editor.getText();
  });
  const options = computed(() => {
    return Object.keys(BlockMapping).filter((key) => {
      return key.startsWith(text.value);
    });
  });
  return {
    startWithSlash,
    text,
    options,
  };
};
