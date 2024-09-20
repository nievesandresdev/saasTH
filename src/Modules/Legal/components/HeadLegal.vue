<template>
    <div class="pb-1 relative z-[300]">
        <section class="flex justify-between items-center py-[20px]">
            <div class="space-x-2 flex">
                <h1 class="font-medium text-[22px]">Textos Legales</h1>
            </div>
            <div class="space-x-2 flex">
                <h1 class="font-semibold text-[14px]">Idiomas</h1>
                <TooltipLanguages
                    size="l"
                    :top="30"
                    :right="0"
                >
                    <template #button>
                        <img class="w-[24px] h-[24px]" src="/assets/icons/TH.INFO.GREEN.svg">
                    </template>
                </TooltipLanguages>
            </div>
        </section>
    </div>
</template>

<script setup>
import TooltipLanguages from "@/components/TooltipLanguages.vue";

</script>