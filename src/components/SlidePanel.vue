<template>
    <transition name="fade">
    <div 
        v-if="isOpen" 
        class="bg-[#16161680] w-screen fixed left-0 z-[10000]"   
        :class="userStore.showSuscriptionBanner ? 'top-with-banner h-with-banner' : 'top-0 h-without-banner'"
        @click="closePanel"
    ></div>
    </transition>
    <transition name="slide">
        <div
            v-if="isOpen"
            class="shadow-xl bg-white flex flex-col justify-between z-[10001] w-[500px] fixed"
            :class="[
              userStore.showSuscriptionBanner ? 'top-with-banner h-with-banner' : 'h-without-banner top-0'
            ]"
            :style="`right: ${right};`"
            
            ref="refPanelEdit"
        >
            <slot></slot>
        </div>
    </transition>
   
</template>


<script setup>
import { ref, toRefs } from 'vue';
//
import { useUserStore } from '@/stores/modules/users/users'
const userStore = useUserStore();

const emit = defineEmits(['load:resetPageData']);

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    right: {
        type: String,
        default: '353.5px'
    }
});

const { isOpen } = toRefs(props);

const closePanel = () => {
    emit('closePanel');
}
</script>

<style lang="scss" scoped>
/* Define las transiciones para entrar y salir */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease;
}

/* Estado inicial al entrar y estado final al salir */
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}

/* Estado final al entrar y estado inicial al salir */
.slide-enter-to, .slide-leave-from {
  transform: translateX(0);
}


/* Define las transiciones para entrar y salir */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

/* Estado inicial al entrar y estado final al salir */
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Estado final al entrar y estado inicial al salir */
.fade-enter-to, .fade-leave-from {
    opacity: 1;
}


</style>