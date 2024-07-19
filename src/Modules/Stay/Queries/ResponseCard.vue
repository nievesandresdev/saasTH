<template>
    <div class="bg-white pt-5 pb-2 px-4 rounded-[10px] shadow-hoster">
      <div class="flex items-center mb-4">
        <h2 class="text-base font-medium">Feedback en {{ words[data.period]}}</h2>
        <div class="flex items-center ml-auto">
          <p class="text-sm mr-2"
            :class="{
                'font-medium' : attended,
                'font-semibold' : !attended}"
          >
            Pendiente
          </p>
          <label :for="`toggle-${data.id}`" class="relative mb-0 cursor-pointer">
            <input
              type="checkbox"
              :id="`toggle-${data.id}`"
              class="sr-only"
              v-model="attended"
              @change="toggleAttended"
              :disabled="sendingChange"
            />
            <div
              class="block w-[30px] h-[18px] rounded-full"
              :class="{'hborder-warning hbg-warning':!attended, 'hbg-green-600':attended}"
            ></div>
            <div class="dot absolute left-[0.125rem] top-[0.125rem] hbg-white-100 w-3.5 h-3.5 rounded-full transition"></div>
          </label>
          <p class="text-sm font-medium ml-2"
          :class="{
            'font-medium' : !attended,
            'font-semibold' : attended}"
            >
            Atendido
          </p>
        </div>
      </div>
      <div class="flex items-center mb-2">
        <img class="w-4 h-4" :src="`/assets/icons/1.TH.SCHEDULE.svg`" alt="">
        <p class="text-xs font-normal ml-2">{{$formatTimestampDate(data.created_at,'dd/MM/yyyy')}} | {{ parseInt(daysDifference) }} {{ dayLabel }} {{ beforeOrAfter }} del {{ periodLabel }}</p>
      </div>
      <div class="flex items-center">
        <img class="w-4 h-4" :src="`/assets/icons/1.TH.CLOCK.svg`" alt="">
        <p class="text-xs font-normal ml-2"> {{ $formatTimestampDate(data.created_at,'HH:mm') }} </p>
                        
      </div>
      <div class="flex items-center mt-2">
        <p class="text-xs font-normal mr-2">Idioma Original:</p>
        <img v-if="data.response_lang !== 'Desconocido'" class="w-4 h-4" :src="`/assets/icons/flags/${data.response_lang}.svg`" alt="">
            <p class="text-xs font-medium ml-1 leading-[110%]">{{ $nameLanguage(data.response_lang)}}</p>
      </div>
      <div class="mt-4">
        <span class="font-medium text-sm">{{ questions[data.period] }}</span>
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

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  view: {
    type: String,
    default: null
  },
  selected: {
    type: String,
    default: null
  },
  stay: {
    type: Object,
    default: null
  }
})

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

const emit = defineEmits(['loadNotify'])
const toast = inject('toast')

const attended = ref(props.data?.attended)
const selectedLang = ref(props.data.languages ? props.data.languages[0]?.code : null)
const sendingChange = ref(false)
const translateQualification = ref(null)
const questions = {
  "pre-stay": "¿Hay algo que podamos hacer para tu llegada al hotel?",
  "in-stay": "¿Cómo calificarías tu nivel de satisfacción con tu estancia hasta ahora?",
  "post-stay": "¿Cómo ha sido tu experiencia con nosotros?",
}
const queryQualificationText = {
  "in-stay": {
    "WRONG": "Muy malo.",
    "NORMAL": "Normal.",
    "GOOD": "Muy bueno.",
  },
  "post-stay": {
    "WRONG": "Muy mala.",
    "NORMAL": "Normal.",
    "GOOD": "Muy buena.",
  },
}

const words = {
  "pre-stay": "Pre-Stay",
  "in-stay": "Stay",
  "post-stay": "Post-Stay",
}

const name_language = {
  "es": "Español",
  "en": "Inglés",
  "fr": "Francés",
}
onMounted(() => {
  let qualification = props.data?.qualification
  if (qualification) {
    let periodTranslate = queryQualificationText[props.data?.period]
    let qualificationTranslate = periodTranslate[qualification]
    translateQualification.value = qualificationTranslate
  }
})

const toggleAttended = () => {
  sendingChange.value = true
  let pending_bool = attended.value
  let msg = pending_bool ? 'Consulta atendida' : 'Consulta pendiente'

  // Inertia.post(route('stay.queries.togglePendingState'), {
  //   id: props.data.id, bool: pending_bool, period: props.view, selected: props.selected, guestId: props.data.guest_id
  // }, { onSuccess: (page) => {} });
}
</script>
