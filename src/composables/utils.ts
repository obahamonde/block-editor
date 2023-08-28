export const useUtils = () => {
  const useTypeWriter = (message: Ref<string>) => {
    for (let i = 0; i < message.value.length; i++) {
      setTimeout(() => {
        message.value += message.value[i];
      }, 100 * i);
    }
  };
  const useCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  const usePlay = (audio: string) => {
    const audioElement = new Audio(audio);
    audioElement.play();
  };

  const useColor = () => {
    const chars = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += chars[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return {
    useTypeWriter,
    useCopy,
    usePlay,
    useColor,
  };
};
