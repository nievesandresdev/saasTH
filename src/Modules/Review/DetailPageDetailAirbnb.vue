<template>
    <div class="flex items-center space-x-[8px]">
        <BaseRatingIcons
            :rating="4"
            :icon_full="'/assets/icons/1.TH.REVIEW.BLACK.svg'"
            :icon_empty="'/assets/icons/1.TH.REVIEW.BLACK.OUTLINE.svg'"
        />
        <span class="text-sm font-medium">3 de 5</span>
    </div>
    <div class="flex items-center mt-2">
        <p class="text-sm">Idioma original:</p>
        <img 
            class="w-4 h-4 ml-2"
            :src="`/assets/icons/flags/es.svg`"
        >
        <p class="text-sm font-medium ml-1">Español</p>
    </div>
    <p class="text-sm mt-2">L'hotel è molto ben posizionato, tutto è vicino. Le camere sono molto belle, spaziose e confortevoli. Il personale è stato molto gentile, abbiamo avuto un problema con la nostra camera e Antonio si è occupato di cambiare la nostra camera e risolvere il problema.</p>
</template>

<script setup>

import BaseRatingIcons from '@/components/BaseRatingIcons'

</script>