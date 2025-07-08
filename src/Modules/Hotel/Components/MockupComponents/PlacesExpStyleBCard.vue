<template>
    <div>
        <div class="flex items-center gap-2">
            <img src="/assets/icons/WA.star.svg" class="w-6 h-6">
            <h2 class="lato text-[20px] font-bold leading-[18px]">Explora tu destino</h2>
        </div>
        <div class="mt-4 w-[436px] overflow-x-hidden">
            <div class="flex gap-4">
                <img v-for="i in 2" :key="i" src="/assets/img/cardExplPlaces.svg" class="w-[260px] h-[80px] flex-shrink-0">
            </div>
            <div class="flex gap-4 mt-2">
                <img v-for="i in 2" :key="i" src="/assets/img/cardExplPlaces.svg" class="w-[260px] h-[80px] flex-shrink-0">
            </div>
        </div>
    </div>
</template>