<template>
    <div class="relative">
        <label v-if="textLabel" class="text-sm font-medium mb-2 block leading-4">{{ textLabel }}</label>
        <p v-if="textDescription" class="mb-2 text-sm htext-gray-500">{{ textDescription }}</p>

        <img v-if="iconLeft" class="w-6 h-6 absolute left-3 top-2" :src="iconLeft" alt="Icono a la izquierda">
        <input
            ref="emailInput"
            :id="id"
            type="email"
            :class="computeClasses"
            :placeholder="placeholderText"
            :value="modelValue"
            @input="onInput"
            @blur="$emit('blur')"
            autocomplete="nope"
            :disabled="disabled"
        >
        <!-- <p v-if="hasError && showTextError" class="mt-2 text-xs text-alert-negative flex items-center">
            <img
                src="/assets/icons/1.TH.WARNING.svg"
                alt="icon alert red"
                class="inline w-4 h-4 mr-2"
            />
            {{ errorMessage }}
        </p> -->
        <p v-if="isChecking" class="mt-2 text-xs text-gray-500 flex items-center">
            <svg class="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            Verificando...
        </p>
    </div>
</template>

<script>
import { verifyExistMail } from '@/api/services/users/userSettings.service';

export default {
    emits: ['update:modelValue', 'handleError', 'errorMessage', 'input:typing'],
    props: {
        id: {
            type: String,
            required: false
        },
        userId: {
            type: String,
            required: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        textLabel: {
            type: String,
            default: ''
        },
        textDescription: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        modelValue: {
            type: String,
            default: ''
        },
        customClasses: {
            type: String,
            default: 'h-10 text-sm p-3'
        },
        showTextError: {
            type: Boolean,
            default: true
        },
        textError: {
            type: String,
            default: 'Campo requerido'
        },
        iconLeft: {
            type: String,
            default: ''
        },
        activeError: {
            type: Boolean,
            default: false
        },
        showEmailExistsError: { //  controlar la visualización del error de existencia
            type: Boolean,
            default: true
        },
        enableLiveCheck: { //  activar/desactivar la verificación en vivo
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            hasError: false,
            isChecking: false,
            debounceTimeout: null, // Para manejar el debounce
            currentErrorMessage: '', // Mensaje de error actual
            existsEmail: false 
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
            if (this.iconLeft) {
                classes += ' pl-[44px]';
            }
            return classes;
        }
    },
    watch: {
        hasError(newVal) {
            this.$emit('handleError', newVal);
            // Emitir el mensaje de error correspondiente
            this.$emit('errorMessage', this.currentErrorMessage);
            this.$emit('existsEmail', this.existsEmail);
        },
        activeError(newVal) {
            if (newVal) {
                this.currentErrorMessage = this.textError;
                this.hasError = true;
            } else {
                this.currentErrorMessage = '';
                this.hasError = false;
            }
        },
        modelValue(newVal) {
            // Emitir cambios en el modelo
            this.$emit('update:modelValue', newVal);
        }
    },
    methods: {
        onInput(event) {
            const email = event.target.value;
            this.$emit('input:typing');
            this.$emit('update:modelValue', email);

            // Resetear estados de verificación
            this.hasError = false;
            this.currentErrorMessage = this.textError;

            // Limpiar el timeout anterior si existe
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
            }

            // Validar el email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email) {
                this.hasError = !emailRegex.test(email);
                if (this.hasError) {
                    this.currentErrorMessage = this.textError;
                } else if (this.enableLiveCheck) {
                    const params = { email, userId: this.userId };
                    // Si es correcto y se habilita la verificación en vivo, verificar la existencia con debounce
                    this.debounceTimeout = setTimeout(() => {
                        this.validateEmail(params);
                    }, 500); 
                }
            } else {
                this.hasError = false;
                this.currentErrorMessage = this.textError;
            }
        },
        async validateEmail(email) {
            this.isChecking = true;
            try {
                const response = await verifyExistMail(email);
                
                const exists = response.data.exists;
                if (exists) {
                    this.hasError = true;
                    this.currentErrorMessage = 'El correo electrónico ya está registrado.';
                } else {
                    this.hasError = false;
                    this.currentErrorMessage = this.textError;
                }

            } catch (error) {
                // Manejar errores de la API
                console.error('Error al verificar el correo electrónico:', error);
                this.hasError = true;
                this.currentErrorMessage = 'Error al verificar el correo electrónico.';
            } finally {
                this.isChecking = false;
            }
        }
    },
    beforeDestroy() {
        // Limpiar el timeout
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
    }
};
</script>

<style scoped>
input::focus {
    outline: none !important;
}
input {
    color: #333;
}
input::placeholder {
    font-weight: 500;
    color: var(--h-gray-500);
}
</style>
