<template>
  <label 
    v-if="textLabel" 
    class="text-sm font-medium leading-[140%] block mb-2 htext-black-100"
    >{{ textLabel }}</label>
    <p v-if="textDescription" class="text-sm mb-2 leading-[140%]">{{ textDescription }}</p>
  <div>
    <textarea
      :id="id"
      class="auto-height th-Input p-input-textarea w-full block overflow-y-hidden"
      :class="{
          'border-input-error': isEmpty || text.length == 0
      }"
      v-model="text"
      @input="handleInput"
      @keydown="handleKeyDown"
      @focus="handleFocus"
      @blur="checkEmpty"
      placeholder="Debes introducir un texto"
    ></textarea>
    <div class="flex items-center mt-1">
      <div v-if="errorText && (isEmpty || text.length == 0)" class="flex items-center">
        <img class="inline w-4 h-4 mr-2" src="/assets/icons/1.TH.WARNING.RED.svg">
        <p class="text-xs leading-[90%] htext-alert-negative">{{errorText}}</p>
      </div>
      <p class="text-xs font-medium leading-[90%] htext-gray-500 text-right ml-auto">{{ text.length }}/{{ wordLimit }}</p>
    </div>
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
  },
  errorText: {
    type: String,
    default: null
  },
  textLabel: {
    type: String,
    default: null
  },
  textDescription: {  
    type: String,
    default: null
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
    height: auto !important;
    min-height: 40px;
    resize: none;
}
</style>
  