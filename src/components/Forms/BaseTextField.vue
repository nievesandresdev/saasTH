<template>
  <label 
    v-if="textLabel" 
    class="text-sm font-medium leading-[140%] block mb-2"
    :class="desactivated ? 'htext-read-only-desactivated' : 'htext-black-100'"
    >{{ textLabel }}</label>
  <div class="relative" :class="classContent">
    <img
      v-if="prependInnerIcon"
      :src="prependInnerIcon"
      alt="prepend inner icon"
      class="absolute left-3 top-[7.5px] w-6 h-6 z-10"
    >
    <div class="relative">
      <input
        ref="inputElement"
        :id="inputId"
        :type="type"
        :value="inputValue"
        @input="updateValue($event.target.value)"
        class="w-full border-[2px] rounded-[6px]"
        :class="`${customInputClass} ${bgClasses} ${borderClasses} ${desactivated ? 'htext-read-only-desactivated italic' : 'htext-black-100'}`"
        :placeholder="placeholder"
        :minlength="min"
        :maxlength="max"
        @keyup.enter="searchbyenter"
        @keypress="searchbyKey"
        @keyup.prevent="handleKeyup"
        @click="onClick"
        @blur="handleBlur"
        @focus="handleFocus"
        :disabled="disabled"
      >
      <div v-if="(safeErrors[name] && safeErrors[name] != true) || max" class="flex w-full" :class="!(safeErrors[name] && safeErrors[name] != true) && max ? 'justify-end' : 'justify-between'">
        <p v-if="safeErrors[name] && safeErrors[name] != true" class="text-xs leading-[90%] text-left mt-1 flex items-center htext-alert-negative">
          <img class="inline w-4 h-4 mr-2" src="/assets/icons/1.TH.WARNING.RED.svg">
          {{ safeErrors[name] }}
        </p>
        <p class="text-[12px] htext-gray-500 text-right mt-[4px]">{{ max ? `${inputValue?.length || 0}/${max || 0}` : '' }}</p>
      </div>
    </div>
    <button
      v-if="appendInnerIcon?.icon && appendInnerIcon?.type === 'BUTTON' && appendInnerIcon?.show"
      class="absolute right-3 top-2"
      @click="$emit('click:appendInner')"
    >
      <img class="w-6 h-6" :src="appendInnerIcon.icon" alt="append inner icon">
    </button>
    <img
      v-if="appendInnerIcon?.icon && appendInnerIcon?.type === 'ICON' && appendInnerIcon?.show"
      class="w-6 h-6 absolute right-3 top-3"
      :src="appendInnerIcon.icon"
      alt="append inner icon"
    >
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const emit = defineEmits([
  'click:appendInner',
  'update:modelValue',
  'blur:validate',
  'enter:search',
  'enter:key',
  'input:typing',
  'click',
  'keyup:prevent',
  'input:search',
]);

const props = defineProps({
  type: { type: String, default: 'text' },
  textLabel: { type: String, default: null },
  classContent: { type: String, default: '' },
  classInput: { type: String, default: '' },
  prependInnerIcon: { type: String, default: '' },
  appendInnerIcon: {
    type: Object,
    default: () => ({ icon: null, type: null, show: false }),
  },
  placeholder: { type: String, default: '' },
  modelValue: { type: [String, Number], default: '' },
  min: { type: Number, default: null },
  max: { type: Number, default: null },
  name: { type: String, default: '' },
  error: { type: Boolean, default: false },
  isPrice: { type: Boolean, default: false },
  errors: {
    type: Object,
    default: () => ({}),
  },
  disabled: { type: Boolean, default: false },
  desactivated: { type: Boolean, default: false },
  inputId: { type: String, default: 'InputData' },
  // Prop para configurar la cantidad de decimales deseados
  decimals: { type: Number, default: 2 },
});

// Crea una copia segura del prop errors para evitar warnings
const safeErrors = computed(() => {
  return props.errors || {};
});

const inputValue = ref(props.modelValue);
const isFocused = ref(false);

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue);
  emit('input:typing', newValue);
  // emit('blur:validate');
});

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue;
  }
);

const customInputClass = computed(() => {
  let c = `${props.classInput} py-2 px-3 h-10 text-sm font-medium leading-[140%]`;
  if (props.prependInnerIcon) {
    c += ' pl-11';
  }
  if (safeErrors.value?.[props.name] && safeErrors.value?.[props.name] != true) {
    c += ' hborder-alert-negative';
  }
  return c;
});

const bgClasses = computed(() => {
  if(props.disabled || props.desactivated) return 'cursor-not-allowed hbg-disabled-input'
  if(!isFocused.value) return 'bg-white hover-hbg-gray-200'
  return 'bg-white';
});

const borderClasses = computed(() => {
  if(props.disabled || props.desactivated) return 'hborder-disabled-input'
  if(props.error) return 'hborder-alert-negative'
  if(isFocused.value) return 'hborder-green-600'
  return 'hborder-gray-400';
});

const updateValue = (value) => {
  inputValue.value = value;
};

const onClick = () => {
  emit('click');
};

// Función para formatear el número al perder el foco
const handleBlur = () => {
  isFocused.value = false;
  if (props.isPrice && inputValue.value !== '') {
    const num = parseFloat(inputValue.value);
    if (!isNaN(num)) {
      // Formatea el número con la cantidad de decimales indicada
      inputValue.value = num.toFixed(props.decimals);
    }
  }
  // console.log('test emit')
  emit('blur:validate');
};

// Si existen otros handlers (como handleKeyup o searchbyenter), asegúrate de definirlos o remover las referencias
const handleKeyup = () => {
  emit('keyup:prevent');
};

const handleFocus = () => {
  isFocused.value = true;
};

const searchbyenter = () => {
  emit('enter:search');
};

const searchbyKey = () => {
  emit('enter:key');
};
</script>

<style lang="scss" scoped>
input::placeholder {
  font-size: 14px;
  font-weight: 500;
  color: #8D9196;
  line-height: 140%; /* 19.6px */
}
</style>
