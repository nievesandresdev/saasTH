import { onMounted, onUnmounted, ref } from 'vue';

export default function useClickOutside(callback) {
  const elementRef = ref(null);

  const handleClickOutside = (event) => {
    if (elementRef.value && !elementRef.value.contains(event.target)) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });

  return { elementRef };
}
