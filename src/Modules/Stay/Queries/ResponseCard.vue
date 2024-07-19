<template>
    <div class="bg-white pt-5 pb-2 px-4 rounded-[10px] shadow-hoster">
        
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

        <!-- date info-->
        <div class="flex items-center mb-2">
            <img class="w-4 h-4" :src="`/assets/icons/1.TH.SCHEDULE.svg`" alt="">
            <p class="text-xs font-normal ml-2">{{$formatTimestampDate(data.created_at,'dd/MM/yyyy')}} | {{ parseInt(daysDifference) }} {{ dayLabel }} {{ beforeOrAfter }} del {{ periodLabel }}</p>
        </div>

        <!-- time -->
        <div class="flex items-center">
            <img class="w-4 h-4" :src="`/assets/icons/1.TH.CLOCK.svg`" alt="">
            <p class="text-xs font-normal ml-2"> {{ $formatTimestampDate(data.created_at,'HH:mm') }} </p>
                            
        </div>

        <!-- original languaje -->
        <div class="flex items-center mt-2">
            <p class="text-xs font-normal mr-2">Idioma Original:</p>
            <img v-if="data.response_lang !== 'Desconocido'" class="w-4 h-4" :src="`/assets/icons/flags/${data.response_lang}.svg`" alt="">
                <p class="text-xs font-medium ml-1 leading-[110%]">{{ $nameLanguage(data.response_lang)}}</p>
        </div>

        <!-- comment -->
        <div class="mt-4">
            <span class="font-medium text-sm">{{ questions[data.period] }}</span>
            <!-- qualification -->
            <div class="flex justify-left items-center mt-2">
                    <img
                        v-if="data.qualification"
                        class="w-10 h-10 pr-2"
                        :src="`/assets/icons/emojis/1.TH.Emojis${data.qualification}.svg`"
                    >

                    <p v-if="selectedLang" class="text-sm">
                        {{ translateQualification }}
                        {{ data?.comment[selectedLang] }}
                    </p>
                    <p v-else class="text-sm">
                        <template v-if="data?.qualification">
                            {{ translateQualification }}
                        </template>
                    </p>
            </div>
            <!-- translate -->
            <p class="text-xs font-medium mb-2 mt-4" v-if="data.languages?.length > 0">Traducir al:</p>
            <div class="flex gap-4 items-center">  
            <div
                v-for="lang in data.languages" :key="lang?.code"
                class="p-2 flex rounded-[6px] items-center cursor-pointer border-[1px] border-black"
                :class="{'border-[1px] hborder-green-700 bg-[#ECF9F5]':selectedLang == lang?.code}"
                @click="selectedLang = lang?.code"
                v-show="lang?.code != data.response_lang"
            >
                <img v-if="lang.name !== 'Desconocido'" class="w-4 h-4" :src="`/assets/icons/flags/${lang?.code}.svg`" alt="">
                <p class="text-sm font-medium ml-2 leading-[110%]">{{ lang.name }}</p>
            </div>
            <span v-if="data.languages?.length > 0 && selectedLang != data.response_lang" class="font-medium text-black underline cursor-pointer"  @click="selectedLang = data.response_lang">Mostrar original</span>
            </div>
        </div>
        
        </div>
  </template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import { DateTime, Duration } from 'luxon'
import { $capitalizeFirstLetter } from '@/utils/textWritingTypes'
import ToggleButton from '@/components/Buttons/ToggleButton.vue'
//store
import { useQueryStore } from '@/stores/modules/queries/query';
//composable
import { useToastAlert } from '@/composables/useToastAlert'


const toast = useToastAlert();
const queryStore = useQueryStore();

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
  let qualification = props.data?.qualification
  if (qualification) {
    let periodTranslate = queryQualificationText[props.data?.period]
    let qualificationTranslate = periodTranslate[qualification]
    translateQualification.value = qualificationTranslate
  }
})

const toggleAttended = async () => {
  sendingChange.value = true
  let pending_bool = attended.value
  let msg = pending_bool ? 'Consulta atendida' : 'Consulta pendiente'

  await queryStore.$togglePendingState (props.data.id, pending_bool);
  toast.warningToast(msg,'top-right');
  sendingChange.value = false;
}

const emit = defineEmits(['loadNotify'])

const attended = ref(Boolean(props.data?.attended))
const selectedLang = ref(props.data.languages ? props.data.languages[0]?.code : null)
const sendingChange = ref(false)
const translateQualification = ref(null)

// Computed properties

const referenceDate = computed(() => {
  if (props.data.period === 'post-stay') {
    return DateTime.fromISO(props.stay.check_out)
  }
  return DateTime.fromISO(props.stay.check_in)
})

const daysDifference = computed(() => {
  const createdAt = DateTime.fromISO(props.data.created_at)
  return Math.abs(referenceDate.value.diff(createdAt, 'days').days)
})

const beforeOrAfter = computed(() => {
  const createdAt = DateTime.fromISO(props.data.created_at)
  return createdAt < referenceDate.value ? 'antes' : 'después'
})

const periodLabel = computed(() => {
  if (props.data.period === 'post-stay') {
    return 'check-out'
  }
  return 'check-in'
})

const dayLabel = computed(() => {
  return daysDifference.value === 1 ? 'día' : 'días'
})

const questions = {
  "pre-stay": "¿Hay algo que podamos hacer para tu llegada al hotel?",
  "in-stay": "¿Cómo calificarías tu nivel de satisfacción con tu estancia hasta ahora?",
  "post-stay": "¿Cómo ha sido tu experiencia con nosotros?",
}
const queryQualificationText = {
  "in-stay": {
    "VERYWRONG": "Muy malo.",
    "WRONG": "Malo.",
    "NORMAL": "Normal.",
    "GOOD": "Bueno.",
    "VERYGOOD": "Muy bueno.",
  },
  "post-stay": {
    "VERYWRONG": "Muy mala.",
    "WRONG": "Muy mala.",
    "NORMAL": "Normal.",
    "GOOD": "Muy buena.",
    "VERYGOOD": "Muy buena.",
  },
}



</script>
