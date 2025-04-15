<template>
    <div v-show="feedback" class="">
      <div class="mb-4 flex items-center text-gray-600">
        <span class="text-sm font-semibold">Feedback del huésped</span>
        <Tooltip
            size="s"
            :top="25"
            :right="-118"
            class="ml-2 w-4 h-4"
        >
            <template v-slot:button>
                <img class="w-4 h-4" src="/assets/icons/1.TH.INFO.svg">
            </template>
            <template v-slot:content>
                <span class="text-sm">
                    Feedback proporcionado por el huésped en el producto <strong>Seguimiento</strong>
                </span>
            </template>
        </Tooltip>
      </div>
      <div class="flex gap-4">
        <div
            class="px-2 py-4 rounded-lg text-center border-[1px] w-[91px] h-[93px]"
            v-for="(feed, index, key) in feedback " :key="key"
            :class="{
                'border-black shadow-md hover:bg-[#FAFAFA]': feed.answeredTime,
                'border-[#BFBFBF]': !feed.answeredTime,
                'cursor-pointer': feed.icon === 'Respondido'
            }"
            @click="goFeedback(feed.icon === 'Respondido')"
        >
          <div class="flex justify-center mb-2" v-if="!feed.feeling">
            <!-- si es prestay y no respondieron -->
            <svg v-if="index == 'preStay' && feed.icon === 'Esperando respuesta'" xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 21 20" fill="none">
              <rect x="0.9" y="0.4" width="19.2" height="19.2" rx="9.6" stroke="#333333" stroke-width="0.8"/>
              <path d="M13.2779 12.3148L9.57424 10.4629V5.83331M8.11921 16.2289C5.61314 15.2704 3.8335 12.843 3.8335 9.99998C3.8335 6.31808 6.81826 3.33331 10.5002 3.33331C14.1821 3.33331 17.1668 6.31808 17.1668 9.99998C17.1668 12.3762 15.9236 14.4621 14.0522 15.6426M8.11921 16.2289L7.64302 14.7619M8.11921 16.2289L6.69064 16.6666" stroke="#333333" stroke-width="0.8" stroke-linecap="round"/>
            </svg>
            <!-- no enviado -->
            <img v-else-if="feed.icon === 'No enviado'" class="w-6 h-6" src="/assets/icons/1.TH.Not send.svg" alt="">
  
            <!--  respondieron -->
            <svg v-else-if="feed.icon === 'Respondido'" xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 21 20" fill="none">
                <rect x="0.9" y="0.4" width="19.2" height="19.2" rx="9.6" stroke="#333333" stroke-width="0.8"/>
                <path d="M15.5 7L9.07143 14L5.5 11.2" stroke="#333333" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <!-- no respondieron -->
            <img v-else-if="feed.icon === 'No respondido'" class="w-6 h-6" src="/assets/icons/1.TH.Not response.svg" alt="">
            <!-- error-->
            <img  v-else-if="feed.icon === 'Error'" class="w-6 h-6" src="/assets/icons/1.TH.Not send.svg" alt="">
  
            <!-- carita sin respuesta -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path d="M22.5 12C22.5 17.5228 18.0228 22 12.5 22C6.97778 22 2.5 17.5228 2.5 12C2.5 6.47778 6.97778 2 12.5 2C18.0228 2 22.5 6.47778 22.5 12Z" fill="#BFBFBF"/>
                <path d="M8.88889 13.1111C9.65595 13.1111 10.2778 12.2406 10.2778 11.1667C10.2778 10.0928 9.65595 9.22222 8.88889 9.22222C8.12183 9.22222 7.5 10.0928 7.5 11.1667C7.5 12.2406 8.12183 13.1111 8.88889 13.1111Z" fill="white"/>
                <path d="M16.1111 13.1111C16.8782 13.1111 17.5 12.2406 17.5 11.1667C17.5 10.0928 16.8782 9.22222 16.1111 9.22222C15.344 9.22222 14.7222 10.0928 14.7222 11.1667C14.7222 12.2406 15.344 13.1111 16.1111 13.1111Z" fill="white"/>
            </svg>
          </div>
          <div v-else class="flex justify-center items-center mb-2">
            <img
                v-if="feed.feeling"
                class="w-6 h-6"
                :src="`/assets/icons/emojis/1.TH.Emojis${feed.feeling}.svg`"
            >
          </div>
          <div class="text-[#333333] text-xs font-semibold">{{ qualification(index,feed)  }}</div>
          <div class="text-[10px] font-semibold text-[#A0A0A0]">{{ period[index] }} </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import Tooltip from '@/components/Tooltip.vue'
    import { useRouter, useRoute } from 'vue-router';

    const router = useRouter();
    const route = useRoute();

    const props = defineProps({
      feedback: {
        type: Object,
        default: () => null
      }
    })
  
    const period = {
        "preStay":"PRE-STAY",
        "stay":"STAY",
        "postStay":"POST-STAY",
    } 
  
    const queryQualificationText = {
        "stay": {
            "VERYWRONG": "Muy malo",
            "WRONG": "Malo",
            "NORMAL": "Normal",
            "GOOD": "Bueno",
            "VERYGOOD": "Muy bueno",
            null : "-",
            "respondido" : "Respondido",
        },
        "postStay": {
            "VERYWRONG": "Muy mala",
            "WRONG": "Mala",
            "NORMAL": "Normal",
            "GOOD": "Buena",
            "VERYGOOD": "Muy buena",
            null : "-",
            "respondido" : "Respondido",
        },
        "preStay": {
            null : "-",
            "respondido" : "Respondido",
        }
    }
  
    const qualification = (index,feed) => {
  
        if(feed.answeredTime && feed.feeling == null){
            return queryQualificationText[index]["respondido"]
        }
  
        return queryQualificationText[index][feed.feeling]
    }
  
    const goFeedback = (bool) =>{
      if(bool){
        router.push({ name: 'StayQueryDetail', params: { stayId : route.params.stayId }, query: { g: route.query.g }});
      }
    }
  </script>
  