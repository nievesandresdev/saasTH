<template>
    <aside class="w-full h-screen bg-white">
        
        <button class="cusor-pointer pt-[24px] pb-[16px] px-[16px] aside-stay__header block">
            <h5 class="text-sm font-semibold uppercase">estancias</h5>
        </button>


        <div
            class="overflow-y-auto custom-scrollbar"
        >
        <!-- :class="{
                'expanded-freetrial': !($page.props.status_subscription.status === 0) ,
                'expanded-suscribed': $page.props.status_subscription.status === 0
            }" -->
            <template v-for="stay in list" :key="stay.id">
                <CardtayList :selected_stay="selected_stay" :stay="stay"/>
            </template>
        </div>

    </aside>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useStayStore } from '@/stores/modules/stay/stay';
import CardtayList from './CardtayList.vue'

const stayStore = useStayStore();
const list = ref(null)


onMounted( async() => {
    list.value = await stayStore.$getAllByHotel();
    console.log('list.value',list.value)
})
</script>