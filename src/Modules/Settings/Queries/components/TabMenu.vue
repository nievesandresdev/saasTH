<template>
    <section>
        <div class="flex">
            <div
                v-for="item in ['VERYGOOD','GOOD','NORMAL']"
                class="cursor-pointer pt-4 px-4 pb-2 flex items-center"
                :key="item"
                :class="{
                    'bg-white shadow-tab rounded-t-[10px]': views[item] == route.name, 
                    'hover:bg-[#ECF9F5] hover:rounded-t-lg': views[item] != route.name,
                }"
                @click="goView(item)"
            >
                <img
                    class="h-5 mr-2"
                    :src="`/assets/icons/1.TH.Emojis${item == 'GOOD' || item == 'VERYGOOD' ? 'GOOD' : 'NORMAL'}TAB.svg`" alt=""
                >
                <h2 
                    class="text-base leading-[140%]"
                    :class="{
                        'text-[#0B6357] font-semibold': views[item] == route.name, 
                    }"
                >{{ translate[item] }}</h2>
            </div>
        </div>
    </section>
</template>
<script setup>
import { onMounted, ref, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();


const props = defineProps({
    views:{
        type:Object,
        default:()=>({})
    }
})
// onMounted(()=>{

// })
const translate = {
    'VERYGOOD' : 'Muy bueno',
    'GOOD' : 'Bueno',
    'NORMAL' : 'Normal, Malo, Muy malo'
}

function goView(view){
    router.push({name: props.views[view]});
}
</script>
<style scoped>
.shadow-tab{
    box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.15);
}
</style>
