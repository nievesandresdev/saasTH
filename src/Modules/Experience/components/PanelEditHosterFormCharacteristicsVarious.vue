<template>
    <div class="mt-4 relative">
        <div
            v-for="(item, index) in subservicesData"
            @dragover="handlerDragOver($event, index)"
            @dragleave="handlerDragLeave($event, index)"
            @drop="handlerDrop(index, item)"
            :draggable="true"
            @dragstart="handlerDragStart(index, $event)"
            @dragend="handlerDragEnd"
            ref="draggableCard"
            @mouseover="hoverItem = index"
            @mouseleave="hoverItem = null"
            class="p-[12px] card-item flex justify-between items-center transition-all duration-200"
            :class="{
                'opacity-75': draggedItem === index,
                'card-item__dragging': draggedItem === index,
                'transform translate-y-4': dragOverIndex === index && draggedItem !== index,
                'mb-6': index < subservicesData.length - 1
            }"
        >
            <div class="space-x-2 flex">
                     <!-- v-if="hoverItem == index" -->
                <button
                    :class="{'cursor-grabbing': dragStartIndex == index}"
                    @mousedown="setDragStart(index)"
                >
                    <img class="w-6 h-6" src="/assets/icons/TH.GRAD.svg" alt="grad">
                </button>
                <div class="card-item__img">
                    <img class="rounded-[5.455px]" :src="subserviceStore.formatImage({ url: item.image?.url ?? item.image })" :alt="`image_${index}`">
                </div>
                <div class="">
                    <h5 class="text-[12px] font-bold leading-[150%]">{{ item.name }}</h5>
                    <span class="text-[12px] font-medium"> {{ subserviceStore.calPrice(item) }} </span>
                </div>
            </div>
            <div class="space-x-4">
                <button
                    @click="editItem(item)"
                >
                    <img
                        src="/assets/icons/1.TH.EDIT.OUTLINED.svg"
                        class="size-6"
                        alt=""
                    >
                </button>
                <button
                    @click="openModalDeleteItem(item)"
                >
                    <img
                        src="/assets/icons/1.TH.DELETE.OUTLINE.svg"
                        class="size-6"
                        alt=""
                    >
                </button>
            </div>
        </div>


        <!-- Skeleton Card -->        <!-- Skeleton Card -->
        <div 
            v-if="draggedItem !== null && dragOverIndex !== null && dragStartIndex !== index"
            class="card-item-skeleton flex justify-between items-center absolute w-full"
            :style="{
                top: `${dragStartIndex * (67 + 24)}px`,
                transition: 'all 0.2s ease'
            }"
        >
        <!-- top: `${dragOverIndex * (67 + 48)}px`, -->
            <div class="space-x-2 flex w-full">
            </div>
        </div>
    </div>
    <div class="flex" :class="subservicesData.length > 0 ? 'justify-end' : 'justify-between'">
        <button
            class="text-[12px] font-medium hbtn-primary py-[12px] px-[8px] flex items-center leading-none justify-center"
            :class="subservicesData.length > 0 ? '' : 'w-full'"
            @click="openPanelEditSubservice('ADD')"
        >
            <img
                src="/assets/icons/1.TH.PLUS.svg"
                class="size-4  mr-2 inline-block"
            >
            {{ subservicesData.length > 0 ? 'Añadir' : 'Añadir subservicio' }}
        </button>
    </div>

</template>

<script setup>
import { inject, onMounted, ref, nextTick } from 'vue';

const form = inject('form');
const languagesData = inject('languagesData');
const subservicesData = inject('subservicesData');
const serviceNameCurrent = inject('serviceNameCurrent');

// COMPOSABLES
import { useEventBus } from '@/composables/eventBus';
const { emitEvent, onEvent } = useEventBus();
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();


// STORE
import { useSubserviceStore } from '@/stores/modules/subservice'
const subserviceStore = useSubserviceStore();

// DATA
// const subservicesData = ref([]);

const draggedItem = ref(null);
const dragOverIndex  = ref(null);
const dragStartIndex = ref(null);
const hoverItem = ref(null);
const draggableCard = ref(null);

// EVENT
onEvent('load-subservices', loadSubservices);

onMounted(() => {
    loadSubservices();
});

function openPanelEditSubservice (typeAction, subservice = null) {
    if (subservice?.languages?.length) {
        let languages = languagesData.value.map(item => {
            return {
                id: null,
                abbreviation: item.abbreviation,
                name: item.name,
            }
        }).filter(item => {
            let language = subservice.languages.find(lagSub => (lagSub.abbreviation || lagSub) === item.abbreviation );
            return language;
        });
        subservice.languages = languages;
    }
    let payload = {
        action: typeAction,
        serviceId: form.id,
        subservice
    }
    emitEvent('open-panel-edit-subservice', payload);
}

async function loadSubservices () {
    subservicesData.value = [...form.subservices];
}

function editItem (item) {
    openPanelEditSubservice('EDIT', item);
}
function openModalDeleteItem (item) {
    emitEvent('open-modal-delete-item', {subserviceId: item.id});
}

//DRAG
const setDragStart = (index) => {
  dragStartIndex.value = index;
};

const handlerDragStart = (index, event) => {
  if (dragStartIndex.value !== index) {
    event.preventDefault();
    return;
  }
  draggedItem.value = index;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', index);
  nextTick(() => {
      event.dataTransfer.setDragImage(draggableCard.value[index], 0, 0);
  });
};

const handlerDragLeave = (event, index) => {
    const relatedTarget = event.relatedTarget;
    if (!relatedTarget || !relatedTarget.closest('.card-item')) {
        dragOverIndex.value = null;
    }
};

const handlerDragOver = (event, index) => {
  event.preventDefault();
  if (dragStartIndex.value !== index) {
    dragOverIndex.value = index;
  }
};

const handlerDrop = (index, facility) => {
  const draggedIndex = parseInt(event.dataTransfer.getData('text/plain'));
  if (draggedIndex !== index) {
    const droppedItem = subservicesData.value.splice(draggedIndex, 1)[0];
    form.subservices.splice(draggedIndex, 1)[0];
    subservicesData.value.splice(index, 0, droppedItem);
    form.subservices.splice(index, 0, droppedItem);
    updateOrder();
  }
  draggedItem.value = null;
  dragStartIndex.value = null;
  dragOverIndex.value = null;
};

const handlerDragEnd = () => {
    draggedItem.value = null;
    dragStartIndex.value = null;
    dragOverIndex.value = null;
};

async function updateOrder () {
    // const idsSubservices = subservicesData.value.map(item => item.id);
    // const data = {order: idsSubservices, service_id: form.id, services_type: serviceNameCurrent.value};
    // const response = await subserviceStore.$updateOrder(data);
    // mockupStore.$reloadIframe();
}

</script>

<style lang="scss">
    .card-item {
        border-radius: 6px;
        border: 1px solid #BFBFBF;
        background: #FFF;
    }
    .card-item__img {
        background-size: cover;
        width: 60px;
        height: 40px;
        border-radius: 5.455px;
    }
    .card-item__dragging {
        box-shadow: 0px 3.5px 7px 0px rgba(0, 0, 0, 0.15);
    }
</style>
