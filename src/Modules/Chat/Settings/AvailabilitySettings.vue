<template>
    <section class="px-6">
        <TitleChatActivate 
        :defaultToggle="form.show_guest" 
            @onchange="(value) => form.show_guest = value"
        />
        <HeadChat />
        <SectionConfig>
            <template #title>
                <h1 class="text-base font-medium mb-2">Horarion de atencion del chat</h1>
            </template>
            <template #content>
               
                
            </template>
        </SectionConfig>
    </section>
   
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import TitleChatActivate from './components/TitleChatActivate.vue'
import HeadChat from './components/HeadChat.vue'
import SectionConfig from './components/SectionConfig.vue'
import ChangesBar from '@/components/Forms/ChangesBar.vue'
import BaseTextField from '@/components/Forms/BaseTextField'
import { getSettings,storeGeneralSetting, searchLang as fetchLangs } from '@/api/services/chat/chatSettings.services';
import useClickOutside from '@/composables/useClickOutside';
import ModalNoSave from '@/components/ModalNoSave.vue'
import { useMockupStore } from '@/stores/modules/mockup'
import { useToastAlert } from '@/composables/useToastAlert'

const form = reactive({
    show_guest: null
})

const mockupStore = useMockupStore()

onMounted(() => {
    mockupStore.$setIframeUrl('/mobile-chat/fake','showAvailability=true')
})


</script>

