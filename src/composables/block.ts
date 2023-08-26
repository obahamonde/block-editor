import { BlockType, Detail, Block, Page } from "~/types";

export const useBlock = () => {
  const blocks = ref<Block[]>([]);

  const addBlock = (block: Block) => {
    blocks.value.push(block);
  };

  const updateBlock = (block: Block) => {
    const index = blocks.value.findIndex((b) => b.id === block.id);
    if (index > -1) {
      blocks.value[index] = block;
    }
  };

  const removeBlock = (block: Block) => {
    const index = blocks.value.findIndex((b) => b.id === block.id);
    if (index > -1) {
      blocks.value.splice(index, 1);
    }
  };

  const clearBlocks = () => {
    blocks.value = [];
  };

  return {
    blocks,
    addBlock,
    updateBlock,
    removeBlock,
    clearBlocks,
  };
};
