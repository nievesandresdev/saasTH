<template>
    <section>
        <div class="flex" v-if="data">
            <div
                v-for="guest in data.guests"
                class="text-base leading-[110%] font-medium pb-2 relative cursor-pointer"
                :key="guest.id"
                :class="{
                    'bg-white shadow-tab pt-4 pr-4  pl-4 rounded-t-[10px] text-[#0B6357] font-semibold': Number(route.query.g) == guest.id, 
                    'text-gray-500 pt-4 pr-4 pl-4 hover:bg-[#ECF9F5] hover:rounded-t-lg': Number(route.query.g) !== guest.id,
                }"
                @click="goGuest(guest.id)"
            >
                <img
                    v-if="guest.queryCount > 0"
                    class="w-2.5 h-2.5 absolute top-3 right-2"
                    src="/assets/icons/EllipseWarning.svg" alt=""
                >
                {{ guest.name ?? 'Sin nombre'}}
            </div>
        </div>
    </section>
</template>
<script setup>
import { onMounted, ref, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const data = inject('data');
const notyRef = ref([]);

const props = defineProps({
    view:{
        type:String,
        default:null
    }
})
// onMounted(()=>{

// })


function goGuest(guestId){
    let viewName = 'StayQueryDetail';
    if(props.view == 'checkin'){
        viewName = 'CheckinDetail';
    }
    router.push({
        name: viewName,
        params: { stayId: route.params.stayId },
        query: { g: guestId }
    });
}
</script>
<style scoped>
.shadow-tab{
    box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.15);
}
</style>
