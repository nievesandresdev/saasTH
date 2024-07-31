<template>
    <div class="py-6 border-b hborder-gray-400">
        <p class="text-sm leading-[140%] htext-gray-500 text-right">{{$formatTimestampDate(data.created_at, 'dd/MM/yyyy')}}</p>
        <div class="mt-2 flex items-center gap-2">
            <div class="relative flex-shrink-0">
                <img 
                    v-if="data.interaction.status == 'unread'"
                    class="absolute top-[-3px] right-[-3px]" 
                    src="/assets/icons/1.TH.DOT.NOTIFICATION.svg"
                    alt="notify icon"
                >
                <img class="w-8 h-8" src="/assets/icons/1.TH.NOVEDADES.MM.svg" alt="">
            </div>
            <h3 class="text-sm font-semibold leading-[120%]">{{ data.title }}</h3>
        </div>
    </div>
</template>
<script setup>
 const props = defineProps({
    data: Object
  })
</script>