<template>
    <Modal :isVisible="openInviteGuest" width="377px" footer paddingContent="pt-4 px-4 pb-6">
        <template #content>
            <div class="flex items-center justify-between">
                <h1 class="text-lg font-medium leading-[120%]">
                    Invitar huésped
                </h1>
                <button class="" @click="closeModal">
                    <img
                        class="w-6 h-6"
                        src="/assets/icons/1.TH.CLOSE.svg"
                    >
                </button>
            </div>
            <div class="mt-6">
                <p class="text-sm font-medium mb-2 leading-[110%]">Nombre del huésped</p>
                <div>
                    <BaseTextField
                        classInput="h-[36px] text-sm px-3 py-2"
                        :placeholder="'Introduce el nombre del huésped'"
                        v-model="form.name"
                        :error="alertNull && !form.name.trim()"
                    />
                </div>
            </div>
            <p class="text-sm mt-4">Rellena al menos un método de contacto:</p>
            <div class="mt-4 relative">
                <div class="flex justify-between items-start">
                    <label class="text-sm font-medium mb-2 leading-[110%]">Correo electrónico</label>
                    <Tooltip
                        size="s"
                        :top="25"
                        :right="0"
                    >
                        <template v-slot:button>
                            <img class="w-5 h-5 cursor-pointer mt-[-1px]" src="/assets/icons/info.blue.svg">
                        </template>
                        <template v-slot:content>
                            <p class="text-sm">Añade el correo del huésped. Se le enviarán los mensajes automáticos al correo proporcionado.</p>
                        </template>
                    </Tooltip>
                </div>
                <BaseEmailField
                    customClasses="h-[36px] text-sm px-3 py-2"
                    :placeholder="'Introduce el correo del huésped'"
                    v-model="form.email"
                    @handleError="EmailFieldError = $event"    
                    :activeError="alertNull && !form.email.trim()"
                />
            </div>
            <div class="mt-4 relative">
                <div class="flex justify-between items-start">
                    <label class="text-sm font-medium mb-2 leading-[110%]">Teléfono móvil <strong class="htext-green-600 ml-1.5 font-medium">BETA</strong></label>
                    <Tooltip
                        size="s"
                        :top="25"
                        :right="0"
                    >
                        <template v-slot:button>
                            <img class="w-5 h-5 cursor-pointer mt-[-1px]" src="/assets/icons/info.blue.svg">
                        </template>
                        <template v-slot:content>
                            <p class="text-sm">Añade el teléfono del huésped con el prefijo correspondiente. Se le enviarán los mensajes automáticos al teléfono proporcionado.</p>
                        </template>
                    </Tooltip>
                </div>
                <BasePhoneField
                    heigthClass="h-[36px]"
                    v-model="form.phone"
                    @handlePhoneError="PhoneFieldError = $event"
                    placeholderPhone="Teléfono del huésped"
                    @keyupInput="verifyName"
                />
            </div>
        </template>
        <template #footer>
            <div class="flex items-center justify-between p-4 border-t hborder-gray-400">
                <div 
                    class="text-sm font-medium underline hover-htext-black-200 cursor-pointer"
                    :class="{'htext-gray-500 hover-htext-gray-500':!valid_form}"
                    @click="closeModal"
                    :disabled="!valid_form"
                >
                Cancelar
                </div>

                <div 
                    class="px-4 py-3 text-sm font-medium leading-[110%] hbtn-primary cursor-pointer"
                    :class="{'primary-disabled':!valid_form}"
                    @click="submit"
                >
                    Enviar
                </div>
            </div>
        </template>
    </Modal>
</template>
<script setup>
import { computed, ref, inject, reactive } from 'vue'
import Modal from '@/components/ModalWindow.vue'
import Tooltip from '@/components/Tooltip.vue'
import BaseTextField from '@/components/Forms/BaseTextField.vue';
import BasePhoneField from '@/components/Forms/BasePhoneField.vue';
import BaseEmailField from '@/components/Forms/BaseEmailField.vue';
//store
import { useGuestStore } from '@/stores/modules/guest/guest';
import { useToastAlert } from '@/composables/useToastAlert'

const toast = useToastAlert();
const guestStore = useGuestStore();

const openInviteGuest = inject('openInviteGuest');

const EmailFieldError = ref(false);
const PhoneFieldError = ref(false);
const alertNull = ref(false);

const form = reactive({
    name:'',
    email:'',
    phone:'',
});

const closeModal = () =>{
    cleanForm()
    openInviteGuest.value = false;
}

const cleanForm = () =>{
    form.name =  ''
    form.phone = ''
    form.email = ''
    alertNull.value = false;
}


const submit = async () =>{
    alertNull.value = true;
    if(valid_form.value){
        openInviteGuest.value = false;
        await guestStore.$inviteToHotel(form);
        alertNull.value = false;
        cleanForm();
        toast.warningToast('Invitacion enviada.','top-right');
    }
}

const valid_form = computed(()=>{
    let valid = form.name.trim() && form.email.trim() && !EmailFieldError.value && !PhoneFieldError.value
    return valid;
});

</script>

