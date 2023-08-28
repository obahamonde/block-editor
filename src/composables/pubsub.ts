import type { Namespace, FunctionCall } from "~/types";

export const usePubSub = (namespace: Namespace) => {
  const { data, error, close, eventSource } = useEventSource(
    `/api/subscription/${namespace.ref}`,
  );



  const result = computed(() => {
    if (!data.value) return;
    return JSON.parse(data.value) as FunctionCall;
  });


  onBeforeUnmount(() => {
    close();
  });

  return {
    error,
    eventSource,
    result,
  };
};
