<template>
    <div>
        
        <!-- date info-->
        <div class="flex items-center mb-2">
            <img class="w-4 h-4" src="/assets/icons/1.TH.schedule.svg" alt="">
            <p class="text-xs font-normal ml-2">
              {{$formatTimestampDate(data.responded_at,'dd/MM/yyyy')}} 
              <template v-if="parseInt(daysDifference) > 0">
                | {{ parseInt(daysDifference) }} {{ dayLabel }} {{ beforeOrAfter }} del {{ periodLabel }}
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
            <img v-if="data.response_lang !== 'Desconocido'" class="w-4 h-4" :src="`/assets/icons/flags/${data.response_lang}.svg`" alt="">
                <p class="text-xs font-medium ml-1 leading-[110%]">{{ $nameLanguage(data.response_lang)}}</p>
        </div>

        <!-- comment -->
        <div class="mt-2">
            <span class="font-medium text-sm">{{ questions[period] }}</span>
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
  if (props.period === 'post-stay') {
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

  // Calcular la diferencia en días y asegurar que es un valor absoluto
  return Math.abs(referenceDate.value.diff(respondedAt, 'days').days);
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
  // console.log('responded_at',respondedAt)
  // console.log('referenceDate.value',referenceDate.value)
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
    "WRONG": "Muy mala.",
    "NORMAL": "Normal.",
    "GOOD": "Muy buena.",
    "VERYGOOD": "Muy buena.",
  },
}



</script>