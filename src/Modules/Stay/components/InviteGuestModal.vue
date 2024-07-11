<template>
    <Modal :isVisible="openInviteGuest" width="362px" footer paddingContent="p-4">
        <template #content>
            <div class="relative">
                <button class="absolute left-0 top-0" @click="closeModal">
                    <img
                        class="w-6 h-6"
                        src="/assets/icons/1.TH.CLOSE.svg"
                    >
                </button>
                <h1 class="text-lg font-medium text-center leading-6">
                    Invitar huésped
                </h1>
            </div>
            <div class="mt-6">
                <p class="text-sm font-medium mb-2 leading-[110%]">Nombre del huésped</p>
                <div>
                    <BaseTextField
                        :classInput="`py-2 px-3 h-10 `" 
                        :placeholder="'Introduce el nombre del huésped'"
                        v-model="form.name"
                        :customClasses="{
                            'hborder-gray-400':!form.name,
                            'hborder-alert-negative':errorsKey.includes('name'),
                        }"
                    />
                </div>
            </div>
            <p class="text-sm mt-4">Rellena al menos un método de contacto:</p>
            <div class="mt-4 relative">
                <div class="flex justify-between items-start pr-4">
                    <label class="text-sm font-medium mb-2 leading-[110%]">Correo electrónico</label>
                    <Tooltip
                        size="s"
                        :top="25"
                        :right="0"
                    >
                        <template v-slot:button>
                            <img class="w-5 h-5 cursor-pointer mt-[-2px]" src="/assets/icons/info.blue.svg">
                        </template>
                        <template v-slot:content>
                            <p class="text-sm">Añade el correo del huésped. Se le enviarán los mensajes automáticos al correo proporcionado.</p>
                        </template>
                    </Tooltip>
                </div>
                <BaseEmailField
                    :placeholder="'Introduce el correo del huésped'"
                    v-model="form.email"
                    @handleError="EmailFieldError = $event"    
                />
            </div>
            <div class="mt-4 relative">
                <div class="flex justify-between items-start pr-4">
                    <label class="text-sm font-medium mb-2 leading-[110%]">Teléfono móvil <strong class="htext-green-600 ml-1.5 font-medium">BETA</strong></label>
                    <Tooltip
                        size="s"
                        :top="25"
                        :right="0"
                    >
                        <template v-slot:button>
                            <img class="w-5 h-5 cursor-pointer mt-[-2px]" src="/assets/icons/info.blue.svg">
                        </template>
                        <template v-slot:content>
                            <p class="text-sm">Añade el teléfono del huésped con el prefijo correspondiente. Se le enviarán los mensajes automáticos al teléfono proporcionado.</p>
                        </template>
                    </Tooltip>
                </div>
                <BasePhoneField
                    :textLabel="'+ Código país'"
                    :options="[
                        {value:'+34',label:'+34'},
                        {value:'+33',label:'+33'},
                        {value:'+1',label:'+1'},
                    ]"
                    v-model="form.phone"
                    :error="errorsKey.includes('email-phone')"
                    @handlePhoneError="PhoneFieldError = $event"
                />
            </div>
        </template>
        <template #footer>
            <div class="mt-4 flex items-center justify-between px-4 pb-4">
                <button 
                    class="px-4 py-3 text-sm font-medium leading-[110%] hbtn-primary"
                    :class="{'primary-disabled':!valid_form}"
                    @click="closeModal"
                    :disabled="!valid_form"
                >
                Cancelar
                </button>

                <button 
                    class="px-4 py-3 text-sm font-medium leading-[110%] hbtn-primary"
                    :class="{'primary-disabled':!valid_form}"
                    @click="submit"
                    :disabled="!valid_form"
                >
                    Enviar
                </button>
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
const errorsKey = ref([]);

const form = reactive({
    name:null,
    email:null,
    phone:'',
});

const closeModal = () =>{
    cleanForm()
    openInviteGuest.value = false;
}

const cleanForm = () =>{
    form.name =  null
    form.phone = ''
    form.email = null
}

const submit = async () =>{
    openInviteGuest.value = false;
    await guestStore.$inviteToHotel(form);
    cleanForm();
    toast.warningToast('Invitacion enviada.','top-right');
}

const valid_form = computed(()=>{
    let valid = form.name !== null && form.name !== '' && (form.phone !== '' || form.email) && !EmailFieldError.value && !PhoneFieldError.value
    return valid;
});

</script>

