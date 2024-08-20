<template>
    <div 
        class="hinput hinput-green border rounded-[6px] cursor-pointer relative flex"
        :class="[
          {'hinput-error': isError,'hborder-black-100':code && phone,'hborder-gray-400':!code || !phone},
          heigthClass
        ]"
    >
        <div
            class="flex h-full items-center w-[151px] relative"
            :class="{
                'br-gray': !code || !phone,
                'br-negative': isError,
                'br-black': code && phone,
            }"
        >
            <input
                type="text" 
                class="hinput-green w-full p-0 text-sm font-medium pl-3 focus:border-none hover:border-none border-none"
                v-model="code"
                @keyup="searchCodes"
                :placeholder="'+ Código país'"
            >
            <div v-if="code" class="dropdown-code absolute left-0 z-[50] w-full top-[40px] hbg-white-100 overflow-hidden">
                <p 
                    v-for="cde in searchList" :key="cde" 
                    class="cursor-pointer relative p-3 text-sm htext-black-100 hover-gray-100"
                    @click="selectOption(cde.value)"
                >
                    {{cde.label}}
                </p>
            </div>
            <div class="bg-white w-6 h-6 mx-2 flex-shrink-0 cursor-default">
              <img class="w-full h-full" src="/assets/icons/1.TH.I.dropdownBig.svg" alt="">
            </div>
        </div>
    
        <input 
            type="number" 
            class="hinput-green flex-grow p-0 text-sm font-medium pl-3 focus:border-none hover:border-none border-none rounded-[6px]"
            :class="{'htext-alert-negative': isError}"
            :placeholder="placeholderPhone"
            v-model="phone"
        >
    </div>
    <div v-if="(errors?.[name] !== true && errors?.[name] !== undefined)" class="flex justify-between">
      <p class="text-[10px] font-medim text-left mt-[4px]  text-red-600 flex items-center">
          <img class="inline w-4 h-4 mr-2" src="/assets/icons/1.TH.WARNING.RED.svg">
          {{ errors?.[name] !== true || !modelValue ? errors?.[name] : '' }}
      </p>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, computed, inject } from 'vue';
import { defineProps, defineEmits } from 'vue';
import axios from 'axios';

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
})

const emit = defineEmits(['update:modelValue', 'keyupInput', 'handlePhoneError', 'blur:validate'])

const showOptions = ref(false);
const hoverOption = ref(false);
const selected = ref(false);
const phone = ref('');
const code = ref('');
const codeList = ref([]);
const searchList = ref([]);
const error_phone = ref(false);
const initialLoad = ref(false);

// COMPUTED
const isError = computed(() => {
    if (props.errors?.[props?.name] !== undefined && props.errors?.[props?.name] !== true) {
        // c = `hinput-error`;
        return true;
    }
    return false;
})

// fucntions
const searchCodes = () => {
  searchList.value = [];
  for (let ph of codeList.value) {
    if (searchList.value.length >= 5) break;
    if (
      ph.label.toLowerCase().includes(code.value.toLowerCase()) ||
      ph.country.es.toLowerCase().includes(code.value.toLowerCase()) ||
      ph.country.en.toLowerCase().includes(code.value.toLowerCase()) ||
      ph.country.fr.toLowerCase().includes(code.value.toLowerCase())
    ) {
      searchList.value.push(ph);
    }
  }
};

const getCodeList = () => {
  axios({
    url: 'https://dashboard.thehoster.io/api/phone-codes',
    method: 'GET',
  })
    .then(res => {
      codeList.value = res.data;
      codeList.value
        .map(item => item.value)
        .forEach(item => {
          let phoneString = props.modelValue;
          phoneString = phoneString?.replace(/\s+/g, '');
          if (phoneString && phoneString.startsWith(item)) {
            code.value = item;
            phone.value = phoneString.replace(code.value, '');
          }
        });
    })
    .catch(error => {
      console.log(error, 'error');
    })
    .finally(() => {
      initialLoad.value = true;
    });
};

const selectOption = (value) => {
  searchList.value = [];
  code.value = value;
};

const validPhone = (phone, code) => {
  const pattern = /^\+?\d{9,13}$/;

  if (phone && !pattern.test(phone) || !code) {
    error_phone.value = true;
  } else {
    error_phone.value = false;
  }
};

watch(phone, (newVal, oldVal) => {
  if (!initialLoad.value) return;
  let phoneNumber = code.value + newVal;
  if (phoneNumber === 'null') phoneNumber = null;
  validPhone(phoneNumber, code.value);
  emit('handlePhoneError', error_phone.value);
  emit('keyupInput');
  emit('update:modelValue', phoneNumber);
  emit('blur:validate');
});

watch(code, (newVal, oldVal) => {
  if (!initialLoad.value) return;
  let phoneNumber = newVal + phone.value;
  if (phoneNumber === 'null') phoneNumber = null;
  validPhone(phoneNumber, newVal);
  emit('handlePhoneError', error_phone.value);
  emit('keyupInput');
  emit('update:modelValue', phoneNumber);
  emit('blur:validate');
});

onMounted(() => {
  getCodeList()
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
input::placeholder{
    color: var(--h-gray-500);
    font-weight: 500;
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