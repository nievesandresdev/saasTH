<template>
    <div 
      class="bg-white pt-5 pb-4 px-4 rounded-[10px] shadow-hoster"
      :id="$translatePeriod(data.period)"
    >
        
        <!-- toggle button and title -->
        <div class="flex items-center mb-4">
            <h2 class="text-base font-medium">Feedback en {{ $capitalizeFirstLetter($translatePeriod(data.period))}}</h2>
            <div class="flex items-center ml-auto">
            <p class="text-sm mr-2"
                :class="{
                    'font-medium' : attended,
                    'font-semibold' : !attended}"
            >
                Pendiente
            </p>
            <ToggleButton
              v-model="attended"
              @change="toggleAttended"
              :id="`toggle-${data.id}`"
              disabledColor="#FFC506"
              :disabled="sendingChange"
            />
            <p class="text-sm font-medium ml-2"
            :class="{
                'font-medium' : !attended,
                'font-semibold' : attended}"
                >
                Atendido
            </p>
            </div>
        </div>
        
        <ResponseCardContent :data="data" :period="data?.period" :stay="stay"/>

        <div class="mt-4" v-if="data.histories.length > 0">
            <button @click="openHistory = !openHistory" class="flex items-center h-6">
              <h1 class="text-sm font-medium leading-[110%]">Ver feedbacks anteriores</h1>
              <img class="ml-2 w-6 h-6" :src="`/assets/icons/${openHistory ? '1.TH.I.DROPDOWN.OPEN' : '1.TH.I.dropdown'}.svg`" alt="">
            </button>
            <div v-if="openHistory" class="mt-4 flex w-full items-center">
              <div class="h-[1px] flex-grow"><div class="w-full h-full hbg-gray-400"></div></div>
              <h1 class="px-4 text-sm font-medium leading-[110%]">{{ data.histories.length }} feedback</h1>
              <div class="h-[1px] flex-grow"><div class="w-full h-full hbg-gray-400"></div></div>
            </div>
            <div v-if="openHistory" class="mt-4" v-for="dataQ in data.histories" :key="dataQ.id">
              <ResponseCardContent :data="dataQ" :period="data?.period" :stay="stay"/>
            </div>
        </div>
      </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { $capitalizeFirstLetter } from '@/utils/textWritingTypes'
import ToggleButton from '@/components/Buttons/ToggleButton.vue'
import ResponseCardContent from './ResponseCardContent.vue'
//store
import { useQueryStore } from '@/stores/modules/queries/query';
//composable
import { useToastAlert } from '@/composables/useToastAlert'
import { useRoute } from 'vue-router';

const route = useRoute();
const toast = useToastAlert();
const queryStore = useQueryStore();

const emit = defineEmits(['loadNotify'])

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  stay: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  scrollToElement();
})

watch(() => route.hash, (newHash, oldHash) => {
  // console.log('newHash',newHash)
  if (newHash) {
    scrollToElement();
  }
});

const attended = ref(Boolean(props.data?.attended))
const sendingChange = ref(false)
const openHistory = ref(false)

const toggleAttended = async () => {
  sendingChange.value = true
  let pending_bool = attended.value
  let msg = pending_bool ? 'Feedback atendido' : 'Feedback pendiente'

  await queryStore.$togglePendingState (props.data.id, pending_bool, route.params.stayId);
  toast.warningToast(msg,'top-right');
  sendingChange.value = false;
}

const scrollToElement = () => {
  if (route.hash) {
    setTimeout(() => {
      const element = document.querySelector(route.hash.toLocaleLowerCase());
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Retraso de 100ms
  }
}






</script>
