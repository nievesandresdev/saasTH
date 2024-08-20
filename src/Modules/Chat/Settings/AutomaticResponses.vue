<template>
  <div class="flex flex-col min-h-screen mb-8">
    <TitleChatActivate 
        :defaultToggle="form.show_guest" 
        @onchange="(value) => form.show_guest = value"
    />
    <AlertShowGuest :show_guest="form.show_guest"/>
    <section class="px-6 min-h-screen">
      <HeadChat/>
      <div class="flex justify-start mt-5 gap-2">
          <span class="text-[18px] font-semibold">Respuestas automáticas en el chat</span>
          <Tooltip size="m" :top="25" :left="5">
            <template v-slot:button>
                <img class="w-[20px] h-[20px]" src="/assets/icons/info.blue.svg">
            </template>
            <template v-slot:content>
                <p class="text-sm">Aquí podrás configurar las respuestas automáticas que recibirán tus huéspedes cuando los operadores no estén disponibles para atender el Chat.
                </p>
            </template>
        </Tooltip>
      </div>
      <SectionConfig class="mb-5">
        <template #title>
            <h1 class="text-base font-medium mb-2">Chat Disponible</h1>
            <p class="text-sm mt-2 mb-5">
              Tus huéspedes recibirán las siguientes respuestas automáticas en estos casos
            </p>
          </template>
          <template #content>
          <!-- contenido-->
          <section class="mb-4">
            <div class="flex justify-between items-center">
              <label class="text-sm font-medium mb-2 block">Después de 1 minuto sin recibir una respuesta</label>
              <div class="flex">
                <label class="text-sm font-semibold mb-2 mr-2 block">Activado</label>
                <BaseSwichInput
                  v-model="form.first_available_show"
                  class-content="w-full"
                  class-input="text-sm"
                  id="first_available_show"
                />
              </div>
            </div>
          
            <BaseTextareaField
                v-model="form.first_available_msg['es']"
                placeholder="Descripción..."
                class-content="flex-1"
                class-input="text-sm h-[66px] min-h-[64px] p-3"
                name="description"
            />
          </section>
          <section class="mb-4">
            <div class="flex justify-between items-center">
              <label class="text-sm font-medium mb-2 block">Después de 5 minutos sin recibir una respuesta</label>
              <div class="flex">
                <label class="text-sm font-semibold mb-2 mr-2 block">Activado</label>
                <BaseSwichInput
                  v-model="form.second_available_show"
                  class-content="w-full"
                  class-input="text-sm"
                  id="second_available_show"
              />
              </div>
            </div>
            <BaseTextareaField
                v-model="form.second_available_msg['es']"
                placeholder="Descripción..."
                class-content="flex-1"
                class-input="text-sm h-[66px] min-h-[64px] p-3"
                id="description"
            />
          </section>
          <section class="mb-4">
              <div class="flex justify-between items-center">
                <label class="text-sm font-medium mb-2 block">Después de 10 minutos sin recibir una respuesta</label>
                <div class="flex">
                  <label class="text-sm font-semibold mb-2 mr-2 block">Activado</label>
                  <BaseSwichInput
                    v-model="form.three_available_show"
                    class-content="w-full"
                    class-input="text-sm"
                    id="three_available_show"
                />
                </div>
              </div>
              <BaseTextareaField
                  v-model="form.three_available_msg['es']"
                  placeholder="Descripción..."
                  class-content="flex-1"
                  class-input="text-sm h-[66px] p-3"
                  id="description"
              />
          </section>
          <div class="flex flex-col w-full mt-6">
            <span class="font-semibold text-base mb-2">Comportamiento automático</span>
            <span class="font-semibold text-sm">Si transcurren 30 minutos sin que un operador atienda un chat no leído:</span>
            <span class="font-normal text-sm">El chat se mostrará a los huéspedes como ‘No disponible’. Volverá a mostrarse como ‘Disponible’ en el instante en que se atienda o responda un mensaje.</span>
          </div>
        </template>
      </SectionConfig>
      <SectionConfig>
        <template #title>
            <h1 class="text-base font-medium mb-2">Chat No Disponible</h1>
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
                v-model="form.not_available_show"
                class-content="w-full"
                class-input="text-sm"
                id="not_available_show"
              />
            </div>
          </div>
          <BaseTextareaField
              v-model="form.not_available_msg['es']"
              placeholder="Descripción..."
              class-content="flex-1"
              class-input="text-sm h-[66px] min-h-[64px] p-3"
              name="description"
          />
          <div class="flex flex-col w-full mt-6">
            <span class="font-semibold text-base mb-2">Comportamiento automático</span>
            <span class="font-semibold text-sm">Cuando los huéspedes envíen un mensaje al chat fuera del horario de disponibilidad:</span>
            <span class="font-normal text-sm">Se indicará a los huéspedes que el chat está ‘No disponible’ y recibirán la respuesta automática correspondiente.</span>
          </div>
        </template>
      </SectionConfig>
    </section>
  </div>
  <ChangesBar 
    :existingChanges="changes"
    :validChanges="changes && valid"
    @cancel="cancelChange" 
    @submit="submit"
  />
  <ModalNoSave
    :id="'not-saved'"
    :open="changes && valid"
    text="Tienes cambios sin guardar. Para aplicar los cambios realizados debes guardar."
    textbtn="Guardar"
    @saveChanges="submit"
    type="save_changes"
  />
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import TitleChatActivate from './components/TitleChatActivate.vue'
import HeadChat from './components/HeadChat.vue'
import SectionConfig from '@/components/SectionConfig.vue'
import { useChatSettingsStore } from '@/stores/modules/chat/chatSettings';
import ModalNoSave from '@/components/ModalNoSave.vue'
import { useMockupStore } from '@/stores/modules/mockup'
import { useToastAlert } from '@/composables/useToastAlert'
import ChangesBar from '@/components/Forms/ChangesBar.vue'
import BaseTextareaField from "@/components/Forms/BaseTextareaField.vue";
import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";
import Tooltip from '@/components/Tooltip.vue';
import AlertShowGuest from './components/AlertShowGuest.vue'

