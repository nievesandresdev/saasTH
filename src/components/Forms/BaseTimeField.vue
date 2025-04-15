<template>
  <div class="relative">
      <div class="input-container">
        <!-- ${error ? 'hinput-error' : 'hinput-green'} -->
          <input 
              type="time" 
              :value="formattedTime || modelValue" 
              class="th-Input p-input-time rounded-[6px] w-[60px] text-center"
              :class="`${customClasses}`"
              :placeholder="placeholder"
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
      //
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
      
      if(this.formattedTime) {
        this.$emit('update:modelValue', this.formattedTime);
      }
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
</style>
