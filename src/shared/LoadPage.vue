<template>
    <!-- load page -->
    <div class="hbg-white-100 flex flex-col fixed h-screen w-screen left-0 top-0 z-[1000]">
        <div class="spinner-container mx-auto mt-32 mb-auto">
            <svg class="spinner" viewBox="0 0 50 50">
                <defs>
                    <linearGradient id="spinnerGradient" x1="100%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%" stop-color="#34A98F" stop-opacity="0.1" /> <!-- Verde suave para la punta que desaparece -->
                        <stop offset="60%" stop-color="#34A98F" stop-opacity="0.3" />
                        <stop offset="100%" stop-color="#34A98F" stop-opacity="1" />
                    </linearGradient>
                </defs>
                <circle ref="circle" cx="25" cy="25" r="20" fill="none" stroke="url(#spinnerGradient)" stroke-width="2.5" stroke-dasharray="125.6" stroke-dashoffset="125.6"></circle>
            </svg>
            <img class="icon w-[86px] h-[86px]" src="/assets/icons/hotel-bell-svgrepo-com.svg" alt="">
        </div>
        <p class="font-medium text-[24px] text-center mt-10">{{ message }}</p>
        <img class="w-60 absolute bottom-14 left-0 right-0 z-10 mx-auto" src="/assets/img/hoster/th_logo.png" alt="">
    </div>
</template>
<script setup>
    import { ref, onMounted, nextTick } from 'vue'

    defineProps({
      message: {
        type: String,
        default: '',
      }
    })

    const circle = ref(null)
    let offset = 251.2; // 2 * π * 40 (radio del círculo)

    onMounted(async () => {
  const img = new Image();
    img.src = '/assets/icons/hotel-bell-svgrepo-com.svg';
    img.onload = () => {
      // La imagen ha sido cargada
    };
    // await nextTick();
    // animateSpinner();
  });

</script>

<style scoped>
/* CSS */
.spinner {
  width: 241px;
  height: 241px;
  animation: spin 1.5s linear infinite;
  position: relative;
  z-index: 1;
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}

circle {
  stroke-dasharray: 125.6;
  stroke-dashoffset: 125.6;
  animation: dash 1.5s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}



.spinner-container {
  position: relative;
  width: 281px; /* 81px icon + 2x 100px padding */
  height: 281px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon {
  position: absolute;
  top: 90px; /* Padding + spacing */
  left: 100px; /* Padding + spacing */
  z-index: 2;
}
@media(max-width:300px){
  .spinner-container {
    width: 200px; 
    height: 200px;
    margin-top:20px !important;
  }
  .spinner[data-v-71399cd6] {
      width: 200px;
      height: 176px;
  } 
  .icon{
    top: 66px; 
    left: 72px; 
  }
}

</style>