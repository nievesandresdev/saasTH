<template>
    <SectionConfig
        :marginTop="'24px'"
        :width="'460px'"
        icon-bg
        :src-bg="'/assets/icons/TH.Gift.opacity.svg'"
        bg-class="''"
    >
        <template #title>
            <div v-if="loading" class="flex justify-between animate-pulse">
                <div class="w-1/3 h-5 bg-gray-300 rounded-md mb-2"></div>
                <div class="w-6 h-6 bg-gray-300 rounded-md"></div>
            </div>
            <div v-else class="flex justify-between">
                <h1 class="text-base font-semibold mb-2">Código: {{ benefitSReferrals.code }}</h1>
                <img
                    class="w-[24px] h-[24px] cursor-pointer"
                    src="/assets/icons/1.TH.EDIT.OUTLINED.svg"
                    @click="editGift(benefitSReferrals)"
                />
            </div>
            <div v-if="loading" class="flex justify-between animate-pulse">
                <div class="w-1/2 h-5 bg-gray-300 rounded-md mb-2"></div>
            </div>
            <div v-else class="flex justify-between">
                <h1 class="text-base font-semibold mb-2">
                    Regalo: {{ type === 'referred' ? valueReferrals : valueReferent }}
                </h1>
            </div>
        </template>
        <template #content>
            <div v-if="loading" class="animate-pulse">
                <div class="w-full h-4 bg-gray-300 rounded-md mb-2"></div>
                <div class="w-3/4 h-4 bg-gray-300 rounded-md"></div>
            </div>
            <p v-else class="text-sm font-normal mb-4">
                {{ benefitSReferrals.description }}
            </p>
        </template>
    </SectionConfig>
</template>

<script setup>
import { computed } from 'vue';
import SectionConfig from '@/components/SectionConfig.vue';

const emit = defineEmits(['editGift']);

const props = defineProps({
    benefitSReferrals: {
        type: Object,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    loading: {
        type: Boolean,
        required: true
    }
});

const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};

const editGift = (data) => {
    emit('editGift', props.type, data);
};

const valueReferrals = computed(() => {
    if (props.benefitSReferrals?.type_discount === 'percentage') {
        return props.benefitSReferrals?.amount + '%';
    } else {
        return props.benefitSReferrals?.amount + '€';
    }
});

const valueReferent = computed(() => {
    if (props.benefitSReferrals?.type_discount === 'percentage') {
        return props.benefitSReferrals?.amount + '%';
    } else {
        return props.benefitSReferrals?.amount + '€';
    }
});
</script>
