<template>
     <div class="bg-[#FAFAFA]" :class="userStore.showSuscriptionBanner ? 'h-with-banner' : 'h-without-banner'">
            <div class="pb-[104px]">
                <AdminPageHeader />
                <AdminPageBannerShowToGuest v-if="!hotelData.show_confort" />
                <div class="mt-[24px] px-[24px]">
                    <p
                        class="text-sm font-medium mb-6"
                        :class="{'w-[260px] hbg-gray-500 htext-gray-500 animate-pulse rounded-[6px]':firstLoad, 'hidden':!firstLoad && confortsEmpty}"
                    >{{ searchText }}</p>
                    <AdminPageList  @click:editItem="openDrawer" @loadData="loadConforts" />
                </div>
            </div>
            <PanelEdit
                ref="panelEditRef"
                @load:resetPageData="resetPageData()"
            />
            <PanelEditSubservice
                ref="panelEditSubserviceRef"
                @load:resetPageData="resetPageData()"
                @openPanelEdit="goPanelEdit()"
            />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, provide, computed, nextTick, watch } from 'vue';
import { $throttle, $isElementVisible } from '@/utils/helpers';

// COMPONENT
 import AdminPageHeader from './AdminPageHeader.vue';
 import AdminPageBannerShowToGuest from './AdminPageBannerShowToGuest.vue';
 import AdminPageList from './AdminPageList.vue';
 import PanelEdit from './components/PanelEdit.vue';
 import PanelEditSubservice from './components/PanelEditSubservice.vue';

// MODULE
import { useMockupStore } from '@/stores/modules/mockup';
const mockupStore = useMockupStore();

// COMPOSABLES
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();
import { useEventBus } from '@/composables/eventBus';
const { onEvent } = useEventBus();

// STATE
import { useUserStore } from '@/stores/modules/users/users';
const userStore = useUserStore();
import { useConfortStore } from '@/stores/modules/confort';
const confortStore = useConfortStore();
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
const { hotelData } = hotelStore;
import { useUtilStore } from '@/stores/modules/util'
const utilStore = useUtilStore();

// DATA
const modelActive = ref(null);
const modelActiveHistory = ref(null);
const modelSubserviceActive = ref(null);
const numberCardsDefault = ref(10);
const confortsEmpty = ref(false);
const confortsData = ref([]);
const page = ref(1);
const firstLoad = ref(true);
const isloadingForm = ref(false);
const selectedCard = ref(null);

const changePendingInForm = ref(false);
const changePendingInFormService = ref(false);
const modalChangePendinginForm = ref(false);
const modalChangePendinginFormService = ref(false);
const panelEditRef = ref(null);
const panelEditSubserviceRef = ref(null);
const formFilter = reactive({

});
const paginateData = reactive({
    total: 0,
    current_page: 1,
    per_page: 1,
    last_page: 0,
    from_page: 0,
    to: 0,
});

const languagesData = ref([]);

// EVENT
onEvent('open-panel-edit-subservice', openPanelEditSubservice);

watch(modelActive, (valNew, valOld) => {
    if (!valNew && !!valOld) {
        loadMockup();
    }
});

// COMPUTED
const searchText = computed(() => {
   return paginateData.total == 1 ? `${paginateData.total} servicio de confort` :  `${paginateData.total} servicios de confort`;
});

onMounted(async() => {
    if(window.screen.width > 1919){
        numberCardsDefault.value = 14;
    }
    
    loadMockup();
    loadConforts();
    loadLanguanges();
});

// FUNCTION
function loadMockup (id = null) {
    if (id) {
        mockupStore.$setIframeUrl(`/servicios/confort/${id}`);
    } else {
        mockupStore.$setIframeUrl(`/servicios/confort`);
    }
    mockupStore.$setInfo1('Guarda para ver tus cambios en tiempo real', '/assets/icons/info.svg');
    mockupStore.$setLanguageTooltip(true);
}

async function loadConforts () {
    // console.log('loadPlaces')
    // isloadingForm.value=true;
    isloadingForm.value=true;
    const response = await confortStore.$getAll({page: page.value,...formFilter});
    if (response.ok) {
        let paginate = {
            total: response.data.paginate.total,
            current_page: response.data.paginate.current_page,
            per_page: response.data.paginate.per_page,
            last_page: response.data.paginate.last_page,
            from_page: response.data.paginate.from,
            to: response.data.paginate.to,
        }
        Object.assign(paginateData, paginate);
        page.value = paginateData.current_page;
        confortsData.value = [...confortsData.value, ...response.data.data];
    }
    firstLoad.value = false;
    isloadingForm.value=false;
}

function goPanelEdit () {
    modelActive.value = modelActiveHistory.value;
}

function openDrawer (payload) {
    modelActiveHistory.value = payload.action;
    modelActive.value = payload.action;
    nextTick(() => {
        if (payload.action === 'EDIT') {
            loadMockup(`${payload.item.id}`);
        } else {
            // loadMockup('/fakedetail');
        }
        panelEditRef.value.edit(payload);
    });
}

function resetPageData () {
    changePendingInForm.value = false;
    changePendingInFormService.value = false;
    //mockupStore.$reloadIframe();
    loadMockup();
    loadConforts();
}

// function SUBSERVICE
function openDrawerSubservice (payload) {
    modelSubserviceActive.value = payload.action;
    nextTick(() => {
        if (payload.action === 'EDIT') {
            // loadMockup(`${payload.item.id}`);
        } else {
            // loadMockup('/fakedetail');
        }
        panelEditSubserviceRef.value.edit(payload);
    });
}
async function openPanelEditSubservice (payload) {
    modelActive.value = null;
    await nextTick();
    openDrawerSubservice(payload);
}

async function loadLanguanges () {
    const response = await utilStore.$getLanguages();
    const { ok, data } = response;
    if (ok) {
        languagesData.value= data;
    } else {
        toast.warningToast(data?.message,'top-right');
    }
}

// PROVIDE
provide('languagesData', languagesData);
provide('toast', toast);
provide('mockupStore', mockupStore);
provide('confortStore', confortStore);
provide('confortsData', confortsData);
provide('hotelStore', hotelStore);
provide('hotelData', hotelData);
provide('changePendingInForm', changePendingInForm);
provide('changePendingInFormService', changePendingInFormService);
provide('modalChangePendinginForm', modalChangePendinginForm);
provide('modalChangePendinginFormService', modalChangePendinginFormService);
provide('paginateData', paginateData);
provide('selectedCard', selectedCard);
provide('modelActive', modelActive);
provide('modelSubserviceActive', modelSubserviceActive);
provide('page', page);
provide('firstLoad', firstLoad);
provide('isloadingForm', isloadingForm);

</script>