const form = reactive({
  show_guest: null,
  first_available_msg: { es: '', en: '', fr: '' },
  first_available_show: null,
  not_available_msg: { es: '', en: '', fr: '' },
  not_available_show: null,
  second_available_msg: { es: '', en: '', fr: '' },
  second_available_show: null,
  three_available_msg: { es: '', en: '', fr: '' },
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
  mockupStore.$setLanguageTooltip(true)
})

const getSettingsChatHours = async () => {
  const response = await chatSettingsStore.$getAllSettingsChat();
  form.show_guest = response.settings.show_guest == 1 ? true : false

  form.first_available_msg = response.settings.first_available_msg
  form.first_available_show = response.settings.first_available_show == 1 ? true : false

  form.not_available_msg = response.settings.not_available_msg
  form.not_available_show = response.settings.not_available_show == 1 ? true : false

  form.second_available_msg = response.settings.second_available_msg
  form.second_available_show = response.settings.second_available_show == 1 ? true : false

  form.three_available_msg = response.settings.three_available_msg
  form.three_available_show = response.settings.three_available_show == 1 ? true : false

  initialForm.value = JSON.stringify(form) // Guardar el estado inicial del formulario

  mockupStore.$setIframeUrl('/mobile-chat/fake','responses=true') 
  mockupStore.$setInfo1('Edita y guarda para aplicar tus cambios', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
}

const handleInputChange = () => {
  // Actualizar la validez del formulario
  valid.value = form.first_available_msg.es.trim() !== '' && form.second_available_msg.es.trim() !== '' && form.three_available_msg.es.trim() !== '' && form.not_available_msg.es.trim() !== ''
}

const cancelChange = () => {
  const oldValues = JSON.parse(initialForm.value)
  form.show_guest = oldValues.show_guest
  form.first_available_msg = oldValues.first_available_msg
  form.first_available_show = oldValues.first_available_show
  form.not_available_msg = oldValues.not_available_msg
  form.not_available_show = oldValues.not_available_show
  form.second_available_msg = oldValues.second_available_msg
  form.second_available_show = oldValues.second_available_show
  form.three_available_msg = oldValues.three_available_msg
  form.three_available_show = oldValues.three_available_show
}

const submit = async () => {
  // Aquí puedes implementar la lógica para guardar los cambios
  const payload = {
    ...form,
    first_available_msg: { ...form.first_available_msg, es: form.first_available_msg.es },
    second_available_msg: { ...form.second_available_msg, es: form.second_available_msg.es },
    three_available_msg: { ...form.three_available_msg, es: form.three_available_msg.es },
    not_available_msg: { ...form.not_available_msg, es: form.not_available_msg.es }
  }
  console.log('Payload para enviar:', payload)

  const response = await chatSettingsStore.$updateResponses(payload)

  if(response){
    toast.warningToast('Se han guardado los cambios', 'top-right')
  } else {
    toast.errorToast('Ha ocurrido un error al guardar los cambios', 'top-right')
  }
  
  initialForm.value = JSON.stringify(form) 
  mockupStore.$reloadIframe();
}

// Computed para los cambios
const changes = computed(() => {
  return JSON.stringify(form) !== initialForm.value
})

// Computed para la validez
const valid = computed(() => {
  return form.first_available_msg.es.trim() !== '' && form.second_available_msg.es.trim() !== '' && form.three_available_msg.es.trim() !== '' && form.not_available_msg.es.trim() !== ''
})

watch(form, handleInputChange, { deep: true })
</script>
