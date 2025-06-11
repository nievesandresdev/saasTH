<template>
    <HeadSettingsCheckin />
    
    <section class="px-6">
        <h3 class="text-base font-semibold leading-[120%]">Formulario de Check-in</h3>
        <p class="text-sm leading-[140%] mt-2">Configura aquí el formulario de Check-in de la WebApp de tu hotel. La configuración por defecto, cumple con el Real decreto 933/2021.</p>
        <p class="text-sm leading-[140%]">Puedes personalizar el formulario para que se ajuste a las necesidades de tu alojamiento y a las expectativas de tus huéspedes.</p>
    </section>

    <section class="px-6 mt-4">
        <div class="rounded-[10px] bg-white shadow-hoster py-6 px-4">
            <h1 class="text-base font-semibold leading-[120%]">Paso 1: Datos personales</h1>
            <div class="mt-4 flex flex-col gap-2" v-if="firstStep">
                <FieldVisibility
                    id="fieldSettings1"
                    label="Nombre"
                    v-model:visible="firstStep.name.visible"
                    v-model:required="firstStep.name.mandatory"
                    :withDependency="firstStep.name.dependence"
                    disabled
                />
                <FieldVisibility
                    id="fieldSettings2"
                    label="Primer apellido"
                    v-model:visible="firstStep.lastname.visible"
                    v-model:required="firstStep.lastname.mandatory"
                    :withDependency="firstStep.lastname.dependence"
                    disabled
                />
                <FieldVisibility
                    id="fieldSettings3"
                    label="Segundo apellido"
                    textTooltip="Este campo sólo se mostrará si el tipo de documento es “DNI español”."
                    v-model:visible="firstStep.secondLastname.visible"
                    v-model:required="firstStep.secondLastname.mandatory"
                    :withDependency="firstStep.secondLastname.dependence"
                />
                <FieldVisibility
                    id="fieldSettings4"
                    label="Fecha de nacimiento"
                    v-model:visible="firstStep.birthdate.visible"
                    v-model:required="firstStep.birthdate.mandatory"
                    :withDependency="firstStep.birthdate.dependence"
                    icon="1.TH.schedule"
                />
                <FieldVisibility
                    id="fieldSettings5"
                    label="Sexo"
                    v-model:visible="firstStep.gender.visible"
                    v-model:required="firstStep.gender.mandatory"
                    :withDependency="firstStep.gender.dependence"
                    icon="1.TH. sex"
                />
                <FieldVisibility
                    id="fieldSettings6"
                    label="Teléfono"
                    v-model:visible="firstStep.phone.visible"
                    v-model:required="firstStep.phone.mandatory"
                    :withDependency="firstStep.phone.dependence"
                    icon="1.TH.PHONE"
                />
                <FieldVisibility
                    id="fieldSettings7"
                    label="Correo electrónico"
                    v-model:visible="firstStep.email.visible"
                    v-model:required="firstStep.email.mandatory"
                    :withDependency="firstStep.email.dependence"
                    icon="1.TH.EMAIL"
                />
                <FieldVisibility
                    id="fieldSettings8"
                    label="Adulto responsable"
                    v-model:visible="firstStep.responsibleAdult.visible"
                    v-model:required="firstStep.responsibleAdult.mandatory"
                    :withDependency="firstStep.responsibleAdult.dependence"
                    textTooltip="Los campos “Adulto responsable” y “Relación de parentesco” sólo aplicarán a huéspedes menores de 18 años."
                    icon="1.TH.HUESPEDES"
                />
                <FieldVisibility
                    id="fieldSettings9"
                    label="Relación de parentesco"
                    v-model:visible="firstStep.kinshipRelationship.visible"
                    v-model:required="firstStep.kinshipRelationship.mandatory"
                    :withDependency="firstStep.kinshipRelationship.dependence"
                    textTooltip="Los campos “Adulto responsable” y “Relación de parentesco” sólo aplicarán a huéspedes menores de 18 años."
                    icon="1.TH.HUESPEDES"
                />
            </div>
            <h1 class="mt-6 text-base font-semibold leading-[120%]">Paso 2: Datos de identificación</h1>
            <div class="mt-4 flex flex-col gap-2" v-if="secondStep">
                <FieldVisibility
                    id="fieldSettings10"
                    label="Nacionalidad"
                    v-model:visible="secondStep.nationality.visible"
                    v-model:required="secondStep.nationality.mandatory"
                    :withDependency="secondStep.nationality.dependence"
                    icon="1.TH.FLAG"
                />
                <FieldVisibility
                    id="fieldSettings11"
                    label="Tipo de documento"
                    v-model:visible="secondStep.docType.visible"
                    v-model:required="secondStep.docType.mandatory"
                    :withDependency="secondStep.docType.dependence"
                    icon="1.TH.ID"
                />
                <FieldVisibility
                    id="fieldSettings12"
                    label="Número de soporte del documento"
                    v-model:visible="secondStep.docSupportNumber.visible"
                    v-model:required="secondStep.docSupportNumber.mandatory"
                    :withDependency="secondStep.docSupportNumber.dependence"
                    textTooltip="No todos los tipos de documentos cuentan con número de soporte. Este campo sólo aplicará a documentos tipo NIE o DNI español."
                    icon="1.TH.ID"
                />
                <FieldVisibility
                    id="fieldSettings13"
                    label="Número de documento"
                    v-model:visible="secondStep.docNumber.visible"
                    v-model:required="secondStep.docNumber.mandatory"
                    :withDependency="secondStep.docNumber.dependence"
                    icon="1.TH.ID"
                />
                <FieldVisibility
                    id="fieldSettings14"
                    label="País de residencia"
                    v-model:visible="secondStep.countryResidence.visible"
                    v-model:required="secondStep.countryResidence.mandatory"
                    :withDependency="secondStep.countryResidence.dependence"
                    icon="1.TH.Pais"
                />
                <FieldVisibility
                    id="fieldSettings15"
                    label="Código postal"
                    v-model:visible="secondStep.postalCode.visible"
                    v-model:required="secondStep.postalCode.mandatory"
                    :withDependency="secondStep.postalCode.dependence"
                    icon="1.TH.Pais"
                />
                <FieldVisibility
                    id="fieldSettings16"
                    label="Municipio"
                    v-model:visible="secondStep.municipality.visible"
                    v-model:required="secondStep.municipality.mandatory"
                    :withDependency="secondStep.municipality.dependence"
                    icon="1.TH.Pais"
                />
                <FieldVisibility
                    id="fieldSettings17"
                    label="Domicilio de residencia"
                    v-model:visible="secondStep.addressResidence.visible"
                    v-model:required="secondStep.addressResidence.mandatory"
                    :withDependency="secondStep.addressResidence.dependence"
                    icon="1.TH.Pais"
                />
            </div>
        </div>
    </section>

    <section class="px-6 mt-[30px] mb-11">
        <div class="rounded-[10px] bg-white shadow-hoster pb-6 px-4" v-if="querySetting">
            <div class="flex items-center">
                <h1 class="text-base font-semibold leading-[120%] pt-6">Paso 3: Adjuntar la consulta Pre-stay de seguimiento</h1>
                <div 
                    class="flex items-center gap-1 relative ml-auto pt-6"
                    @mouseover="hoverPrestayDisabled = true"
                    @mouseleave="hoverPrestayDisabled = false"
                >
                    <span class="text-sm font-semibold leading-[120%]"  :class="{'opacity-25':querySetting && !querySetting?.pre_stay_activate}">Activo</span>
                    <ToggleButton 
                        id="togglePrestayQuery"
                        v-model="showPrestayQuery"
                        :disabled="querySetting && !querySetting?.pre_stay_activate"
                    />
                    <div 
                        v-if="hoverPrestayDisabled && querySetting && !querySetting?.pre_stay_activate" 
                        class="bottom-[26px] right-0 absolute p-4 bg-white shadow-hoster z-50 rounded-[10px] w-[290px]"
                    >
                        <p class="text-sm leading-[150%]">
                            Para añadir la consulta Pre-stay al Check-in, debes activarla desde
                            <router-link :to="{name:'SettingsPreStayPage'}" class="font-semibold underline">Seguimiento</router-link>
                        </p>
                    </div>
                </div>
            </div>
            <p class="text-sm mt-2">Dale a tus huéspedes la posibilidad de hacerte peticiones especiales durante el proceso de Check-in</p>
        </div>
    </section>
    
    <section class="sticky bottom-0 left-0">
        <ChangesBar 
            :existingChanges="changes"
            :validChanges="changes"
            @cancel="cancelChanges" 
            @submit="submit"
        />
    </section>
    <ModalNoSave
        :id="'not-saved'"
        :open="changes"
        text="Si sales sin guardar, los cambios que has realizado en esta sección se perderán."
        textbtn="Guardar"
        @saveChanges="submit"
        type="save_changes"
    />
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import HeadSettingsCheckin from './components/HeadSettingsCheckin.vue';
import ChangesBar from '@/components/Forms/ChangesBar.vue'
import FieldVisibility from './components/FieldVisibility.vue'
import ToggleButton from '@/components/Buttons/ToggleButton.vue'
import ModalNoSave from '@/components/ModalNoSave.vue'
//
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();
//
import { useMockupStore } from '@/stores/modules/mockup'
const mockupStore = useMockupStore();
import { useCheckinStore } from '@/stores/modules/stay/checkin'
const checkinStore = useCheckinStore();
import { useQuerySettingsStore } from '@/stores/modules/queries/querySettings';
const querySettingsStore = useQuerySettingsStore();

