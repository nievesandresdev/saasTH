<template>
    <div class="relative">
      <swiper
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        :slides-per-view="'auto'"
        :spaceBetween="24"
      >
        <swiper-slide v-for="slide in numberPages" :key="slide" :style="`width: 800px; height: ${heightSlide};`">
          <p class="text-sm leading-[140%] mb-4" :style="`height: ${heightDescriptionSlide};`" v-html="texts[slide]"></p>
          <img
            class="w-[800px] max-w-[800px] h-[377px] max-h-[377px] shadow-hoster rounded-[10px]"
            :src="`/assets/img/communications/${directoryImages}/slider-${concept}-${slide}.png`"
            alt=""
          />
        </swiper-slide>
      </swiper>
      <div
        v-if="!isBeginning"
        @click="prevSlide"
        class="absolute left-[-14px] top-0 bottom-0 z-[50] shadow-hoster rounded-full bg-white py-3 pr-[14px] pl-2.5 cursor-pointer h-10 my-auto"
      >
      <img class="w-4 h-4" src="/assets/icons/1.TH.BACK.BOLD.svg" alt="">
      </div>
      <div
        v-if="!isEnd"
        @click="nextSlide"
        class="absolute right-[-14px] top-0 bottom-0 z-[50] shadow-hoster rounded-full bg-white py-3 pl-[14px] pr-2.5 cursor-pointer h-10 my-auto"
      >
        <img class="w-4 h-4" src="/assets/icons/1.TH.BACK.REVERSE.svg" alt="">
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/swiper-bundle.css';
  
  defineProps({
    texts:{
        type:Array,
        default: ['','1. texto','2. texto','3. texto','4. texto']
    },
    concept:{
        type:String,
        default: 'booking'
    },
    numberPages:{
        type:Number,
        default: 4
    },
    directoryImages:{
        type:String,
        default: 'otas'
    },
    heightSlide:{
      type:Number,
      default: '416px'
    },
    heightDescriptionSlide:{
      type:Number,
      default: '20px'
    },
  })
  
  const mySwiper = ref(null);
  const isBeginning = ref(true);
  const isEnd = ref(false);
  
  const onSwiper = (swiperInstance) => {
    mySwiper.value = swiperInstance;
    updateNavigationButtons(swiperInstance);
  };
  
  const onSlideChange = () => {
    updateNavigationButtons(mySwiper.value);
  };
  
  const updateNavigationButtons = (swiper) => {
    isBeginning.value = swiper.isBeginning;
    isEnd.value = swiper.isEnd;
  };
  
  const nextSlide = () => {
    if (mySwiper.value) mySwiper.value.slideNext();
  };
  
  const prevSlide = () => {
    if (mySwiper.value) mySwiper.value.slidePrev();
  };
  </script>
  
  <style scoped>

  strong{
    font-weight: 600;
  }
  </style>
  