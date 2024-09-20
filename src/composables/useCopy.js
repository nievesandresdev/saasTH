import { ref } from 'vue';

export function useCopy() {
  const isCopied = ref(false);
  const error = ref(null);

  const load = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      isCopied.value = true;

      // Reset the copied state after a short delay
      setTimeout(() => {
        isCopied.value = false;
      }, 2000);
    } catch (err) {
      error.value = 'Failed to copy!';
      console.error('Error copying text: ', err);
    }
  };

  return {
    isCopied,
    error,
    load,
  };
}