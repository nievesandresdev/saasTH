<template>
    <div class="h-full flex flex-col">
        <HeaderHotelContact />
        <div class="px-6">
            <div class="rounded-[10px] bg-white shadow-hoster py-6 px-4">
                <h3 class="text-base font-medium leading-[110%]">
                    Contactar por Email
                </h3>
                <p class="mt-2 text-sm font-medium leading-[140%]">
                    Permite a tus huéspedes enviarte emails directamente desde la WebApp
                </p>
                <div class="mt-4">
                    <div class="w-full 3xl:w-[585px]">  
                    <BaseTextField
                        text-label="Correo electrónico de contacto:"
                        v-model="form.contact_email"
                        :placeholder="'Introduce email contacto del '+$formatTypeLodging()"
                        name="contact_email"
                        :errors="errors"
                        @blur:validate="validateField('contact_email')"
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
    import BaseTextField from "@/components/Forms/BaseTextField.vue";
    import HeaderHotelContact from './Components/HeaderHotelContact.vue'
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
        contact_email: '',
    })
    
    const originalForm = reactive({
        contact_email: '',
    })
    const submitLoading = ref(false)
    
    onMounted(async () => {
        const response = await hotelStore.$getProfileEmail()
        // console.log('test response',response)
        originalForm.contact_email = response.data.contact_email
        form.contact_email = response.data.contact_email
    })
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formRules = reactive({
        contact_email: [{
            required: false,
            validator: value => !!emailPattern.test(value),
            message: 'Formato de e-mail permitido ej: xxxx@email.com'
        }],
    });
    
    const { errors, validateField, formInvalid } = useFormValidation(form, formRules);
    
    const changes = computed(() => {
        return originalForm.contact_email?.trim() !== form.contact_email?.trim();
    })
    
    const valid = computed(() => {
        return !formInvalid.value && !submitLoading.value
    })
    
    const cancelChanges = () => {
        form.contact_email = originalForm.contact_email
        phoneFieldKey.value++;
    }
    
    const submit = async () => {
        submitLoading.value = true
        const response = await hotelStore.$updateContactEmail(form)
        if(response.ok){
            originalForm.contact_email = response.data.contact_email
            toast.warningToast('Cambios guardados con éxito','top-right');
        }else{
            toast.errorToast('Error al actualizar el email', 'top-right')
        }
        submitLoading.value = false
    }
    </script>