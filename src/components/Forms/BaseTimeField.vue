<template>
  <div class="time-picker">
      <div class="input-container">
          <input 
              type="time" 
              :value="formattedTime || modelValue" 
              :class="computeClasses" 
              :disabled="disabled" 
              @input="handleInput"
              @blur="handleBlur"
              @focus="handleFocus"
          >
      </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    isError: {
      type: Boolean,
      default: false,
    },
    customClasses: {
      type: Object,
      default: () => ({}),
    },
    modelValue: {
        default: ''
    },
    delete_link: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },      
  },
  data() {
    return {
      formattedTime: '',
      error: this.isError,
      isFocused: false,  // Nuevo estado para manejar el foco
    };
  },
  watch: {
    modelValue(value) {
      if (!value) {
        this.formattedTime = '';
      }
    },
    isError(newVal) {
      this.error = newVal;
    }
  },
  computed: {
      computeClasses() {
          return {
              'h-10 rounded-[6px] text-sm font-medium px-1 border': true,
              'hinput-green': this.isFocused && !this.error,  // Verde si está enfocado y no hay error
              'hborder-black-100': this.modelValue && !this.error && !this.isFocused, // Borde negro si no hay error y no está enfocado
              'hborder-gray-400 htext-gray-400': (!this.modelValue || this.modelValue === '') && !this.error && !this.isFocused,
              'w-24 text-center': !this.customClasses,
              'hborder-alert-negative htext-alert-negative': this.error,
              'hoverForm': !this.error,
              'no-hover-input': this.disabled && !this.error,
              ...this.customClasses
          }
      }
  },
  methods: {
    handleInput(event) {
      this.formattedTime = event.target.value;
      this.validateTime();
      this.$emit('update:modelValue', this.formattedTime);
    },
    validateTime() {
      let time = this.formattedTime.split(':');
      if (time.length < 2 || parseInt(time[0]) > 23 || parseInt(time[1]) > 59) {
        this.error = true;
      } else {
        this.error = false;
      }
      this.$emit('update:modelValue', this.formattedTime);
    },
    handleFocus() {
      this.isFocused = true;
    },
    handleBlur() {
      this.isFocused = false;
      this.validateTime();
    },
    resetTime() {
      this.formattedTime = '';
      this.error = false;
      this.$emit('update:modelValue', this.formattedTime);
    },
  },
};
</script>

<style scoped>
input[type="time"]::-webkit-calendar-picker-indicator {
  display: none;
}
.time-picker {
  position: relative;
}
.input-container {
  display: flex;
  align-items: center;
}
.hinput-green {
  border-color: #38A169; /* Verde para input activo */
}
.hborder-black-100 {
  border-color: #1F2937; /* Negro para input correcto */
}
.hborder-alert-negative {
  border-color: #DC2626; /* Borde rojo */
}
.htext-alert-negative {
  color: #DC2626; /* Texto rojo */
}
.no-hover-input {
  color: initial !important;
  border: 1px solid #333 !important;
}
</style>
