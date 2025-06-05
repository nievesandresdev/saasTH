<template>
    <div class="px-20 pb-10 hidden xl:block">
        <!-- head -->
        <div class="py-6 h-[68px]">
            <div class="flex justify-between items-center">
                <img class="w-[216px] h-10" src="/assets/img/hoster/1.TH.logo.full.svg" alt="">
                <div>
                    <BaseSelectField
                        textLabel="Consultar otros períodos"
                        :options="dropdownOptions"
                        v-model="periodSelected"
                        mandatory
                        @change="updateData"
                    />
                </div>
            </div>
        </div>
        <div class="max-w-[1280px] mx-auto">
            <!-- title -->
            <h2 class="text-[28px] font-medium leading-[140%] text-center">Informe de seguimiento {{ $formatTypeLodging(true) }} {{ hotelStore.hotelData.name }}</h2>
            <h2 class="text-[28px] font-medium leading-[140%] text-center">
                Período: 
                <span 
                    class="inline-block"
                    :class="{'h-[39px] animate-pulse bg-border-secondary htext-secondary rounded-[10px]':loading}"
                >
                    {{loading ? '01/04/2025 - 30/04/2025' : periodSelectedLabel}}
                </span>
            </h2>
            <!-- tabs section -->
            <div class="mt-8">
                <div class="inline-block">
                    <div class="flex items-center gap-2 p-2 bg-[#f3f3f3] rounded-[16px]">
                        <button 
                            class="py-4 px-10 rounded-[8px]" 
                            @click="changeTab(['in-stay','post-stay'])"
                            :class="{'bg-white': periodsToSearch.includes('in-stay') && periodsToSearch.includes('post-stay')}"
                        >
                            <h3 class="text-[16px] font-semibold leading-[120%]">Todos</h3>
                        </button>
                        <button 
                            class="py-4 px-10 rounded-[8px]" 
                            @click="changeTab(['in-stay'])"
                            :class="{'bg-white': periodsToSearch.includes('in-stay') && !periodsToSearch.includes('post-stay')}"
                        >
                            <h3 class="text-[16px] font-semibold leading-[120%] text-[#858181]">Stay</h3>
                        </button>
                        <button 
                            class="py-4 px-10 rounded-[8px]" 
                            @click="changeTab(['post-stay'])"
                            :class="{'bg-white': periodsToSearch.includes('post-stay') && !periodsToSearch.includes('in-stay')}"
                        >
                            <h3 class="text-[16px] font-semibold leading-[120%] text-[#858181]">Post-Stay</h3>
                        </button>
                    </div>
                    <div class="mt-4">
                    </div>  
                </div>
                <div class="mt-4 border-2 border-[#E9E9E9] rounded-[20px] py-6 px-[48px] shadow-hoster">  
                <h2 
                    class="text-[24px] font-medium leading-[120%] inline-block"
                    :class="{'animate-pulse bg-border-secondary htext-secondary rounded-[10px]':loading}"
                >{{data?.stats?.queries?.length ?? 0}} huéspedes respondieron</h2>
                    <div class="flex items-center justify-between mt-4">
                        <button 
                            class="w-[207px] flex flex-col items-center justify-center"
                            :class="{'bg-[#ECF9F5] rounded-[8px]': specificQualificationOrder.includes(item)}"
                            v-for="(item,index) in ['VERYGOOD','GOOD','NORMAL','WRONG','VERYWRONG']" :key="index"
                            @click="filterByQualification(item)"
                        >
                            <img class="w-[100px] h-[100px]" :src="`/assets/icons/reviews/${item}.svg`" alt="">
                            <h3 class="text-[24px] font-medium leading-[110%] mt-2">{{ translateQualification(item) }}</h3>
                            <p 
                                class="text-[40px] font-medium leading-[90%] mt-4" 
                                :class="{'animate-pulse bg-border-secondary htext-secondary rounded-[10px]':loading}"
                            >{{ gData(index)?.percent ?? '0' }}%</p>
                            <p 
                                class="text-[16px] font-semibold leading-[110%] mt-1"
                                :class="{'animate-pulse bg-border-secondary htext-secondary rounded-[10px]':loading}"
                            >({{gData(index)?.count ?? '0' }} respuesta{{gData(index)?.count !== 1 ? 's' : ''}})</p>
                        </button>

                    </div>
                </div>
            </div>
            <!-- head comment list -->
            <div v-if="!(commentList.length == 0 && !loading)" class="mt-8 flex items-end justify-between">
                <h2 class="text-[28px] font-medium leading-[140%]">{{textPeriodSearch}}</h2>
                <div class="w-[230px] flex-shrink-0">
                    <BaseSelectField
                        textLabel="Ordenar por:"
                        :options="sortOptions"
                        v-model="sort"
                        mandatory
                        @change="updateData"
                    />
                </div>
            </div>
            <!-- cards -->
            <div class="mt-4 flex flex-col gap-6">
            <template v-if="data?.stats?.queries?.length > 0 && !loading">
                <div 
                    class="border-2 border-[#E9E9E9] rounded-[20px] p-6" 
                    v-for="item in commentList" :key="item.id" 
                >
                    <h2 class="text-[24px] font-medium leading-[110%] mb-6">{{ item.guestFullName }}</h2>
                    <ResponseCardContent 
                        :key="item.id"
                        :data="item" 
                        :stay="{check_in: item.check_in, check_out: item.check_out}"
                        :period="item.period"
                        report
                    />
                </div>
            </template>
            <div v-else-if="loading" class="border-2 border-[#E9E9E9] rounded-[20px] p-6" v-for="i in 3" :key="i">
                <div class="h-[26px] w-[300px] animate-pulse bg-border-secondary rounded-[4px]"></div>
                <div class="flex items-center mt-[20px] gap-4">
                    <div class="w-[53.333px] h-[53.333px] animate-pulse bg-border-secondary rounded-full"></div>
                    <div class="flex flex-col gap-4">
                        <div class="h-[16px] w-[352px] animate-pulse bg-border-secondary rounded-[4px]"></div>
                        <div class="h-[16px] w-[65px] animate-pulse bg-border-secondary rounded-[4px]"></div>
                        <div class="h-[16px] w-[225px] animate-pulse bg-border-secondary rounded-[4px]"></div>
                    </div>
                </div>
                <div class="h-[22px] w-[700px] animate-pulse bg-border-secondary rounded-[4px] mt-4"></div>
                <div class="h-[54px] w-full animate-pulse bg-border-secondary rounded-[4px] mt-2"></div>
                <div class="flex items-end mt-4">
                    <div>
                        <div class="h-[18px] w-[91px] animate-pulse bg-border-secondary rounded-[4px]"></div>    
                        <div class="flex items-center gap-4 mt-2">
                            <div class="h-[32px] w-[106px] animate-pulse bg-border-secondary rounded-[4px]"></div>
                            <div class="h-[32px] w-[106px] animate-pulse bg-border-secondary rounded-[4px]"></div>
                        </div>
                    </div>
                    <div class="h-[18px] w-[120px] animate-pulse bg-border-secondary rounded-[4px] ml-auto"></div>
                </div>
            </div>
            <div v-else-if="!loading && commentList.length === 0" class="">
                <img class="w-[360px] h-[256px] mx-auto" src="/assets/img/undraw_multiple-choice_9n00.svg" alt="">
                <p class="text-[16px] leading-[140%] mt-4 text-center">Tus huéspedes no han dejado comentarios de feedback</p>
            </div>
            </div>
        </div>
    </div>
    <!-- view mobile -->
    <div class="xl:hidden flex flex-col h-screen items-center justify-center">
        <img class="w-[198px] h-[214px]" src="/assets/img/InformeGeneralMobile.svg" alt="">
        <div class="w-[296px]">
            <h1 class="text-[24px] font-semibold leading-[110%] mt-4">Informe de Seguimiento</h1>
            <p class="text-[16px] font-normal leading-[130%] mt-3">
                Por favor abre este enlace desde un ordenador para una mejor experiencia con TheHoster.
            </p>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import BaseSelectField from '@/components/Forms/BaseSelectField.vue'
