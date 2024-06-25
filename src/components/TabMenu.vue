<template>
    <div class="flex gap-2 border-b hborder-gray-400 pb-[2px] relative">
        
        <template v-for="link in links" :key="link">
            <div
                class="cursor-pointer relative px-4 pt-4 pb-2 text-base font-semibold leading-[120%] rounded-t-[10px] hover-green-200"
                :class="{
                    'hbg-green-200 htext-green-800': link.active,
                    'opacity-50':link.disabled,
                }"
                @click="goLink(link.viewName)"
            >
                {{ link.name }}
                <img v-if="false" class="absolute top-4 right-[6px] w-2.5 h-2.5" src="/assets/icons/EllipseWarning.svg" alt="">
                <div v-if="link.active" class="hbg-green-800 w-full h-1 rounded-full bottom-[-10px] relative left-0"></div>
            </div>
        </template>

    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();


const goLink = (viewName) =>{
    router.push({ name: viewName});
}


const props = defineProps({
    links:{
        type:Array,
        default: ()=>([])
    }
})
</script>

