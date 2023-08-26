<script setup lang="ts">
import type { Namespace, User } from "~/types";

const props = defineProps<{
  user: User;
}>();

const emit = defineEmits(["change"]);
const { state } = useChatStore();
const createNamespace = async () => {
  const { data } = await useFetch(
    "/api/namespace/new?user=" + props.user.ref,
  ).json();
  const namespace: Namespace = unref(data) as Namespace;
  state.namespaces.unshift(namespace);
  state.currentNamespace = namespace;
  state.currentNamespace.messages = [];
  await fetchNamespaces();
};
const fetchNamespaces = async () => {
  const { data } = await useFetch(
    "/api/namespace/list?user=" + props.user.ref,
  ).json();
  const namespaces: Namespace[] = unref(data) as Namespace[];
  state.namespaces = namespaces ? namespaces : [];
};

const deleteNamespace = async (namespace: Namespace) => {
  await useFetch("/api/namespace?id=" + namespace.ref, {
    method: "DELETE",
  }).json();
  await fetchNamespaces();
};

onMounted(async () => {
  await fetchNamespaces();
});

const handleNamespaceChange = async (namespace: Namespace) => {
  const { data } = await useFetch("/api/namespace/get/" + namespace.ref).json();
  const newNamespace: Namespace = unref(data) as Namespace;
  state.currentNamespace = newNamespace;
  emit("change", newNamespace.ref);
};
</script>

<template>
  <div class="chat-list-wrapper">
    <div class="chat-list-header">
      New Conversation <span class="c-number" @click="createNamespace">+</span>
      <Icon icon="mdi-chevron-down" class="m-2" />
    </div>
    <ul class="chat-list active" v-if="state.namespaces.length > 0">
      <li
        v-for="namespace in state.namespaces"
        class="chat-list-item"
        :class="state.currentNamespace.ref == namespace.ref ? 'active' : ''"
        @click="handleNamespaceChange(namespace)"
      >
        <Icon icon="mdi-chat" class="x1 mx-1" />
        <span class="chat-list-name"
          >{{ namespace.title.substring(0, 36) }}...</span
        >
        <Icon
          icon="mdi-delete"
          class="m-2 text-warning hover:text-error"
          @click="deleteNamespace(namespace)"
        />
      </li>
    </ul>
  </div>
</template>
