<template>
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
                type="text"
                :value="inputValue"
                @input="updateValue($event.target.value)"
                class="w-full hinput border  rounded-[6px]"
                :class="`${customInputClass} ${inputValue ? 'hborder-black-100' : 'hborder-gray-400'} ${error ? 'hinput-error' : disabled ? '' : 'hinput-green'}`"
                :placeholder="placeholder"
                :minlength="min"
                :maxlength="max"
                @keyup.enter="searchbyenter"
                @keypress="searchbyKey"
                @keyup.prevent="handleKeyup"
                @click="onClick"
                @blur="handleBlur"
                :disabled="disabled"
            >
            <div v-if="(errors?.[name] !== true && errors?.[name] !== undefined) || max" class="flex justify-between">
                <p class="text-[10px] font-medim text-left mt-[4px] text-red-600 flex items-center">
                    <img :class="{'invisible':!(errors?.[name] !== true && errors?.[name] !== undefined)}" class="inline w-4 h-4 mr-2" src="/assets/icons/1.TH.WARNING.RED.svg">
                    {{ errors?.[name] !== true || !inputValue ? errors?.[name] : '' }}
                </p>
                <p class="text-[12px] htext-gray-500 text-right mt-[4px] ">{{ max ? `${inputValue?.length || 0}/${max || 0}` : '' }}</p>
            </div>
        </div>
        <button v-if="appendInnerIcon?.icon && appendInnerIcon?.type === 'BUTTON' && appendInnerIcon?.show" class="absolute right-3 top-3" @click="$emit('click:append_inner')">
            <img class="w-6 h-6" :src="appendInnerIcon.icon" alt="append inner icon">
        </button>
        <img v-if="appendInnerIcon?.icon && appendInnerIcon?.type === 'ICON' && appendInnerIcon?.show" class="w-6 h-6 absolute right-3 top-3" :src="appendInnerIcon.icon" alt="append inner icon">
    </div>
</template>

<script setup>
import { ref, computed, watch,onMounted } from 'vue';

const emit = defineEmits(['click:append_inner', 'update:modelValue', 'blur:validate', 'enter:search', 'enter:key', 'input:typing', 'click', 'keyup:prevent']);

const inputElement = ref(null);

const props = defineProps({
    classContent: {
        type: String,
        default: ''
    },
    classInput: {
        type: String,
        default: 'p-3 h-10 text-sm'
    },
    prependInnerIcon: {
        type: String,
        default: '',
    },
    appendInnerIcon: {
        type: Object,
        default: () => ({
            icon: null,
            type: null, // (BUTTON, ICON)
            show: false,
        }),
    },
    placeholder: {
        type: String,
        default: '',
    },
    modelValue: {
        type: String,
        default: ''
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

const inputValue = ref(props.modelValue);

watch(inputValue, (newValue) => {
    emit('update:modelValue', newValue);
    emit('input:typing', newValue);
});

watch(() => props.modelValue, (newValue) => {
    inputValue.value = newValue;
});

const searchbyenter = () => {
    emit('enter:search');
};

const searchbyKey = (event) => {
    emit('enter:key', event);
};

const onClick = () => {
    emit('click');
};

const handleBlur = () => {
    emit('blur:validate');
};

const updateValue = (value) => {
    inputValue.value = value;
};

const handleKeyup = (event) => {
    emit('keyup:prevent', event);
};

const customInputClass = computed(() => {
    let c = props.classInput;
    if (props.prependInnerIcon) {
        c = `${c} pl-11`;
    }
    if (props.errors?.[props?.name] !== undefined && props.errors?.[props?.name] !== true) {
        c = `${c} hinput-error`;
    }

    if(props.disabled) {
        c = `${c} bg-[#FAFAFA] border-[#BFBFBF] text-[#A0A0A0]`;
    }
    return c;
});

onMounted(() => {
    emit('input-ref', inputElement);
});




</script>

<style lang="scss" scoped>
.hinput-error {
    border-color: #DC2626;
}
input::placeholder{
    font-weight: 500;
    color: var(--h-gray-500);
}
// .hinput-green {
//     border-color: #10B981;
// }
// .hborder-black-100 {
//     border-color: #1F2937;
// }
// .hborder-gray-400 {
//     border-color: #D1D5DB;
// }
</style>
