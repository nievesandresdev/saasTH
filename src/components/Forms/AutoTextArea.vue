<template>
    <div>
        <textarea
            :id="id"
            class="auto-height p-2 text-sm leading-[120%] w-full border rounded-[6px] block overflow-y-hidden"
            :class="{
                'hborder-black-100 hover-htext-green-600 hover-hborder-green-600':text.length > 0,
                'placeholder-negative htext-alert-negative hborder-negative': isEmpty || text.length == 0
            }"
            v-model="text"
            @input="handleInput"
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
  const minHeight = 40; // Min height for textarea
  
  watch(text, (newValue, oldValue) => {
    emits('update:modelValue', newValue);
    if (newValue.length === 0 && oldValue.length > 0) {
      emits('empty', true);
    } else if (newValue.length > 0 && oldValue.length === 0) {
      emits('empty', false);
    }
  });
  
  const isEmpty = ref(!text.value);
  
  const handleInput = (event) => {
    text.value = event.target.value;
    autoResize(event.target);
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
  