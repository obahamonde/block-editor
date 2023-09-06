export const useCompletion = () => {
  const text = ref('')

  const complete = async (txt: string) => {
    const { data } = await useFetch("/api/completion/" + txt).text()
    text.value = unref(data) as string
  }

  return { text, complete }
}