<template>
    <label 
    v-if="textLabel" 
    class="text-sm font-medium leading-[140%] block mb-2 htext-black-100"
    >{{ textLabel }}</label>
    <p v-if="textDescription" class="text-sm mb-2 leading-[140%]">{{ textDescription }}</p>
    <div class="relative" :class="classContent">
        <img
            v-if="prependInnerIcon"
            :src="prependInnerIcon"
            alt="prepend inner icon"
            class="absolute left-3 top-2.5 w-6 h-6 z-10"
        >
        <div class="relative">
            <textarea
                ref="textareaRef"
                :rows="rows"
                :value="modelValue"
                @input="updateValue($event)"
                @focus="isFocused = true"
                @blur="isFocused = false"
                class="w-full h-[108px] max-h-[225px] rounded-[6px] border-[2px]"
                :class="`${customInputClass} ${borderClasses}`"
                :placeholder="errors?.[name] !== undefined && errors?.[name] !== true ? errors?.[name] : placeholder"
                :minlength="min"
                :maxlength="max"
                @keyup.enter="searchbyenter"
                :disabled="disabled"
            />
            
            <div v-if="errors?.[name] !== true || max" class="flex justify-between">
                <p class="text-xs text-left leading-[90%] htext-alert-negative">{{ errors?.[name] !== true && modelValue ? errors?.[name] : '' }}</p>
                <p class="text-xs font-medium leading-[90%] htext-gray-500 text-right">{{ max ? `${modelValue?.length || 0}/${max || 0}` : '' }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const emit = defineEmits(['click:append_inner', 'update:modelValue', 'blur:validate', 'enter:search']);

const props = defineProps({
    rows: {
        type: Number,
        default: 5,
    },
    classContent: {
        type: String,
        default: ''
    },
    classInput: {
        type: String,
        default: 'p-3 text-sm font-medium leading-[150%] min-h-[114px] htext-black-100 bg-white'
    },
    placeholder: {
        type: String,
        default: '',
    },
    modelValue: {
        type: String,
    },
    min: {
        type: Number,
        default: null,
    },
    max: {
        type: Number,
        default: null,
    },
    name: {
        type: String,
        default: '',
    },
    error: {
        type: Boolean,
        default: false,
    },
    errors: {
        type: Object,
        default: () => ({}),
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    textLabel: {
        type: String,
        default: null,
    },
    textDescription: {
        type: String,
        default: null,
    },
});

const textareaRef = ref(null);
const isFocused = ref(false);

const searchbyenter = () => {
    emit('enter:search');
}
onMounted(() => {
     autoResize();
});

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
  emit('blur:validate');
  autoResize();
};
function autoResize() {
    if (textareaRef.value) {
        textareaRef.value.style.height = 'auto'; // Resetea la altura
        textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`; // Ajusta según el contenido
    }
}
// ${modelValue ? 'hborder-black-100' : disabled ? 'hborder-gray-300' : 'hborder-gray-400'} ${error ? 'hinput-error' : ''}
const borderClasses = computed(() => {
  if(props.disabled) return 'hborder-disabled-input'
  if(props.error || (Object.keys(props.errors).length > 0 && props.errors?.['name'] !== true)) return 'hborder-alert-negative'
  if(isFocused.value) return 'hborder-green-600'
  return 'hborder-gray-400';
});

const customInputClass = computed(() => {
    let c = props.classInput;
    if (props.errors?.[props?.name] !== undefined && props.errors?.[props?.name] !== true) {
        c += ' hborder-alert-negative';
    }
    return c;
})
</script>

<style lang="scss" scoped>
textarea::placeholder {
  font-size: 14px;
  font-weight: 500;
  color: #8D9196;
  line-height: 140%; /* 19.6px */
}

textarea {
    resize: none;
}
</style>
