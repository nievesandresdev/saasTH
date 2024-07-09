<template>
    <aside class="w-full h-full flex flex-col bg-white">
        
        <button class="py-[23px] px-4 block">
            <h5 class="text-base font-semibold leading-[120%] text-left">Estancias</h5>
        </button>

        <!-- filters -->
        <div class="px-4  border-b hborder-gray-400">

            <!-- input y button -->
            <div class="flex items-center gap-2">
                <BaseTextField 
                    v-model="search" 
                    :classInput="`py-2 px-3 h-10 ${ !search ? 'border-search-stay' : ''}`" 
                    prependInnerIcon="/assets/icons/1.TH.SEARCH.svg"
                    placeholder="Nombre del huésped"
                />
                <button>
                    <img class="w-6 h-6" src="/assets/icons/1.TH.Filters.svg" alt="">
                </button>
            </div>

            <!-- counters -->
            <div class="mt-4 pb-2">
                <h2 class="text-xs font-semibold leading-[130%]">102 estancias</h2>
                <div class="mt-2 flex items-center gap-1">
                    <div class="flex items-center gap-1">
                        <h2 class="text-xs font-semibold leading-[130%]">71</h2>
                        <span
                            class="px-4 py-1 rounded-full text-[10px] font-semibold leading-[130%]"
                            :class="{'bg-[#D9E8F2]':true,'bg-[#F2F2F2F2]':false,'bg-[#D9F2E9]':false}"
                        >
                            PRE-STAY
                        </span>
                    </div>
                </div>
            </div>
        </div>

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

        <FiltersModal />
    </aside>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useStayStore } from '@/stores/modules/stay/stay';
import CardtayList from './CardtayList.vue'
import FiltersModal from './FiltersModal.vue'
import BaseTextField from '@/components/Forms/BaseTextField.vue';

const stayStore = useStayStore();
const list = ref(null)
const search = ref(null)

onMounted( async() => {
    list.value = await stayStore.$getAllByHotel();
    console.log('list.value',list.value)
})
</script>
<style>
.border-search-stay{
    border: 1px solid #bfbfbf !important;
}
</style>