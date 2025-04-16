<template>
    <div class="flex items-center gap-2 mb-2" v-if="textLabel || tooltipText">
      <label 
      v-if="textLabel" 
      class="text-sm font-medium leading-[140%] block"
      :class="desactivated ? 'htext-read-only-desactivated' : 'htext-black-100'"
      >{{ textLabel }}</label>
      <div v-if="tooltipText" class="max-w-[16px] max-h-[16px]">
        <Tooltip
            size="s"
            :top="24"
            :left="0"
        >
            <template v-slot:button>
                <img class="w-4 h-4" src="/assets/icons/info.blue.svg">
            </template>
            <template v-slot:content>
                <p class="text-sm leading-[150%]" v-html="tooltipText"></p>
            </template>
        </Tooltip>
      </div>
    </div>
    <div 
        class="border-[2px] rounded-[6px] cursor-pointer relative flex"
        :class="[
          borderColorClass,
          heigthClass
        ]"
    >
        <div
            class="flex h-full items-center w-[92px] relative border-r-[2px]"
            :class="[borderColorClass]"
        >
            <input
                type="text" 
                class="w-full h-full text-sm font-medium leading-[140%] htext-black-100 focus:border-none hover:border-none border-none px-3 py-2 bg-white rounded-l-[5px]"
                v-model="code"
                @keyup="searchCodes"
                @focus="isFocused = true"
                @blur="isFocused = false"
                placeholder="+ Código"
                :disabled="!initialLoad"
            >
            <div v-if="code" class="dropdown-code absolute left-0 z-[50] w-full top-[40px] hbg-white-100 overflow-hidden">
                <p 
                    v-for="cde in searchList" :key="cde" 
                    class="cursor-pointer relative p-3 text-sm htext-black-100 hover-gray-100"
                    @click.stop.prevent="selectOption(cde.value)"
                >
                    {{cde.label}}
                </p>
            </div>
            <!-- :class="{'htext-alert-negative placeholder-negative': isError}" -->
        </div>
        <input 
            type="number" 
            class="flex-grow px-3 py-2 text-sm font-medium leading-[140%] htext-black-100 focus:border-none hover:border-none border-none bg-white rounded-r-[5px]"
            :placeholder="placeholderPhone"
            v-model="phone"
            @focus="isFocused = true"
            @blur="isFocused = false"
            :disabled="!initialLoad"
        >
    </div>
    <div v-if="(errors?.[name] !== true && errors?.[name] !== undefined)" class="mt-1 flex items-center">
      <img class="inline w-4 h-4 mr-2" src="/assets/icons/1.TH.WARNING.RED.svg">
      <p class="text-xs leading-[90%] htext-alert-negative">    
          {{ errors?.[name] !== true || !modelValue ? errors?.[name] : '' }}
      </p>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, computed, inject, toRefs } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { useUtilStore } from '@/stores/modules/util';
import Tooltip from '@/components/Tooltip.vue'
import axios from 'axios';

const utilStore = useUtilStore();
const props = defineProps({
  error: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: null,
  },
  texterror: {
    type: String,
    default: 'Campo obligatorio'
  },
  name: {
      type: String,
      default: '',
  },
  errors: {
      type: Object,
      default: () => ({}),
  },
  heigthClass: {
      type: String,
      default: 'h-10',
  },
  placeholderPhone: {
      type: String,
      default: 'Teléfono de contacto',
  },
  tooltipText: {
    type: String,
    default: null,
  },
  textLabel: {
    type: String,
    default: null,
  },
});

const { modelValue, error } = toRefs(props);

const emit = defineEmits(['update:modelValue', 'keyupInput', 'handlePhoneError', 'blur:validate'])

const showOptions = ref(false);
const selected = ref(false);
const phone = ref('');
const code = ref('');
const codeList = ref([]);
const searchList = ref([]);
const error_phone = ref(false);
const initialLoad = ref(false);
const uniqueLook = ref(false);
const isFocused = ref(false);

