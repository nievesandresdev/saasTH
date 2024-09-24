<template>
    <transition name="slide" @after-leave="$emit('close')">
        <aside v-if="isVisible" class="w-[400px] bg-white fixed top-0 right-0 h-screen overflow-y-auto z-[2100]">
            <div class="flex h-full flex-col">
                <!-- header -->
                <div class="py-5 flex items-center justify-between px-6 border-b border-gray-400 shadow-hoster">
                    <h2 class="text-[22px] font-medium leading-[110%]">Novedades</h2>
                    <div class="mt-[-8px] mb-[-14px]">
                        <HoveredIcon
                            :src="`/assets/icons/1.TH.CLOSE.svg`"
                            :height_icon="'24px'"
                            :width_icon="'24px'"
                            :padding_container="'6px'"
                            style="--background-color: #f3f3f3;"
                            @click="isVisible = false"
                        />
                    </div>
                </div>
                <!-- body -->
                <div class="px-6 flex-grow overflow-y-auto bg-white">
                    <div v-if="loading" class="pt-6">
                        <MiniSpinner/>
                    </div>
                    <template v-else>
                        <template v-for="novelty in  data" :key="novelty.id">
                            <NoveltyCard v-if="novelty.type == 'news'" :data="novelty"/>
                            <NotificationCard v-else :data="novelty"/>
                        </template>
                        <div class="py-6" v-if="!data.length">
                            <h2 class="text-base font-semibold leading-[120%] htext-gray-500">Sin novedades</h2>
                            <h2 class="text-sm leading-[140%] mt-2 htext-gray-500">Muy pronto te las comunicaremos por aquí </h2>
                        </div>
                    </template>
                </div>
            </div>
        </aside>
    </transition>
    <transition name="fade">
        <div v-if="isVisible" class="fixed top-0 left-0 w-screen h-screen bg-[#00000088] z-[2000]" @click="isVisible = false"></div>
    </transition>
</template>

<script setup>
import { ref, inject, watch } from 'vue';
import HoveredIcon from '@/components/Buttons/HoveredIcon.vue'
import NotificationCard from './NotificationCard.vue'
import NoveltyCard from './NoveltyCard.vue'
import MiniSpinner from '@/components/MiniSpinner.vue'
import { useNotifyUserStore } from '@/stores/modules/users/notifiyUser';

const notifyUserStore = useNotifyUserStore();
const isVisible = inject('isNotifyPanelVisible');
const data = ref([]);
const loading = ref(false);

watch(() => isVisible.value, async (newVal) => {
    loading.value = true;
    data.value = [];
    if(newVal){
        data.value = await notifyUserStore.$getNotificationsByUser();
    }
    loading.value = false;
});  
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
    transition: right 0.3s;
}
.slide-enter-from, .slide-leave-to {
    right: -400px;
}
.slide-enter-to, .slide-leave-from {
    right: 0;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
.fade-enter-to, .fade-leave-from {
    opacity: 1;
}
</style>
