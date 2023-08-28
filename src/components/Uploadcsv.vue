<script setup lang="ts">
import type { FileData, DataVisualization } from "~/types";

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

const dataviz = ref<DataVisualization | null>(null);

const dropZoneRef = ref<HTMLElement>();
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

const { state } = useChatStore();

const uploadFiles = async () => {
  const formData = new FormData();
  formData.append("file", fileData.value[0].file);
  const url = `/api/load/csv/${state.currentNamespace.ref}`;
  const { data } = await useFetch(url, {
    method: "POST",
    body: formData,
  });
  console.log(unref(data));
  dataviz.value = unref(data) as DataVisualization;
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
    class="col center py-4 sh m-4 w-72"
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
  <DataViz v-if="dataviz" :dataviz="dataviz" />
</template>