const firstStep = ref(null);
const secondStep = ref(null);
const showPrestayQuery = ref(true);
const disabledButtonSubmit = ref(false);
//
const firstStepRef = ref(null);
const secondStepRef = ref(null);
const showPrestayQueryRef = ref(showPrestayQuery.value);
const querySetting = ref(null);
const hoverPrestayDisabled = ref(false);
//

onMounted(async ()=>{
    mockupStore.$setIframeUrl('/mi-estancia/huespedes/completar-checkin/')
    mockupStore.$setLanguageTooltip(true)
    mockupStore.$setInfo1('Guarda para ver tus cambios en tiempo real', '/assets/icons/info.svg')
    let data = await checkinStore.$getFormSettings();
    assignValuesToForm(data)
    querySetting.value = await querySettingsStore.$getPreStaySettings();
})

async function assignValuesToForm(data){
    if(data){
        firstStep.value = data.first_step;
        secondStep.value = data.second_step;
        showPrestayQuery.value = data.show_prestay_query;
        //refs
        firstStepRef.value = JSON.parse(JSON.stringify(data.first_step))
        secondStepRef.value = JSON.parse(JSON.stringify(data.second_step))
        showPrestayQueryRef.value = JSON.parse(JSON.stringify(data.show_prestay_query))
    }
    // console.log('test secondStep',secondStep.value)
}

async function submit(){
    disabledButtonSubmit.value = true;
    let update  = await checkinStore.$updateFormSettings({
        first_step:firstStep.value,
        second_step:secondStep.value,
        show_prestay_query:showPrestayQuery.value
    });
    if(update){
        assignValuesToForm(update)
        mockupStore.$reloadIframe();
        toast.warningToast('Cambios guardados con éxito','top-right');
    }
    disabledButtonSubmit.value = false;
}


function cancelChanges(){
    assignValuesToForm({
        first_step:firstStepRef.value,
        second_step:secondStepRef.value,
        show_prestay_query:showPrestayQueryRef.value
    });
}

const changes = computed(()=>{
    if(!firstStepRef.value) return

    let changes = (JSON.stringify(firstStep.value) !== JSON.stringify(firstStepRef.value) ||
                    JSON.stringify(secondStep.value) !== JSON.stringify(secondStepRef.value) ||
                    JSON.stringify(showPrestayQuery.value) !== JSON.stringify(showPrestayQueryRef.value))
                    && !disabledButtonSubmit.value;
    return changes;
});


</script>