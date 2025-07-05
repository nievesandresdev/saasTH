<template>
     <div class="bg-[#FAFAFA]" :class="userStore.showSuscriptionBanner ? 'h-with-banner' : 'h-without-banner'">
            <div class="pb-[104px]">
                <AdminPageHeader />
                <AdminPageBannerShowToGuest v-if="!hotelData.show_transport" />
                <AdminPageTabs @reloadData="reloadData" class="mt-6 px-6" />
                <div class="mt-[24px] px-[24px]">
                    <p
                        class="text-sm font-medium mb-6"
                        :class="{'w-[260px] hbg-gray-500 htext-gray-500 animate-pulse rounded-[6px]':firstLoad, 'hidden':!firstLoad && transportsEmpty}"
                    >{{ searchText }}</p>
                    <AdminPageList
                        @click:editItem="openDrawer"
                        @loadData="loadTransports"
                        @reloadData="reloadData"
                    />
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

// COMPONENT
 import AdminPageHeader from './AdminPageHeader.vue';
 import AdminPageBannerShowToGuest from './AdminPageBannerShowToGuest.vue';
 import AdminPageList from './AdminPageList.vue';
 import PanelEdit from './components/PanelEdit.vue';
  import PanelEditSubservice from '@/Modules/Confort/components/PanelEditSubservice.vue';
  import AdminPageTabs from './AdminPageTabs.vue';

// MODULE
import { useMockupStore } from '@/stores/modules/mockup';
const mockupStore = useMockupStore();
import { useServiceStore } from '@/stores/modules/service';
const serviceStore = useServiceStore();

// COMPOSABLES
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();
import { useEventBus } from '@/composables/eventBus';
const { onEvent } = useEventBus();

import { useRouter } from 'vue-router';
const route = useRouter();

// STATE
import { useUserStore } from '@/stores/modules/users/users';
const userStore = useUserStore();
import { useTransportStore } from '@/stores/modules/transport';
const transportStore = useTransportStore();
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
const transportsEmpty = ref(false);
const transportsData = ref([]);
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
    visibility: null,
});
const paginateData = reactive({
    total: 0,
    current_page: 1,
    per_page: 1,
    last_page: 0,
    from_page: 0,
    to: 0,
});
const numberVisible = ref(0);
const numberHidden = ref(0);

const languagesData = ref([]);

// EVENT
onEvent('open-panel-edit-subservice', openPanelEditSubservice);

watch(modelActive, (valNew, valOld) => {
    if (!valNew && !!valOld) {
        loadMockup();
    }
});

// COMPUTED
const serviceNameCurrent = computed(() => {
    let services  = {
        Conforts: 'Confort',
        Transports: 'Transport',
        Experiences: 'Product',
    }
    let routeName = route.currentRoute.value.name;
    return services[routeName];
});

const searchText = computed(() => {
    let text = "";
    let textVisibles = 'servicios visibles';
    let textHiddens = 'servicios ocultos';
    let singleHidden = 'oculto';

    numberVisible.value == 1 ? textVisibles = 'servicio visible': '';
    numberHidden.value == 1 ? textHiddens = 'servicio oculto': '';
    numberHidden.value == 1 ? singleHidden = 'oculto': '';

    text += `${numberVisible.value} ${textVisibles}`;

    if(formFilter.visibility == 'hidden'){
        text = `${numberHidden.value} ${textHiddens}`;
    }

    if(formFilter.visibility == null){
        text += ` y ${numberHidden.value} ${singleHidden}`;
    }

    return text;
});

onMounted(async() => {
    if(window.screen.width > 1919){
        numberCardsDefault.value = 14;
    }
    loadMockup();
    loadTransports();
    loadLanguanges();
});

// FUNCTION
async function reloadData () {
    formFilter.visibility = null;
    firstLoad.value = true;
    // loadDataFormFilter();
    page.value = 1;
    // isOpenModelFilter.value = false;
    route.push({ name: 'Transports' });
    transportsData.value = [];
    loadTransports();
}
function loadMockup (id = null) {
    if (!id) {
        mockupStore.$setIframeUrl(`/servicios/transport`);
    } else {
        mockupStore.$setIframeUrl(`/servicios/transport/${id}`);
    }
    mockupStore.$setInfo1('Guarda para ver tus cambios en tiempo real', '/assets/icons/info.svg');
    mockupStore.$setLanguageTooltip(true);
}

async function loadTransports () {
    isloadingForm.value=true;
    const response = await transportStore.$getAll({page: page.value,...formFilter});
    if (response.ok) {
        numberVisible.value = response.data.numberVisible;
        numberHidden.value = response.data.numberHidden;
        let paginate = {
            total: response.data.transportServicesCollection.paginate.total,
            current_page: response.data.transportServicesCollection.paginate.current_page,
            per_page: response.data.transportServicesCollection.paginate.per_page,
            last_page: response.data.transportServicesCollection.paginate.last_page,
            from_page: response.data.transportServicesCollection.paginate.from,
            to: response.data.transportServicesCollection.paginate.to,
        }
        Object.assign(paginateData, paginate);
        page.value = paginateData.current_page;
        numberVisible.value = response.data.numberVisible;
        numberHidden.value = response.data.numberHidden;
        transportsData.value = [...transportsData.value, ...response.data.transportServicesCollection.data];
    }
    isloadingForm.value = false;
    firstLoad.value = false;
}

function goPanelEdit () {
    modelActive.value = modelActiveHistory.value;
}

function openDrawer (payload) {
    modelActiveHistory.value = payload.action;
    modelActive.value = payload.action;
    nextTick(() => {
        if (payload.action === 'EDIT') {
            loadMockup(payload.item.id);
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
    loadTransports();
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
provide('formFilter', formFilter);
provide('serviceNameCurrent', serviceNameCurrent);
provide('languagesData', languagesData);
provide('toast', toast);
provide('mockupStore', mockupStore);
provide('transportStore', transportStore);
provide('serviceStore', serviceStore);
provide('transportsData', transportsData);
provide('hotelStore', hotelStore);
provide('hotelData', hotelData);
provide('changePendingInForm', changePendingInForm);
provide('changePendingInFormService', changePendingInFormService);
provide('modalChangePendinginForm', modalChangePendinginForm);
provide('modalChangePendinginFormService', modalChangePendinginFormService);
provide('paginateData', paginateData);
provide('numberVisible', numberVisible);
provide('numberHidden', numberHidden);
provide('selectedCard', selectedCard);
provide('modelActive', modelActive);
provide('modelSubserviceActive', modelSubserviceActive);
provide('page', page);
provide('firstLoad', firstLoad);
provide('isloadingForm', isloadingForm);

</script>