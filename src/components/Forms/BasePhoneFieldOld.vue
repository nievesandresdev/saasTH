<template>
    <div 
        class="h-11 hinput hinput-green rounded-[6px] cursor-pointer relative flex"
    >
        <div
            class="flex h-full items-center w131 relative"
            :class="{
                'br-gray': !error && !modelValue,
                'br-negative': error || error_phone,
                'br-black': modelValue,
            }"
        >
            <input 
                type="text" 
                class="hinput-green w-full p-0 text-sm font-medium pl-3 rounded-[6px]"
                style="border:none; !important;" 
                v-model="code"
                @keyup="search_codes"
                :placeholder="textLabel"
            >
            <div v-if="code" class="dropdown-code absolute left-0 z-50 w-full top-10 hbg-white-100 overflow-hidden">
                <p 
                    v-for="cde in search_list" :key="cde" 
                    class="cursor-pointer relative p-3 text-sm hover-gray-100"
                    @click="selectOption(cde.value)"
                >
                    {{cde.label}}
                </p>
            </div>
        </div>
    
        <input 
            type="number" 
            class="hinput-green flex-grow p-0 text-sm font-medium pl-3 rounded-[6px]"
            style="border:none; !important;" 
            :placeholder="placeholder_input"
            v-model="phone"
        >
    </div>
    {{modelValue}}
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';

export default {
  props: {
    error: {
      type: Boolean,
      default: false,
    },
    textLabel: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: null,
    },
    placeholder_input: {
      type: String,
      default: '',
    },
    texterror: {
      type: String,
      default: 'Campo obligatorio'
    }
  },
  emits: ['update:modelValue', 'keyupInput', 'handlePhoneError'],
  setup(props, { emit }) {
    const showOptions = ref(false);
    const hoverOption = ref(false);
    const selected = ref(false);
    const phone = ref('');
    const code = ref('');
    const code_list = ref([]);
    const search_list = ref([]);
    const error_phone = ref(false);
    const initialLoad = ref(false);

    const search_codes = () => {
      search_list.value = [];
      for (let ph of code_list.value) {
        if (search_list.value.length >= 5) break;
        if (
          ph.label.toLowerCase().includes(code.value.toLowerCase()) ||
          ph.country.es.toLowerCase().includes(code.value.toLowerCase()) ||
          ph.country.en.toLowerCase().includes(code.value.toLowerCase()) ||
          ph.country.fr.toLowerCase().includes(code.value.toLowerCase())
        ) {
          search_list.value.push(ph);
        }
      }
    };

    const get_code_list = () => {
      let phoneString = props.modelValue;
      phoneString = phoneString?.replace(/\s+/g, '');
      axios({
        url: 'https://dashboard.thehoster.io/api/phone-codes',
        method: 'GET',
      })
        .then(res => {
          code_list.value = res.data;

          code_list.value
            .map(item => item.value)
            .forEach(item => {
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
      search_list.value = [];
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
    });

    watch(code, (newVal, oldVal) => {
      if (!initialLoad.value) return;
      let phoneNumber = newVal + phone.value;
      if (phoneNumber === 'null') phoneNumber = null;
      validPhone(phoneNumber, newVal);
      emit('handlePhoneError', error_phone.value);
      emit('keyupInput');
      emit('update:modelValue', phoneNumber);
    });

    onMounted(() => {
       console.log(props.modelValue, 'modelValue')
      get_code_list();
    });

    return {
      showOptions,
      hoverOption,
      selected,
      phone,
      code,
      code_list,
      search_list,
      error_phone,
      initialLoad,
      search_codes,
      selectOption,
      validPhone,
    };
  },
};
</script>

<style scoped>
.w131{
    width: 131px;
}
@media(max-width:340px){
    .w131{
        width: 90px;
    }
}
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
    font-size: 14px;
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