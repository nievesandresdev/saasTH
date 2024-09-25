<template>
    <div 
        class="hinput hinput-green border rounded-[6px] cursor-pointer relative flex"
        :class="[
          {'hinput-error': isError,'hborder-black-100':code && phone,'hborder-gray-400':!code || !phone},
          heigthClass
        ]"
    >
        <div
            class="flex h-full items-center w-[92px] relative px-3 py-2.5"
            :class="{
                'br-gray': !code || !phone,
                'br-negative': isError,
                'br-black': code && phone,
            }"
        >
            <input
                type="text" 
                class="hinput-green w-full p-0 text-sm font-medium focus:border-none hover:border-none border-none"
                v-model="code"
                @keyup="searchCodes"
                placeholder="+34"
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
            <!-- <div class="bg-white w-6 h-6 mx-2 flex-shrink-0 cursor-default">
              <img class="w-full h-full" src="/assets/icons/1.TH.I.dropdownBig.svg" alt="">
            </div> -->
        </div>
    
        <input 
            type="number" 
            class="hinput-green flex-grow px-3 py-2.5 text-sm font-medium focus:border-none hover:border-none border-none rounded-[6px]"
            :class="{'htext-alert-negative': isError}"
            :placeholder="placeholderPhone"
            v-model="phone"
            :disabled="!initialLoad"
        >
    </div>
    <div v-if="(errors?.[name] !== true && errors?.[name] !== undefined)" class="mt-2">
      <p class="text-xs font-medim flex items-center htext-alert-negative leading-[10%]">
          <img class="inline w-4 h-4 mr-2" src="/assets/icons/1.TH.WARNING.RED.svg">
          {{ errors?.[name] !== true || !modelValue ? errors?.[name] : '' }}
      </p>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, computed, inject, toRefs } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { useUtilStore } from '@/stores/modules/util';
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
});

const { modelValue } = toRefs(props);

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
const uniqueLook = ref(false);

onMounted(async ()=>{
  defineFullPhone()
})
// COMPUTED
const isError = computed(() => {
    if (props.errors?.[props?.name] !== undefined && props.errors?.[props?.name] !== true) {
        // c = `hinput-error`;
        return true;
    }
    return false;
})

// fucntions
const defineFullPhone = async (stringPhone = null) => {
  // console.log('test defineFullPhone')
  // axios({
  //   url: 'https://dashboard.thehoster.io/api/phone-codes',
  //   method: 'GET',
  // })
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
  })
};

const searchCodes = async () => {
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



// const getCodeList = async () => {
//   axios({
//     url: 'https://dashboard.thehoster.io/api/phone-codes',
//     method: 'GET',
//   })
//     .then(res => {
//       codeList.value = res.data;
//     })
//     .catch(error => {
//       console.log(error, 'error');
//     })
//     .finally(() => {
//       initialLoad.value = true;
//     });
// };

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

watch(modelValue, (newVal, oldVal) => {
  if (uniqueLook.value) return;
  defineFullPhone(newVal)
  uniqueLook.value = true;
});


watch(phone, (newVal, oldVal) => {
  let phoneNumber = code.value + newVal;
  if (phoneNumber === 'null') phoneNumber = null;
  validPhone(phoneNumber, code.value);
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
  emit('handlePhoneError', error_phone.value);
  emit('keyupInput');
  if (!phone.value && newVal.length < 2) return;
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