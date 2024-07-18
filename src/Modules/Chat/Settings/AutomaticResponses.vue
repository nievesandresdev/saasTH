<template>
    <div class="flex flex-col min-h-screen">
        <section class="px-6 min-h-screen">
        <TitleChatActivate 
            :defaultToggle="form.show_guest" 
            @onchange="(value) => form.show_guest = value"
        />
        <HeadChat />
        <SectionConfig>
            <template #title>
              <h1 class="text-base font-medium mb-2">Chat Disponible</h1>
              <p class="text-sm mt-2 mb-5">
                Tus huéspedes recibirán las siguientes respuestas automáticas en estos casos
              </p>
            </template>
            <template #content>
            <!-- contenido-->
            <div class="flex justify-between items-center">
              <label class="text-sm font-medium mb-2 block">Después de 1 minuto sin recibir una respuesta</label>
              <div class="flex">
                <label class="text-sm font-semibold mb-2 mr-2 block">Activado</label>
                <BaseSwichInput
                  v-model="form.first_available_show"
                  class-content="w-full"
                  class-input="text-sm"
                  name="show_guest"
              />
              </div>
              
            </div>
            <BaseTextareaField
                  v-model="form.first_available_msg"
                  placeholder="Descripción..."
                  class-content="flex-1"
                  class-input="text-sm h-[50px] min-h-[64px]"
                  name="description"
              />
            </template>
        </SectionConfig>
        </section>
       
    </div>
    
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, computed, watch } from 'vue'
  import TitleChatActivate from './components/TitleChatActivate.vue'
  import HeadChat from './components/HeadChat.vue'
  import SectionConfig from './components/SectionConfig.vue'
  import { useChatSettingsStore } from '@/stores/modules/chat/chatSettings';
  import ModalNoSave from '@/components/ModalNoSave.vue'
  import { useMockupStore } from '@/stores/modules/mockup'
  import { useToastAlert } from '@/composables/useToastAlert'
  import ChangesBar from '@/components/Forms/ChangesBar.vue'
  import BaseTextareaField from "@/components/Forms/BaseTextareaField.vue";
  import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";
  
  const form = reactive({
    show_guest: null,
    first_available_msg : '',
    first_available_show: null,
    not_available_msg: '',
    not_available_show : null,
    second_available_msg: '',
    second_available_show: null,
    three_available_msg: '',
    three_available_show: null
  })
  
  const chatSettingsStore = useChatSettingsStore()
  const mockupStore = useMockupStore()
  const toast = useToastAlert()
  
  const initialForm = ref(null) // Para mantener el estado inicial del formulario
  
  onMounted(() => {
    getSettingsChatHours()
    mockupStore.$setIframeUrl('/mobile-chat/fake','responses=true')
    mockupStore.$setInfo1('Edita y guarda para aplicar tus cambios', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
  })
  
  const getSettingsChatHours = async () => {
    const response = await chatSettingsStore.$getAllSettingsChat();
    form.show_guest = response.settings.show_guest == 1 ? true : false

    form.first_available_msg = response.settings.first_available_msg['es']
    form.first_available_show = response.settings.first_available_show == 1 ? true : false

    form.not_available_msg = response.settings.not_available_msg['es']
    form.not_available_show = response.settings.not_available_show == 1 ? true : false

    form.second_available_msg = response.settings.second_available_msg['es']
    form.second_available_show = response.settings.second_available_show == 1 ? true : false

    form.three_available_msg = response.settings.three_available_msg['es']
    form.three_available_show = response.settings.three_available_show == 1 ? true : false

    console.log(form)

    initialForm.value = JSON.stringify(form) // Guardar el estado inicial del formulario

    mockupStore.$setIframeUrl('/mobile-chat/fake','responses=true') 
    mockupStore.$setInfo1('Edita y guarda para aplicar tus cambios', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
  }
  

  
  
  const submit = async () => {
    console.log('Cambios guardados')
  }
  
  // Computed para los cambios
  const changes = computed(() => {
    return JSON.stringify(form) !== initialForm.value
  })
  
  // Computed para la validez
  const valid = computed(() => {
    return form.hours.every(schedule => schedule.horary.every(time => time.start && time.end))
  })
  
  </script>
  