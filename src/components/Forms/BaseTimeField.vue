<template>
    <div class="time-picker">
        <div class="input-container">
                <input type="time" :value="formattedTime || modelValue" :class="computeClasses" :disabled="disabled" @input="handleInput">

                <!-- <template v-if="delete_link">
                  <span v-if="formattedTime || modelValue" class="delete-text text-sm font-medium" @click="resetTime">Borrar</span>
                </template> -->
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
        default: null,
      },
      customClasses: {
        type: Object,
        default: () => null,
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
    created(){
        if (this.isError) {
            this.error = true;
        }
    },
    computed: {
        computeClasses() {
            return {
                'h-10 rounded-[6px] text-sm font-medium px-1 border hinput-green': true,
                'hborder-black-100': this.modelValue && this.modelValue !== '' && !this.isError && !this.error,
                'hborder-gray-400 htext-gray-400': (!this.modelValue || this.modelValue == '') && !this.isError && !this.error,
                'w-24 text-center': !this.customClasses,
                'hborder-alert-negative htext-alert-negative': this.isError || this.error,
                'hoverForm': !this.isError || !this.error,
                'no-hover-input':this.disabled && !this.isError && !this.error,
                ...this.customClasses
            }
        }
    },
    emits: ['update:modelValue'],
    data() {
      return {
        formattedTime: '',
        error:false,
      };
    },
    watch: {
      modelValue (value) {
        if (!value) {
          this.formattedTime = ''
        }
      },
      formattedTime (value){
        let time = value.split(':')
        if ((time[0] > 23)) {
          time[0] = 23
        }
        if ((time[1] > 59)) {
          time[1] = 59
        }
        this.formattedTime = time.join(':')
      },
    },
    methods: {
      handleInput(event) {
        this.formattedTime = event.target.value;
        let inputTime = this.formattedTime.replace(/\D/g, ''); // Eliminar caracteres no numéricos

        if (inputTime.length > 4) {
          inputTime = inputTime.substring(0, 4);
        }

        let hours = inputTime.substring(0, 2);
        const minutes = inputTime.substring(2, 4);

        if (hours.length === 2) {
          if (parseInt(hours) > 23) {
            console.log('Error: Horas inválidas');
            this.error=true;
            this.$emit('invalid-time', this.formattedTime);
            return;
          }

          if (minutes.length === 2 && parseInt(minutes) > 59) {
            console.log('Error: Minutos inválidos');
            this.error=true;
            this.$emit('invalid-time', this.formattedTime);
            return;
          }
          this.error = false;

          const formattedTime = `${hours}:${minutes}`;
          this.formattedTime = formattedTime;
        } else if (hours.length === 1 && parseInt(hours) > 2) {
          hours = '2';
          const formattedTime = `${hours}:`;
          this.formattedTime = formattedTime;
        } else if (hours.length === 0) {
          this.formattedTime = '';
        }
        this.$emit('keyupInput');
        this.$emit('update:modelValue', this.formattedTime);
      },
      resetTime() {
            this.formattedTime = '';
            this.error = false;
            this.$emit('keyupInput');
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
    .delete-text {
        margin-left: 0.5rem;
        color: var(--h-black-100);
        cursor: pointer;
        text-decoration: underline;
    }
    .delete-text:hover {
        color: var(--h-black-200) !important;
    }
    .no-hover-input{
        color: initial !important;
        border: 1px solid #333 !important;
    }
</style>
