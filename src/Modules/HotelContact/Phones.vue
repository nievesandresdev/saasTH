<template>
<div class="h-full flex flex-col">
    <HeaderHotelContact />
    <div class="px-6">
        <div class="rounded-[10px] bg-white shadow-hoster py-6 px-4">
            <h3 class="text-base font-medium leading-[110%]">
                Llamar al {{$formatTypeLodging()}} 
            </h3>
            <p class="mt-2 text-sm font-medium leading-[140%]">
                Facilita la comunicación de tus huéspedes permitiendo llamar al teléfono de tu {{$formatTypeLodging()}}
            </p>
            <div class="mt-4 grid grid-cols-2 gap-4">
                <div class="w-full">  
                    <BasePhoneField
                        :key="`main-${phoneFieldKey}`"
                        textLabel="Número principal de teléfono de contacto"
                        v-model="form.phone"
                        name="phone"
                        :errors="errors"
                        @blur:validate="validateField('phone')"
                    />
                </div>
                <div class="w-full">
                    <BasePhoneField
                        :key="`optional-${phoneFieldKey}`"
                        textLabel="Teléfono secundario"
                        v-model="form.phone_optional"
                        name="phone_optional"
                        :errors="errors"
                        @blur:validate="validateField('phone_optional')"
                        @handlePhoneError="PhoneOptionalFieldError = $event"
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
    phone: '',
    phone_optional: '',
})

const originalForm = reactive({
    phone: '',
    phone_optional: '',
})
const phoneFieldKey = ref(0)
const submitLoading = ref(false)

onMounted(async () => {
    const response = await hotelStore.$getProfilePhones()
    originalForm.phone = response.data.phone
    originalForm.phone_optional = response.data.phone_optional
    // console.log('test', response)
    form.phone = response.data.phone
    form.phone_optional = response.data.phone_optional
})

const formRules = reactive({
    phone: [{
        required: false,
        validator: value => (value?.trim().length > 10 && value?.trim().length < 16) || value?.trim().length < 4,
        message: 'La cantidad de dígitos ingresada es incorrecta'
    }],
    phone_optional: [{
        required: false,
        validator: value => (value?.trim().length > 10 && value?.trim().length < 16) || value?.trim().length < 4,
        message: 'La cantidad de dígitos ingresada es incorrecta'
    }],
});

const { errors, validateField, formInvalid } = useFormValidation(form, formRules);

const changes = computed(() => {
    return originalForm.phone !== form.phone || originalForm.phone_optional !== form.phone_optional
})

const valid = computed(() => {
    return !formInvalid.value && !submitLoading.value
})

const cancelChanges = () => {
    form.phone = originalForm.phone
    form.phone_optional = originalForm.phone_optional
    phoneFieldKey.value++;
}

const submit = async () => {
    submitLoading.value = true
    const response = await hotelStore.$updateContactPhones(form)
    if(response.ok){
        originalForm.phone = response.data.phone
        originalForm.phone_optional = response.data.phone_optional
        toast.warningToast('Cambios guardados con éxito','top-right');
    }else{
        toast.errorToast('Error al actualizar el teléfono', 'top-right')
    }
    // if(!originalForm.phone || !originalForm.phone_optional){
    //     phoneFieldKey.value++;
    // }
    submitLoading.value = false
}
</script>