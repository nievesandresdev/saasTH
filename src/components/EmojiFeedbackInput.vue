<template>
    <div class="flex justify-center items-center gap-6">
      <div class="text-center">
        <button 
          class="flex mx-auto w-10 h-10 items-center"
          @click="selectEmoji('WRONG')"
        >
          <img
            :class="form.type && form.type !== 'WRONG' ? 'w-8 h-8' : 'w-full h-full'"
            :src="`/assets/icons/emojis/colors/1.TH.EMOJI.${state_emojis?.WRONG?.face}.${state_emojis?.WRONG?.mode}.svg`"
            alt="1.TH.EMOJI.WRONG"
          />
        </button>
      </div>
      <div class="text-center">
        <button 
          class="flex mx-auto w-10 h-10 items-center"
          @click="selectEmoji('NORMAL')"
        >
          <img
            :class="form.type && form.type !== 'NORMAL' ? 'w-8 h-8' : 'w-full h-full'"
            :src="`/assets/icons/emojis/colors/1.TH.EMOJI.${state_emojis?.NORMAL?.face}.${state_emojis?.NORMAL?.mode}.svg`"
            alt="1.TH.EMOJI.NORMAL"
          />
        </button>
      </div>
      <div class="text-center">
        <button 
          class="flex mx-auto w-10 h-10 items-center"
          @click="selectEmoji('GOOD')"
        >
          <img
            :class="form.type && form.type !== 'GOOD' ? 'w-8 h-8' : 'w-full h-full'"
            :src="`/assets/icons/emojis/colors/1.TH.EMOJI.${state_emojis?.GOOD?.face}.${state_emojis?.GOOD?.mode}.svg`"
            alt="1.TH.EMOJI.GOOD"
          />
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, inject, ref, watch } from "vue";
  
  const windowWidth = ref(window.innerWidth);
  const emit = defineEmits(['updateFeedback'])
  
  
  // DATA STATIC
  // const STATUS_EMOJIS = {
  //   ACTIVE: "DISABLED",
  //   DISABLED: "ACTIVE",
  //   HOVER: "DEFAULT",
  //   DEFAULT: "HOVER"
  // };
  
  // DATA
  
  const state_emojis = reactive({
    GOOD: {
      face: "GOOD",
      mode: "ACTIVE",
      // state: "DEFAULT"
    },
    NORMAL: {
      face: "NORMAL",
      mode: "ACTIVE",
    },
    WRONG: {
      face: "WRONG",
      mode: "ACTIVE",
    }
  });
  
  //INJECT
  const form = inject('form')
  
  //FUNCTION
  function selectEmoji(face, noAutomatic = true) {
    if(!face) return;
    const EMOJIS = Object.keys(state_emojis);
    state_emojis[face].mode = "ACTIVE";
    form.type = face;
    EMOJIS.forEach(item => {
      if (face != item) {
        state_emojis[item].mode = "INACTIVE";
      }
    });
    if(noAutomatic){
      emit('updateFeedback')
    }
  }
  
  watch(form, (newType) => {
    // console.log('newType',newType.type)      
    selectEmoji(newType.type, false)
  }, { deep: true, immediate: true });
  </script>