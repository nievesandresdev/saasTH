<template>
    <div>
        
        <!-- date info-->
        <div class="flex items-center mb-2">
            <img class="w-4 h-4" src="/assets/icons/1.TH.schedule.svg" alt="">
            <p class="text-xs font-normal ml-2">
              {{$formatTimestampDate(data.responded_at,'dd/MM/yyyy')}} 
              <template v-if="daysDifference > 0">
                | {{ daysDifference }} {{ dayLabel }} {{ beforeOrAfter }} del {{ periodLabel }}
              </template>
              <template v-else>
                | dia del {{ periodLabel }}
              </template>
            </p>
        </div>

        <!-- time -->
        <div class="flex items-center">
            <img class="w-4 h-4" :src="`/assets/icons/1.TH.CLOCK.svg`" alt="">
            <p class="text-xs font-normal ml-2"> {{ $formatTimestampDate(data.responded_at,'HH:mm') }} </p>
                            
        </div>

        <!-- original languaje -->
        <div class="flex items-center mt-2">
            <p class="text-xs font-normal mr-2">Idioma Original:</p>
            <img 
              v-if="data.response_lang == 'Desconocido' || data.response_lang == 'unknown'" 
              src="/assets/icons/1.TH.SINIDIOMA.svg" 
              class="w-4 h-4"
            >
            <img v-else class="w-4 h-4" :src="`/assets/icons/flags/${data.response_lang}.svg`" alt="">
              <p class="text-xs font-medium ml-1 leading-[110%]">{{ $nameLanguage(data.response_lang)}}</p>
        </div>

        <!-- comment -->
        <div class="mt-4">
            <p class="font-medium text-sm leading-[110%]">{{ questions[period] }}</p>
            <!-- qualification -->
            <div class="flex justify-left items-center mt-2">
                    <img
                        v-if="data.qualification"
                        class="w-10 h-10 mr-2"
                        :src="`/assets/icons/emojis/colors/1.TH.Emojis${data.qualification}.svg`"
                    >

                    <p v-if="selectedLang" class="text-sm leading-[150%]">
                        {{ translateQualification }}
                        {{ data?.comment[selectedLang] }}
                    </p>
                    <p v-else class="text-sm leading-[150%]">
                        <template v-if="data?.qualification">
                            {{ translateQualification }}
                        </template>
                    </p>
            </div>
            <!-- translate -->
            <p class="text-xs font-medium mb-2 mt-4 leading-[90%]" v-if="data.languages?.length > 0">Traducir al:</p>
            <div class="flex gap-4 items-center">  
              <div
                  v-for="lang in data.languages" :key="lang?.code"
                  class="py-2 px-3 flex rounded-[6px] items-center cursor-pointer chip-primary h-8"
                  :class="{'border-[1px] hborder-green-700 bg-[#ECF9F5]':selectedLang == lang?.code}"
                  @click="selectedLang = lang?.code"
                  v-show="lang?.code != data.response_lang"
              >
                  <img v-if="lang.name !== 'Desconocido'" class="w-4 h-4" :src="`/assets/icons/flags/${lang?.code}.svg`" alt="">
                  <p class="text-sm font-medium ml-2 leading-[110%] chip-text">{{ lang.name }}</p>
              </div>
              <span 
                  v-if="data.languages?.length > 0 && selectedLang != data.response_lang" 
                  class="text-sm font-medium leading-[110%] underline cursor-pointer"  
                  @click="selectedLang = data.response_lang"
                >Mostrar original</span>
              <button class="text-base font-semibold leading-[110%] underline ml-auto mt-auto" v-if="report">
                Ver la estancia
              </button>
              <a v-if="!report && data.period !== 'pre-stay' && !isComponent" class="text-sm font-medium leading-[110%]  ml-auto mt-auto underline hover:underline focus:underline" :href="`mailto:${data.guest.email}`">
                  Responder al huésped
              </a>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue'
import { DateTime, Duration } from 'luxon'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  period: {
    type: Object,
    default: () => ({})
  },
  stay: {
    type: Object,
    default: null
  },
  report: {
    type: Boolean,
    default: false
  },
  isComponent: {
    type: Boolean,
    default: false
  }
})

onMounted(() => {
  let qualification = props.data?.qualification
  if (qualification) {
    let periodTranslate = queryQualificationText[props.period]
    let qualificationTranslate = periodTranslate[qualification]
    translateQualification.value = qualificationTranslate
  }
})


const selectedLang = ref(props.data.languages ? props.data.languages[0]?.code : null)
const translateQualification = ref(null)

// Computed properties
const referenceDate = computed(() => {
  if (props.period == 'post-stay') {
    return DateTime.fromISO(props.stay.check_out)
  }
  return DateTime.fromISO(props.stay.check_in)
})


const daysDifference = computed(() => {
  // Convertir la cadena de fecha usando el formato correcto
  const respondedAt = DateTime.fromFormat(props.data.responded_at, 'yyyy-MM-dd HH:mm:ss', { zone: 'Europe/Madrid' });
  // Comprobar si respondedAt es válido
  if (!respondedAt.isValid) {
    return 0;
  }

  let result;
  // Calcular la diferencia en días y asegurar que es un valor absoluto
  if (referenceDate.value > respondedAt) {
    result = referenceDate.value.diff(respondedAt, 'days').days;
  }else{
    result = respondedAt.diff(referenceDate.value, 'days').days;
  }
  // console.log('test result', result)
  return Math.round(result < 1 ? 0 : result);
});


const dayLabel = computed(() => {
  return parseInt(daysDifference.value) == 1 ? 'día' : 'días'
})

const periodLabel = computed(() => {
  if (props.period === 'post-stay') {
    return 'check-out'
  }
  return 'check-in'
})

const beforeOrAfter = computed(() => {
  const respondedAt = DateTime.fromFormat(props.data.responded_at, 'yyyy-MM-dd HH:mm:ss', { zone: 'Europe/Madrid' });
  // console.log('test result',respondedAt < referenceDate.value)
  return respondedAt < referenceDate.value ? 'antes' : 'después'
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
    "WRONG": "Mala.",
    "NORMAL": "Normal.",
    "GOOD": "Buena.",
    "VERYGOOD": "Muy buena.",
  },
}



</script>