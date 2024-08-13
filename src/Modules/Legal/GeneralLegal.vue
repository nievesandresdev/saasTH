<template>
    <div class="h-screen px-[24px] bg-[#FAFAFA]">
        <HeadLegal />
        <TabLegal />

        <SectionConfig :width="'w-2/3'">
            <template #title>
                <div class="flex flex-col mb-6 gap-2">
                    <span class="font-semibold text-base">General</span>
                    <span class="text-sm font-normal mb-2">Información general que se utilizará para redactar los distintos textos legales.</span>
                </div>
            </template>
            <template #content>
                <div class="w-full">
                    <section class="mb-4">
                        <label class="text-sm font-medium mb-[6px] block">Razón social</label>
                        <BaseTextField
                            v-model="form.name"
                            placeholder="Ejemplo: Tecnologías Innovadoras S.A."
                        ></BaseTextField>
                    </section>
                    <section class="mb-4">
                        <label class="text-sm font-medium mb-[6px] block">Domicilio fiscal</label>
                        <BaseTextField
                            v-model="form.address"
                            placeholder="Ejemplo: Plaza Trinidad 15, 5C - Sevilla"
                            id="fiscal_address"
                        ></BaseTextField>
                    </section>
                    <section class="mb-4">
                        <label class="text-sm font-medium mb-[6px] block">NIF</label>
                        <BaseTextField
                            v-model="form.nif"
                            placeholder="Ejemplo: A87654321"
                        ></BaseTextField>
                    </section>
                    <section class="mb-6">
                        <label class="text-sm font-medium mb-[6px] block">Email de contacto</label>
                        <BaseTextField
                            v-model="form.email"
                            placeholder="Ejemplo: direccion@dominio.com"
                        ></BaseTextField>
                    </section>
                    <section class="flex justify-between items-center mb-4">
                        <label class="text-sm font-semibold">¿Cuentan con delegado de protección de datos?</label>
                        <BaseSwitchInput v-model="form.protection" />
                    </section>
                    <transition name="fade">
                        <section v-if="form.protection" class="mb-6">
                            <label class="text-sm font-medium mb-[6px] block">Correo electrónico del delegado*</label>
                            <BaseTextField
                                v-model="form.email_protection"
                                placeholder="Ejemplo: direccion2@dominio.com"
                            ></BaseTextField>
                        </section>
                    </transition>
                </div>
            </template>
        </SectionConfig>
    </div>
    <ChangesBar 
        :existingChanges="changes"
        :validChanges="changes && valid"
        @cancel="cancelChange" 
        @submit="submit"
    />
</template>





<script setup>
import { ref, reactive, onMounted } from 'vue';
import HeadLegal from './components/HeadLegal.vue';
import TabLegal from './components/TabLegal.vue';
import SectionConfig from '@/components/SectionConfig.vue';
import BaseSwitchInput from "@/components/Forms/BaseSwichInput.vue";
import BaseTextField from '@/components/Forms/BaseTextField.vue';
import ChangesBar from '@/components/Forms/ChangesBar.vue';

const form = reactive({
    name: '',
    address: '',
    nif: '',
    email: '',
    protection: false,
    email_protection: ''
});

onMounted(() => {
    loadGoogleMapsScript();
});

function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_KEY_GOOGE}&libraries=places`;
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
        initAutocomplete(); // Inicializar el autocompletado después de que el script se haya cargado
    }
}

function initAutocomplete() {
    const input = document.getElementById('fiscal_address');
    const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['address'],
        componentRestrictions: { country: "es" }
    });
    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            form.address = place.formatted_address; // Asegúrate de que esto esté enlazado correctamente en el formulario
        }
    });
}
</script>






<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>