onMounted(async ()=>{
  defineFullPhone(modelValue.value?.trim() ?? null)
})
// COMPUTED
const isError = computed(() => {
    if (props.errors?.[props?.name] !== undefined && props.errors?.[props?.name] !== true || error.value) {
        // c = `hinput-error`;
        return true;
    }
    return false;
})

const borderColorClass = computed(() => {
  if (isFocused.value) return 'hborder-green-600';
  if (isError.value) return 'hborder-alert-negative';
  return 'hborder-gray-400';
  // {'hinput-error': isError,'hborder-black-100':code && phone,'hborder-gray-400':!code || !phone},
});

// fucntions
const defineFullPhone = async (stringPhone = null) => {
  utilStore.$getPhoneCodesApi()
  .then(res => {
    codeList.value = res.data;
    if (stringPhone) {
      let phoneString = props.modelValue?.replace(/\s+/g, '');
      codeList.value.map(item => item.value).some(item => {
        if (phoneString && phoneString.startsWith(item)) {
          code.value = item;
          phone.value = phoneString.replace(code.value, '');
          return true; // Detiene las iteraciones
        }
        return false;
      });
    }
    initialLoad.value = true;
  }).catch(error => {
    console.log(error);
  });
};

const searchCodes = async () => {
  searchList.value = [];
  for (let ph of codeList.value) {
    if (searchList.value.length >= 5) break;
    if (
      ph.label.toLowerCase().includes(code.value.toLowerCase())
    ) {
      searchList.value.push(ph);
    }
  }
};

const selectOption = (value) => {
  searchList.value = [];
  code.value = value;
};

const validPhone = (phone, code) => {
  const pattern = /^\+?\d{9,13}$/;
  // console.log('test valid',phone)
  if (phone && !pattern.test(phone) || !code && phone) {
    error_phone.value = true;
  } else {
    error_phone.value = false;
  }
};

watch(modelValue, (newVal, oldVal) => {
  if (uniqueLook.value) return;
  defineFullPhone(newVal)
  uniqueLook.value = true;
});


watch(phone, (newVal, oldVal) => {
  let phoneNumber = code.value + newVal;
  if (phoneNumber === 'null') phoneNumber = null;
  validPhone(phoneNumber, code.value);
  // console.log('test phone error',error_phone.value )
  emit('handlePhoneError', error_phone.value);
  emit('keyupInput');
  if (!code.value) return;
  emit('update:modelValue', phoneNumber);
  emit('blur:validate');
});

watch(code, (newVal, oldVal) => {
  let phoneNumber = newVal + phone.value;
  if (phoneNumber === 'null') phoneNumber = null;
  validPhone(phoneNumber, newVal);
  // console.log('test code error',error_phone.value )
  emit('handlePhoneError', error_phone.value);
  emit('keyupInput');
  // if (!phone.value && newVal.length < 2) return;
  emit('update:modelValue', phoneNumber);
  emit('blur:validate');
});




</script>

<style scoped>
.box-input-field:hover{
    border-color:var(--h-green-600) !important;
    color:var(--h-green-600) !important;
}

.box-input-field:hover > input::placeholder{
    color:var(--h-green-600) !important;
}
.box-input-field:hover > .text-label{
    color:var(--h-green-600) !important;
}
.dropdown-code{
    box-shadow: 0px 3.5px 7px rgba(0, 0, 0, 0.15);
    border-radius: 0px 0px 10px 10px;
}
input::placeholder {
  font-size: 14px;
  font-weight: 500;
  color: #8D9196;
  line-height: 140%; /* 19.6px */
}

.disabled:hover{
    background-color:#fff;
}
.br-black{
    border-right: 1px solid var(--h-black-100);
}
.br-gray{
    border-right: 1px solid var(--h-gray-400);
}
.br-negative{
    border-right: 1px solid var(--alert-negative);
}
</style>