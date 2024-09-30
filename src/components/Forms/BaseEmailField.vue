<template>
    <div class="relative">
        <label v-if="textLabel" class="text-sm font-medium mb-2 block leading-4">{{ textLabel }}</label>
        <p v-if="textDescription" class="mb-2 text-sm htext-gray-500">{{ textDescription }}</p>

        <img v-if="iconLeft" class="w-6 h-6 absolute left-3 top-2" :src="iconLeft">
        <input
            ref="emailInput"
            :id="id"
            type="email"
            :class="`${computeClasses} ${modelValue ? 'hborder-black-100' : 'hborder-gray-400'}`"
            :placeholder="placeholderText"
            :value="modelValue"
            @input="validateEmail"
            @blur="$emit('blur')"
            autocomplete="nope"
            :disabled="disabled"
        >
        <p v-if="hasError && showTextError" class="mt-2 text-xs text-alert-negative flex items-center">
            <img
                src="/assets/icons/1.TH.WARNING.svg"
                alt="icon alert red"
                class="inline w-4 h-4 mr-2"
            />
            {{ textError }}
        </p>
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
            let classes = 'hinput-green rounded-[6px] border w-full ' + this.customClasses;
            if (this.hasError || this.activeError) {
                classes += ' hborder-alert-negative htext-alert-negative placeholder-negative';
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