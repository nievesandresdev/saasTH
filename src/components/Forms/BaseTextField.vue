<template>
    <div class="relative" :class="classContent">
        <img
            v-if="prependInnerIcon"
            :src="prependInnerIcon"
            alt="prepend inner icon"
            class="absolute left-3 top-2.5 w-6 h-6 z-10"
        >
        <div class="relative">
            <!-- :placeholder="errors?.[name] !== undefined && errors?.[name] !== true ? errors?.[name] : placeholder" -->
            <input
                type="text"
                :value="modelValue"
                @input="updateValue($event)"
                class="w-full hinput border hinput-green rounded-[6px]"
                :class="`${height} ${customInputClass} ${modelValue ? 'hborder-black-100' : 'hborder-gray-400'}`"
                :placeholder="placeholder"
                :minlength="min"
                :maxlength="max"
                @keyup.enter="searchbyenter"
                @blur="$emit('blur')"
            >
            <div v-if="(errors?.[name] !== true && errors?.[name] !== undefined) || max" class="flex justify-between">
                <p class="text-[10px] font-medim text-left mt-[4px]  text-red-600 flex items-center">
                    <img :class="{'invisible':!(errors?.[name] !== true &&  errors?.[name] !== undefined)}" class="inline w-4 h-4 mr-2" src="/assets/icons/1.TH.WARNING.RED.svg">
                    {{ errors?.[name] !== true || !modelValue ? errors?.[name] : '' }}
                </p>
                <!-- <p class="text-[10px] font-medim text-left mt-[4px]  text-red-600">{{ errors?.[name] !== true || !modelValue ? errors?.[name] : '' }}</p> -->
                <p class="text-[10px] font-medim text-right mt-[4px] ">{{ max ? `${modelValue?.length || 0}/${max || 0}` : '' }}</p>
            </div>
        </div>
        <!-- :class="prependInnerIcon ? 'pl-11' : ''" -->
        <button v-if="appendInnerIcon?.icon && appendInnerIcon?.type === 'BUTTON' && appendInnerIcon?.show" class="absolute right-3 top-3" @click="emit('click:append_inner')">
            <img class="w-6 h-6" :src="appendInnerIcon.icon" alt="append inner icon">
        </button>
        <img v-if="appendInnerIcon?.icon && appendInnerIcon?.type === 'ICON' && appendInnerIcon?.show" class="w-6 h-6 absolute right-3 top-3" :src="appendInnerIcon.icon" alt="append inner icon">
    </div>
</template>

<script setup>

import { computed } from 'vue'

const emit = defineEmits(['click:append_inner', 'update:modelValue', 'blur:validate', 'enter:search', 'input:typing']);

const  props = defineProps({
    classContent: {
        type: String,
        default: ''
    },
    classInput: {
        type: String,
        default: ''
    },
    prependInnerIcon: {
        type: String,
        default: '',
    },
    appendInnerIcon: {
        type: Object,
        default: {
            icon: null,
            type: null, // (BUTTON, ICON)
            show: false, 
        },
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
    errors: {
        type: Object,
        default: () => ({}),
    },
    height: {
        type: String,
        default: 'h-11',
    },
});

const searchbyenter = () => {
    emit('enter:search');
}

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
  emit('blur:validate');
  emit('input:typing', event.target.value);
};

const customInputClass = computed(() => {
    let c = props.classInput
    if (props.prependInnerIcon) {
        c = `${c} pl-11`
    }
    if (props.errors?.[props?.name] !== undefined && props.errors?.[props?.name] !== true) {
        c = `${c} hinput-error`
    }
    return c
})

</script>

<style lang="scss" scoped>

</style>