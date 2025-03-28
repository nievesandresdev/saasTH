<template>
    <div class="relative">
        <label v-if="textLabel" class="text-sm font-medium mb-2 block leading-4">{{ textLabel }}</label>
        <p v-if="textDescription" class="mb-2 text-sm htext-gray-500">{{ textDescription }}</p>

        <img v-if="iconLeft" class="w-6 h-6 absolute left-3 top-2" :src="iconLeft">
        <input
            ref="emailInput"
            :id="id"
            type="email"
            :class="`${computeClasses}`"
            :placeholder="placeholderText"
            :value="modelValue"
            @input="validateEmail"
            @blur="$emit('blur')"
            autocomplete="nope"
            :disabled="disabled"
        >
        <div v-if="hasError && showTextError" class="flex items-center mt-1">
            <img class="inline w-4 h-4 mr-2" src="/assets/icons/1.TH.WARNING.RED.svg">
            <p class="text-xs leading-[90%] htext-alert-negative">{{ textError }}</p>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['update:modelValue', 'handleError','input:typing'],
    props: {
        id: String,
        disabled: Boolean,
        textLabel: String,
        textDescription: String,
        placeholder: String,
        modelValue: String,
        customClasses: {
            type: String,
            default: 'h-10 text-sm p-3 '
        },
        showTextError: {
            type: Boolean,
            default: false
        },
        textError: {
            type: String,
            default: 'Campo requerido'
        },
        iconLeft: String,
        activeError: Boolean,
    },
    data() {
        return {
            hasError: false
        };
    },
    computed: {
        placeholderText() {
            return this.placeholder || 'Introduce un email';
        },
        computeClasses() {
            let classes = 'th-Input w-full ' + this.customClasses;
            if (this.hasError || this.activeError) {
                classes += ' border-input-error';
            } else {
                classes += '';
            }
            if(this.iconLeft){
                classes += ' pl-[44px]';
            }
            return classes;
        }
    },
    watch: {
        hasError(newVal) {
            this.$emit('handleError', newVal);
        }
    },
    methods: {
        validateEmail(event) {
            const email = event.target.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(email){
                this.hasError = !emailRegex.test(email);  
            }else{
                this.hasError = false;  
            }
            this.$emit('input:typing');
            this.$emit('update:modelValue', email);
        }
    }
};
</script>

<style scoped>
input::focus {
    outline:none !important;
}
input{
    color:#333;
}
input::placeholder{
    font-weight: 500;
    color: var(--h-gray-500);
}
</style>