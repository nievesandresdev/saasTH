<template>
    <div class="relative" :class="classContent">
        <img
            v-if="prependInnerIcon"
            :src="prependInnerIcon"
            alt="prepend inner icon"
            class="absolute left-3 top-2.5 w-6 h-6 z-10"
        >
        <div class="relative">
            <textarea
                rows="5"
                :value="modelValue"
                @input="updateValue($event)"
                class="w-full h-[108px] rounded-[6px] border"
                :class="`${customInputClass} ${modelValue ? 'hborder-black-100 hinput-green' : disabled ? 'hborder-gray-300' : 'hborder-gray-400 hinput-green'} ${error ? 'hinput-error' : ''}`"
                :placeholder="errors?.[name] !== undefined && errors?.[name] !== true ? errors?.[name] : placeholder"
                :minlength="min"
                :maxlength="max"
                @keyup.enter="searchbyenter"
                :disabled="disabled"
                :style="{ backgroundColor: disabled ? 'white' : '', color: disabled ? '#A0A0A0' : '' }"
            />
            
            <div v-if="errors?.[name] !== true || max" class="flex justify-between">
                <p class="text-[10px] font-medim text-left mt-[4px] text-red-600">{{ errors?.[name] !== true && modelValue ? errors?.[name] : '' }}</p>
                <p class="text-[12px] htext-gray-500 text-right mt-[4px]">{{ max ? `${modelValue?.length || 0}/${max || 0}` : '' }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['click:append_inner', 'update:modelValue', 'blur:validate', 'enter:search']);

const props = defineProps({
    classContent: {
        type: String,
        default: ''
    },
    classInput: {
        type: String,
        default: 'p-3 text-sm min-h-[114px]'
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
});

const searchbyenter = () => {
    emit('enter:search');
}

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
  emit('blur:validate');
};

const customInputClass = computed(() => {
    let c = props.classInput;
    if (props.errors?.[props?.name] !== undefined && props.errors?.[props?.name] !== true) {
        c += ' hinput-error';
    }
    return c;
})
</script>

<style lang="scss" scoped>
</style>
