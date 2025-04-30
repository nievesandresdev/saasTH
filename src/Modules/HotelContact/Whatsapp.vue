<template>
    <div class="h-full flex flex-col">
        <HeaderHotelContact />
        <div class="px-6">
            <div class="rounded-[10px] bg-white shadow-hoster py-6 px-4">
                <div class="flex items-center">
                    <img src="/assets/icons/cdnlogo.com_whatsapp-icon 1.svg" alt="Whatsapp" class="w-5 h-5 mr-1">
                    <h3 class="text-base font-medium leading-[110%]">
                        Contactar por WhatsApp
                    </h3>
                </div>
                <p class="mt-2 text-sm font-medium leading-[140%]">
                    Mejora el contacto con tus huéspedes facilitando la comunicación vía WhatsApp
                </p>
                <div class="mt-4 h-[56px] flex items-center gap-2 px-2">
                    <img src="/assets/icons/1.TH.INFO.svg" alt="Whatsapp" class="w-4 h-4">
                    <p class="text-sm leading-[140%]">
                        Generaremos automáticamente el link a WhatsApp a partir del número que ingreses aquí.
                    </p>
                </div>
                <div class="mt-4">
                    <div class="w-full 3xl:w-[585px]">  
                        <BasePhoneField
                            :key="`main2-${phoneFieldKey}`"
                            textLabel="Número de teléfono para conectar con WhatsApp:"
                            placeholderPhone=""
                            v-model="form.contact_whatsapp_number"
                            name="contact_whatsapp_number"
                            :errors="errors"
                            @blur:validate="validateField('contact_whatsapp_number')"
                        />
                    </div>
                </div>
            </div>
        </div>
        <section class="mt-auto">
            <ChangesBar 
                :existingChanges="changes"
                :validChanges="changes && valid"
                @cancel="cancelChanges" 
                @submit="submit"
            />
        </section>
        
    </div>
    <ModalNoSave
        :id="'not-saved'"
        :open="changes &&  valid"
        text="Si sales sin guardar, los cambios que has realizado en esta sección se perderán."
        textbtn="Guardar"
        @saveChanges="submit"
        type="save_changes"
    />
    </template>
    <script setup>
    import { reactive, computed, onMounted, ref } from 'vue';
    import HeaderHotelContact from './Components/HeaderHotelContact.vue'
    import BasePhoneField from "@/components/Forms/BasePhoneField.vue";
    import ChangesBar from '@/components/Forms/ChangesBar.vue'
    import ModalNoSave from '@/components/ModalNoSave.vue'
    import { useFormValidation } from '@/composables/useFormValidation'
    import { $formatTypeLodging } from '@/utils/helpers';
    
    //
    import { useHotelStore } from '@/stores/modules/hotel';
    const hotelStore = useHotelStore();
    import { useToastAlert } from '@/composables/useToastAlert'
    const toast = useToastAlert();
    
    const form = reactive({
        contact_whatsapp_number: '',
    })
    
    const originalForm = reactive({
        contact_whatsapp_number: '',
    })
    const phoneFieldKey = ref(0)
    const submitLoading = ref(false)
    
    onMounted(async () => {
        const response = await hotelStore.$getProfileWhatsapp()
        originalForm.contact_whatsapp_number = response.data.contact_whatsapp_number
        form.contact_whatsapp_number = response.data.contact_whatsapp_number
    })
    
    
    const validPhonePattern = /^\+?\d{9,13}$/;
    const formRules = reactive({
        contact_whatsapp_number: [{
            required: false,
            validator: value => validPhonePattern.test(value?.trim()),
            message: 'El número de teléfono no es válido'
        }],
    });
    
    const { errors, validateField, formInvalid } = useFormValidation(form, formRules);
    
    const changes = computed(() => {
        return originalForm.contact_whatsapp_number !== form.contact_whatsapp_number;
    })
    
    const valid = computed(() => {
        return !formInvalid.value && !submitLoading.value
    })
    
    const cancelChanges = () => {
        form.contact_whatsapp_number = originalForm.contact_whatsapp_number
        phoneFieldKey.value++;
    }
    
    const submit = async () => {
        submitLoading.value = true
        const response = await hotelStore.$updateContactWhatsapp(form)
        if(response.ok){
            originalForm.contact_whatsapp_number = response.data.contact_whatsapp_number
            toast.warningToast('Cambios guardados con éxito','top-right');
        }else{
            toast.errorToast('Error al actualizar el teléfono', 'top-right')
        }
        submitLoading.value = false
        // console.log('test originalForm.contact_whatsapp_number',originalForm.contact_whatsapp_number)
        // if(!originalForm.contact_whatsapp_number){
        //     phoneFieldKey.value++;
        // }
    }
    </script>