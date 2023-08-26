import { defineStore, acceptHMRUpdate } from "pinia";
import type { Message, Namespace } from "~/types";

export const useChatStore = defineStore("chat", () => {
  const state = reactive({
    messages: [] as Message[],
    namespaces: [] as Namespace[],
    currentNamespace: {} as Namespace,
  });

  return { state };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot));
}