import ResponseCardContent from '@/Modules/Stay/Queries/ResponseCardContent.vue'
import { $formatTypeLodging, $formatAnyDate } from '@/utils/helpers';
//
import { useQueryStore } from '@/stores/modules/queries/query'
const queryStore = useQueryStore()
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
import { useRoute } from 'vue-router'
const route = useRoute()

const dropdownOptions = ref([]);
const periodSelected = ref('');
const periodSelectedLabel = ref('');
const from = ref(route.query.from ?? null);
const to = ref(route.query.to ?? null);
const periodType = ref(route.query.periodType ?? 'monthly');

const periodsToSearch = ref(['in-stay','post-stay']);
const specificQualificationOrder = ref([]);
const data = ref(null);
const loading = ref(true);

const sort = ref('recent');

onMounted(async () => {
    const res = await queryStore.$getGeneralReport({
        periodType: periodType.value,
        from: from.value,
        to: to.value,
        periodsToSearch: periodsToSearch.value,
        sort: sort.value
    })

    dropdownOptions.value = res.periodOptions;
    if(route.query.from) {
        periodSelected.value = `{'from': '${route.query.from}', 'to': '${route.query.to}'}`;
        periodSelectedLabel.value = $formatAnyDate(route.query.from) + ' - ' + $formatAnyDate(route.query.to);
    }else{
        periodSelected.value = dropdownOptions.value[0].value;
        periodSelectedLabel.value = dropdownOptions.value[0].label;
    }
    data.value = res;
    loading.value = false;
})


