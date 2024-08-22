// useMouseHandle.js
import { ref, onMounted, onUnmounted } from 'vue';

export function useMouseHandle() {
  const mouseDownInside = ref(false);

  const handleMouseDown = () => {
    // Indica que el clic comenzó dentro del modal
    mouseDownInside.value = false;
  };

  const handleMouseLeave = () => {
    // Indica que el mouse ha salido del modal, y decide no cerrar el modal
    console.log("Mouse salió del modal: No cerrar el modal.");
    mouseDownInside.value = true;
  };

  // Añadir los event listeners cuando el componente que use este composable se monte
  onMounted(() => {
    window.addEventListener('mousedown', handleMouseDown);
    // Aquí podrías añadir también el manejo para mouseup si fuera necesario en el futuro
  });

  // Eliminar los event listeners cuando el componente se desmonte
  onUnmounted(() => {
    window.removeEventListener('mousedown', handleMouseDown);
    // Igualmente para mouseup si lo añades
  });

  return {
    mouseDownInside,
    handleMouseDown,
    handleMouseLeave
  };
}
