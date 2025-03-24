<template>
    <div class="mt-4">
        <div
            v-for="(item, index) in subservicesData"
            @dragover="handlerDragOver"
            @drop="handlerDrop(index, item)"
            :draggable="true"
            @dragstart="handlerDragStart(index, $event)"
            @dragend="handlerDragEnd"
            ref="draggableCard"
            @mouseover="hoverItem = index"
            @mouseleave="hoverItem = null"
            class="p-[12px] card flex justify-between items-center"
        >
            <div class="space-x-2 flex">
                     <!-- v-if="hoverItem == index" -->
                <button
                    :class="{'cursor-grabbing': dragStartIndex == index}"
                    @mousedown="setDragStart(index)"
                >
                    <img class="w-6 h-6" src="/assets/icons/TH.GRAD.svg" alt="grad">
                </button>
                <div class="card__img">
                    <img class="rounded-[5.455px]" :src="subserviceStore.formatImage({ url: item.image?.url ?? item.image })" :alt="`image_${index}`">
                </div>
                <div class="">
                    <h5 class="text-[12px] font-bold leading-[150%]">{{ item.name }}</h5>
                    <span v-if="!item.fields_visibles.includes('PRICE')" class="text-[12px] font-medium">{{ item?.price }}€</span>
                    <span v-else class="text-[12px] font-medium">GRATIS</span>
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
                    @click="openModalDeleteItem(item, index)"
                >
                    <img
                        src="/assets/icons/1.TH.DELETE.OUTLINE.svg"
                        class="size-6"
                        alt=""
                    >
                </button>
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
import { inject, onMounted, ref, nextTick, watch } from 'vue';

const form = inject('form');
const itemSelected = inject('itemSelected');
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
const dragStartIndex = ref(null);
const hoverItem = ref(null);
const draggableCard = ref(null);

// EVENT
onEvent('load-subservices', loadSubservices);

onMounted(() => {
    loadSubservices();
});

// WATCH

// FUNCTIONS

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
function openModalDeleteItem (item, index) {
    emitEvent('open-modal-delete-item', {indexSubserviceId: index});
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

const handlerDragOver = (event) => {
  event.preventDefault();
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
};

const handlerDragEnd = () => {
  draggedItem.value = null;
  dragStartIndex.value = null;
};

async function updateOrder () {
    const idsSubservices = subservicesData.value.map((item, index) => index);
    // const data = {order: idsSubservices, service_id: form.id, services_type: serviceNameCurrent.value};
    // const response = await subserviceStore.$updateOrder(data);
    // mockupStore.$reloadIframe();
    // subservicesData.value.forEach((item, index) => {
    //     form.subservices[index].order = index;
    //     item.order = index;
    // });
}

</script>

<style lang="scss">
    .card {
        border-radius: 6px;
        border: 1px solid #BFBFBF;
        background: #FFF;
    }
    .card__img {
        background-size: cover;
        width: 60px;
        height: 40px;
        border-radius: 5.455px;
    }
</style>
