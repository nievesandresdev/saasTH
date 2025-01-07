<template>
    <Transition>
    <div 
        v-if="isOpenSidePanel" 
        class="fixed z-[2000] bg-[#00000080] top-0 left-0 h-screen w-screen"
        @click="isOpenSidePanel = false"
    ></div>
    </Transition>
    
    <Transition name="slide">
      <!-- right-[354px] -->
        <div v-if="showSlidePanel" class="w-[500px] h-full bg-white fixed top-0 z-[5001] right-0">
            <Slide />
        </div>
    </Transition>
    <!-- <Transition>
        <div v-if="showPanel" class="w-[354px] h-full bg-white fixed top-0 right-0 z-[1002]">
            <Panel />
        </div>
    </Transition> -->
</template>
<script setup>
import { ref, inject, watch } from 'vue';
import Slide from './SidePanelSlide.vue'
import Panel from './SidePanelPanel.vue'

const showPanel = ref(false)
const showSlidePanel = ref(false)

const isOpenSidePanel = inject('isOpenSidePanel');

watch(() => isOpenSidePanel.value, (newVal, oldVal) => {
    if(newVal){
        setTimeout(() => {showPanel.value = isOpenSidePanel.value}, 200);
        setTimeout(() => {showSlidePanel.value = isOpenSidePanel.value}, 400);
    }else{
        setTimeout(() => {showSlidePanel.value = isOpenSidePanel.value}, 200);
        setTimeout(() => {showPanel.value = isOpenSidePanel.value}, 400);
    }
});     

</script>
<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}


.v-enter-to, .v-leave-from {
  opacity: 1;
}


.slide-leave-active,
.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>