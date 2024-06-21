<template>
    <div class="relative" :class="class_content">
        <img
            v-if="prepend_inner_icon"
            :src="prepend_inner_icon"
            alt="prepend inner icon"
            class="absolute left-3 top-2.5 w-6 h-6 z-10"
        >
        <div class="relative">
            <input 
                type="text"
                :value="modelValue"
                @input="update_value($event)"
                class="w-full h-11 hinput hinput-green"
                :class="custom_input_class"
                :placeholder="errors?.[name] !== undefined && errors?.[name] !== true ? errors?.[name] : placeholder"
                :minlength="min"
                :maxlength="max"
                @keyup.enter="search_by_enter"
            >
            <div v-if="errors?.[name] !== true || max" class="flex justify-between">
                <p class="text-[10px] font-medim text-left mt-[4px]  text-red-600">{{ errors?.[name] !== true && modelValue ? errors?.[name] : '' }}</p>
                <p class="text-[10px] font-medim text-right mt-[4px] ">{{ max ? `${modelValue?.length || 0}/${max || 0}` : '' }}</p>
            </div>
        </div>
        <!-- :class="prepend_inner_icon ? 'pl-11' : ''" -->
        <button v-if="append_inner_icon?.icon && append_inner_icon?.type === 'BUTTON' && append_inner_icon?.show" class="absolute right-3 top-3" @click="emit('click:append_inner')">
            <img class="w-6 h-6" :src="append_inner_icon.icon" alt="append inner icon">
        </button>
        <img v-if="append_inner_icon?.icon && append_inner_icon?.type === 'ICON' && append_inner_icon?.show" class="w-6 h-6 absolute right-3 top-3" :src="append_inner_icon.icon" alt="append inner icon">
    </div>
    <!-- <pre>{{ name }}</pre> -->
    <!-- <pre>{{ errors?.[name] }}</pre> -->
</template>

<script setup>

import { computed } from 'vue'

const emit = defineEmits(['click:append_inner', 'update:modelValue', 'blur:validate', 'enter:search']);

const  props = defineProps({
    class_content: {
        type: String,
        default: ''
    },
    class_input: {
        type: String,
        default: ''
    },
    prepend_inner_icon: {
        type: String,
        default: '',
    },
    append_inner_icon: {
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
});

const search_by_enter = () => {
    emit('enter:search');
}

const update_value = (event) => {
  emit('update:modelValue', event.target.value);
  emit('blur:validate');
};

const custom_input_class = computed(() => {
    let c = props.class_input
    if (props.prepend_inner_icon) {
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