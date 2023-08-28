<script setup lang="ts">
import type { Namespace } from "~/types";
const { state, setState } = useState();
const props = defineProps<{
  namespace: Namespace;
}>();
const { error, result } = usePubSub(props.namespace);
watch(result, (val) => {
  if (val) {
  setState(val)
  }
});

</script>
<template>
  <slot :error="error" :state="state" />
</template>
