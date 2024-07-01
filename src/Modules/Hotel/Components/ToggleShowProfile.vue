<template>
    <label for="toggle" id="toggle-input" class="relative cursor-pointer mb-0 mr-4">
        <input
            :checked="showProfileRef"
            type="checkbox"
            class="sr-only"
            id="toggle"
            @change="toglestate"
            :disabled="toggleDisabled"
        />
        <div
        :class="['block w-[1.875rem] h-[1.125rem] rounded-full', showProfileRef ? 'bg-[#34A98F]' : 'bg-gray-400']"
        ></div>
        <div
        :class="['dot absolute left-[0.125rem] top-[0.125rem] w-3.5 h-3.5 rounded-full transition', showProfileRef ? 'transform translate-x-full bg-white' : 'bg-white']"
        ></div>
    </label>
    <BaseTooltipResponsive
        size="l"
        :top="25"
        :right="0"
    >
        <template #button>
            <img class="w-[24px] h-[24px]" src="/assets/icons/TH.INFO.GREEN.svg">
            </template>
            <template #content>
            <p class="text-sm leading-[150%] font-normal">
                Con el interruptor "Mostrar al huésped" controlas la visibilidad de cierta información para el huésped.
            </p>
            <p class="mt-2 text-sm leading-[150%] font-normal">
                Si está encendido, tu huésped podrá ver en la WebApp de tu alojamiento la información que añadas en esta vista.
            </p>
        </template>
    </BaseTooltipResponsive>
</template>
<script setup>
import { ref, computed, onMounted,watch, inject } from 'vue';
import BaseTooltipResponsive from "@/components/BaseTooltipResponsive.vue";
const emit = defineEmits(['updateShowHotel'])
//DATA PROPS

// onMounted(()=>{
//     console.log('mounted toggle')
// })
const form = inject('form')
watch(() => form.show_profile, (newValue) => {
    showProfileRef.value = newValue;
});
const showProfileRef = ref(form.show_profile)
const toggleDisabled = ref(false)
const toglestate = () => {
    showProfileRef.value = !showProfileRef.value
    emit('updateShowHotel',showProfileRef.value) 
}

// const showMandatoryFields = () => {
//     emit('showMandatoryFields')   
// }

</script>

<style lang="scss">
</style>