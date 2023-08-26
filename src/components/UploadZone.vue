<script setup lang="ts">
import type { User } from "~/types";
import type { FileData } from "~/types";

const props = defineProps<{
  user: User;
}>();

const fileData = ref<FileData[]>([]);

const onDrop = (files: File[] | null) => {
  if (files) {
    fileData.value = files.map((file) => ({
      name: file.name,
      size: file.size,
      contentType: file.type,
      lastModified: file.lastModified,
      url: URL.createObjectURL(file),
      file: file,
    }));
  }
};
const dropZoneRef = ref<HTMLElement>();
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

const { state } = useChatStore();

const uploadFiles = async () => {
  fileData.value.forEach(async (file: FileData) => {
    const formData = new FormData();
    formData.append("file", file.file);
    const url = `/api/upload/${state.currentNamespace.ref}?user=${props.user.ref}&size=${file.size}`;
    await useFetch(url, {
      method: "POST",
      body: formData,
    });
  });
  fileData.value = [];
};
const handleClick = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.onchange = (e) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files) return;
    onDrop(Array.from(files));
  };
  input.click();
};
</script>

<template>
  <div
    ref="dropZoneRef"
    class="cp col center py-4 sh p-8 w-full"
    :class="
      isOverDropZone ? 'bg-gray-500 b-success b-2 b-dashed' : 'bg-black-200/10'
    "
  >
    <p @click="handleClick">Drop Files</p>
    <button
      class="archive-btn px-4 py-2 hover:bg-success scale cp hover:text-primary"
      @click="uploadFiles"
    >
      Upload
    </button>
    <section class="row start max-w-56 gap-12 overflow-x-auto px-12">
      <div
        v-for="(file, index) in fileData"
        :key="index"
        class="w-200px bg-black-200/10 m-2 p-4"
      >
        <p class="text-success text-center">{{ file.name }}</p>
        <p class="text-caption">{{ (file.size / 1000).toFixed(2) }} KB</p>
        <p class="text-caption">{{ file.contentType }}</p>
        <Thumbnail :url="file.url" :contentType="file.contentType" />
      </div>
    </section>
  </div>
</template>
