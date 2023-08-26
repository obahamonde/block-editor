<script setup lang="ts">
import { WordCount, BookOrDocument } from "~/types";

const wordCloud = ref<WordCount[]>([]);

const bookOrDocuments = ref<BookOrDocument[]>([]);

const { state } = useChatStore();

const computedSized: ComputedRef<WordCount[]> = computed(() => {
  const maxValue = Math.max(...wordCloud.value.map((word) => word.count));
  const minValue = Math.min(...wordCloud.value.map((word) => word.count));
  const maxFontSize = 50;
  const minFontSize = 10;
  const size = (count: number) => {
    const size =
      ((count - minValue) / (maxValue - minValue)) *
        (maxFontSize - minFontSize) +
      minFontSize;
    return Math.round(size);
  };
  return wordCloud.value.map((word) => ({ ...word, count: size(word.count) }));
});
const randomizePosition = (wordCloud: WordCount[]) => {
  const random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);
  const randomPosition = (word: WordCount) => {
    const x = random(10, 90);
    const y = random(60, 80);
    return { ...word, x, y };
  };
  return wordCloud.map(randomPosition);
};

const fetchBookOrDocuments = async () => {
  const url = `/api/books/${state.currentNamespace.ref}`;
  const { data } = await useFetch(url).json();
  bookOrDocuments.value = unref(data) as BookOrDocument[];
};

onMounted(fetchBookOrDocuments);

const showWordCloud = ref<boolean>(false);

const handleClick = (bookOrDocument: BookOrDocument) => {
  wordCloud.value = bookOrDocument.wordcloud;
  showWordCloud.value = true;
};
</script>
<template>
  <div v-for="document in bookOrDocuments">
    {{ document.title }}
    <button class="btn-get" @click="handleClick(document)">
      Show Word Cloud
    </button>
  </div>

  <div
    v-if="showWordCloud"
    @click="showWordCloud = false"
    class="word-cloud-wrapper"
  >
    <div class="word-cloud">
      <div
        v-for="word in randomizePosition(computedSized)"
        :style="{
          fontSize: word.count + 'px',
          left: word.x + '%',
          top: word.y + '%',
          position: 'absolute',
        }"
      >
        {{ word.word }}
      </div>
    </div>
  </div>
</template>
