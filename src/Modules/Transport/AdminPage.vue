<template>
     <div class="bg-[#FAFAFA]" :class="userStore.showSuscriptionBanner ? 'h-with-banner' : 'h-without-banner'">
            <div class="pb-[104px]">
                <AdminPageHeader />
                <AdminPageBannerShowToGuest v-if="!hotelData.show_transport" />
                <div class="mt-[24px] px-[24px]">
                    <p
                        class="text-sm font-medium mb-6"
                        :class="{'w-[260px] hbg-gray-500 htext-gray-500 animate-pulse rounded-[6px]':firstLoad, 'hidden':!firstLoad && transportsEmpty}"
                    >{{ searchText }}</p>
                    <AdminPageList  @click:editItem="openDrawer" @loadData="loadTransports" />
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
  import PanelEditSubservice from '@/Modules/Confort/components/PanelEditSubservice.vue';

// MODULE
import { useMockupStore } from '@/stores/modules/mockup';
const mockupStore = useMockupStore();

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
   return paginateData.total == 1 ? `${paginateData.total} servicio de transporte` :  `${paginateData.total} servicios de transporte`;
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
        transportsData.value = [...transportsData.value, ...response.data.data];
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
provide('serviceNameCurrent', serviceNameCurrent);
provide('languagesData', languagesData);
provide('toast', toast);
provide('mockupStore', mockupStore);
provide('transportStore', transportStore);
provide('transportsData', transportsData);
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