<template>
   
    <SectionConfig :marginTop="'24px'" :width="'460px'" icon-bg :src-bg="'/assets/icons/TH.Gift.opacity.svg'" bg-class="''" v-show="!isObjectEmpty(benefitSReferrals)">
        <template #title>
            <div class="flex justify-between">
                <h1 class="text-base font-semibold mb-2">Código: {{ benefitSReferrals.code }}</h1>
                <img class="w-[24px] h-[24px] cursor-pointer" src="/assets/icons/1.TH.EDIT.OUTLINED.svg" @click="editGift(benefitSReferrals)">
                
            </div>
            <div class="flex justify-between">
                <h1 class="text-base font-semibold mb-2">Regalo: {{ type === 'referred' ? valueReferrals : valueReferent }}</h1>
            </div>
        </template>
        <template #content>
            <p class="text-sm font-normal mb-4">
                {{ benefitSReferrals.description }}
            </p>
        </template>
    </SectionConfig>
                
</template>
<script setup>
import { computed } from 'vue'
import SectionConfig from '@/components/SectionConfig.vue'

const emit = defineEmits(['editGift'])

const props = defineProps({
    benefitSReferrals: {
        type: Object,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0
}

const editGift = (data) => {
    emit('editGift',props.type, data)
}

const valueReferrals = computed(() => {
    if(props.benefitSReferrals?.type_discount === 'percentage') {
        return props.benefitSReferrals?.amount + '%'
    } else {
        return props.benefitSReferrals?.amount + '€'
    }
});

const valueReferent = computed(() => {
    if(props.benefitSReferrals?.type_discount === 'percentage') {
        return props.benefitSReferrals?.amount + '%'
    } else {
        return props.benefitSReferrals?.amount + '€'
    }
});

</script>