const updateData = async () => {
    loading.value = true;
    await translatePeriodDates(periodSelected.value);
    data.value = null;
    const res = await queryStore.$getGeneralReport({
        periodType: periodType.value,
        from: from.value,
        to: to.value,
        periodsToSearch: periodsToSearch.value,
        sort: sort.value
    })
    data.value = res;
    loading.value = false;
}

const changeTab = (periods) => {
    periodsToSearch.value = periods;
    updateData();
}
const filterByQualification = (qualification) => {
    if(!specificQualificationOrder.value.includes(qualification)){
        specificQualificationOrder.value.push(qualification);
    }else{
        specificQualificationOrder.value = specificQualificationOrder.value.filter(item => item !== qualification);
    }
}

const translatePeriodDates = async (str) => {
    const obj = eval('(' + str + ')');
    console.log('test obj', obj)
    from.value = obj.from;
    to.value = obj.to;
}

const commentList = computed(() => {
  const all = data.value?.stats?.queries || []
  const sel = specificQualificationOrder.value

  // 1) Si no hay filtros, devolvemos todo
  if (sel.length === 0) {
    return all
  }

  // 2) Si hay filtros, vamos concatenando en orden de clic
  return sel.flatMap(qual =>
    all.filter(item => item.qualification === qual)
  )
})


const textPeriodSearch = computed(() => {
    let text = 'Todo el feedback';
    if(periodsToSearch.value.includes('in-stay')) text = 'Feedback en Stay';
    if(periodsToSearch.value.includes('post-stay')) text = 'Feedback en Post-Stay';
    return text;
})

const sortOptions = [
    {value: 'recent', label: 'Más recientes',},
    {value: 'old', label: 'Más antiguas',},
    {value: 'good2bad', label: 'Muy Bueno a Muy Malo',},
    {value: 'bad2good', label: 'Muy Malo a Muy Bueno',},
]

const translateQualification = (qualification) => {
    if(!qualification) return '';
    let arr =[
        {value: 'VERYGOOD', label: 'Muy Bueno',},
        {value: 'GOOD', label: 'Bueno',},
        {value: 'NORMAL', label: 'Normal',},
        {value: 'WRONG', label: 'Malo',},
        {value: 'VERYWRONG', label: 'Muy Malo',},
    ]
    return arr.find(item => item.value === qualification).label;
}

const gData = (index) => {
    return data?.value?.stats?.breakdown[index];
}
</script>
<style>
h1,h2,h3,h4,p{
    font-family: 'Roboto', sans-serif !important;
}
</style>
