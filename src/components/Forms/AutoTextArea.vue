<template>
  <div>
    <textarea
      :id="id"
      class="auto-height p-3 text-sm leading-[140%] w-full border rounded-[6px] block overflow-y-hidden"
      :class="{
          'hborder-black-100 hover-htext-green-600 hover-hborder-green-600': text.length > 0,
          'placeholder-negative htext-alert-negative hborder-negative': isEmpty || text.length == 0
      }"
      v-model="text"
      @input="handleInput"
      @keydown="handleKeyDown"
      @focus="handleFocus"
      @blur="checkEmpty"
      placeholder="Debes introducir un texto"
    ></textarea>
    <p class="mt-2 text-xs leading-[90%] htext-gray-500 text-right">{{ text.length }}/{{ wordLimit }}</p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';

const props = defineProps({
  modelValue: String,
  id: {
    type: String,
    default: 'AutoTextArea1'
  },
  wordLimit: {
    type: Number,
    default: 150
  },
  mandatory: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['update:modelValue', 'empty']);

const text = ref(props.modelValue || '');
const isEmpty = ref(!text.value);

watch(text, (newValue, oldValue) => {
  // Asegurarse de no exceder el límite en la reactividad
  if (newValue.length > props.wordLimit) {
    text.value = newValue.slice(0, props.wordLimit);
  }
  emits('update:modelValue', text.value);
  if (text.value.length === 0 && oldValue.length > 0) {
    emits('empty', true);
  } else if (text.value.length > 0 && oldValue.length === 0) {
    emits('empty', false);
  }
});

const handleInput = (event) => {
  let inputValue = event.target.value;
  if (inputValue.length > props.wordLimit) {
    // Truncar el texto si excede el límite
    inputValue = inputValue.slice(0, props.wordLimit);
    event.target.value = inputValue; // Ajustar visualmente el valor del textarea
  }
  text.value = inputValue; // Actualizar el modelo de datos
  autoResize(event.target);
};

const handleKeyDown = (event) => {
  // Permitir acciones comunes y limitar la entrada cuando se alcanza el límite
  if (text.value.length >= props.wordLimit && !["Backspace", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
    event.preventDefault();
  }
};

const checkEmpty = () => {
  isEmpty.value = text.value.length === 0;
};

const handleFocus = (event) => {
  autoResize(event.target);
};

const autoResize = (textarea) => {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
};

onMounted(() => {
  nextTick(() => {
    const textarea = document.getElementById(props.id);
    if (textarea) {
      autoResize(textarea);
    }
  });
});
</script>


  
  
<style scoped>
textarea:focus{
    border-color:initial;
}
.auto-height {
    min-height: 40px;
    resize: none;
}
</style>
  