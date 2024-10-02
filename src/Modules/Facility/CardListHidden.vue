<template>
    <div
        v-for="(item, index) in hiddenFacilities"
        :key="index"
        class="text-center rounded-[10px] cursor-pointer w-[224px] overflow-hidden relative hbg-white-100 relative"
        @mouseover="hoverItem = index"
        @mouseleave="hoverItem = null"
        @click="editFacility(item)"
    >
        <div v-if="hoverItem == index" class="hover-swich hbg-gray-100 rounded-[6px] py-1 px-2 flex justify-center items-center space-x-1 inline-block absolute top-2 right-2 z-[100]">
            <span class="text-[10px] font-semibold">Oculto</span>
            <BaseSwichInput
                v-model="item.select"
                :id="`swich-visible-facility-${index}`"
                @change:value="updateVisible(item)"
                @click="handlerClickSwichVisibility"
            />
        </div>
        <div
            v-if="item.select == 0"
            class="hidden-overlay h-full w-full absolute top-0 left-0 cursor-pointer z-40"
        />
        <div class="w-full h-32 relative">
            <img
                class="w-full object-cover rounded-t-lg h-full"
                :src="facilityStore.formatImage(item.image)"
            />
        </div>
        <div class="py-[19px] px-[12px] text-center bg-white truncate-1">
            <h5 class="text-base htext-black-100 px-[20px] leading-[110%] truncate-1" v-html="item.title"></h5>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, provide, computed, inject, nextTick } from 'vue';

// COMPONENTS
import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";

const emit = defineEmits(['update:reloadItems', 'click:editFacility']);

// DATA
const selectedCard = ref(null);
const mockupStore = inject('mockupStore');
//
const hoverItem = ref(null);

//INJECT
const facilityStore = inject('facilityStore');
const hiddenFacilities = inject('hiddenFacilities');

// FUNCTIONS

////

function editFacility (facility) {
    emit('click:editFacility', { action: 'EDIT', facility});
}

async function updateVisible (facility) {
    const data = {visible: facility.select, facility_hoster_id: facility.id}
    // console.log(data, 'data')
    const response = await facilityStore.$updateVisible(data)
    // console.log(response, 'response')
    emit('update:reloadItems')
    mockupStore.$reloadIframe();
}


function handlerClickSwichVisibility (event) {
    event.stopPropagation();
}


</script>

<style scoped>
.shadow-card{
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
}

.shadow-selected,
.shadow-card:hover{
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.15);
}


.hidden-overlay{
    background: rgba(0, 0, 0, 0.30)
}
.shadow-draginng {
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
</style>