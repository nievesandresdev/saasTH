<template>
    <div class="flex flex-col min-h-screen">
          <TitleChatActivate 
              :defaultToggle="form.show_guest" 
              @onchange="(value) => form.show_guest = value"
          />
        <AlertShowGuest :show_guest="form.show_guest"/>
        <section class="px-6 min-h-screen">
          <HeadChat/>
          <SectionConfig>
              <template #title>
                <h1 class="text-base font-medium mb-2">Horario de atención del chat</h1>
              </template>
              <template #content>
              <div v-for="(schedule, index) in form.hours" :key="index">
                  <!-- days -->
                  <div class="flex 1xl:w-[42.5rem] 3xl:w-full">
                      <!-- day -->
                      <div class="w-[6.25rem] mr-4 flex-shrink-0 pt-[25px]">
                          <input type="checkbox" class="rounded hcheckbox w-[20px] h-[20px]" v-model="schedule.active">
                          <p 
                          class="inline ml-2 text-sm font-medium"
                          :class="{'opacity-75': !schedule.active}"
                          >{{schedule.day}}</p>
                      </div>
                      <!-- section horarios -->
                      <div class="flex flex-wrap ">
                          <!-- range -->
                          <div v-for="(time, index_time) in schedule.horary" :key="time" class="mr-4 flex mt-4">
                              <div class="relative">
                                  <BaseTimeField
                                    v-model="schedule.horary[index_time].start"
                                    :id="`time-${index}-${index_time}-start`"
                                    :custom-classes="{'h-10 w-24 text-center ': true, 'opacity-50': !schedule.active}"
                                    :disabled="!schedule.active"
                                  />
                                  <p v-if="error_horary == schedule.day + index_time" class="mt-1 text-xs font-medium text-red-500 whitespace-nowrap">
                                  Los horarios no se pueden solapar
                                  </p>
                              </div>
                              <p class="text-sm px-1 font-medium mt-2.5">a</p>
                              <div>
                                  <BaseTimeField
                                    v-model="schedule.horary[index_time].end"
                                    :id="`time-${index}-${index_time}-end`"
                                    :custom-classes="{'h-10 w-24 text-center': true, 'opacity-50': !schedule.active}"
                                    :disabled="!schedule.active"
                                  />
                              </div>
                              <img 
                                  v-if="schedule.horary.length > 1 && index_time + 1 == schedule.horary.length" 
                                  class="w-6 h-6 cursor-pointer ml-2 mt-2" 
                                  src="/assets/icons/1.TH.DELETE.SHAPE.svg" 
                                  alt=""
                                  :class="{'opacity-50': !schedule.active}"
                                  @click="schedule.horary.pop()"
                              >
                              <img 
                                  v-if="index_time + 1 == schedule.horary.length" 
                                  class="w-6 h-6 cursor-pointer ml-2 mt-2.5" 
                                  :class="{'opacity-50': !schedule.active}"
                                  src="/assets/icons/1.TH.PLUS.CIRCLE.svg" 
                                  alt=""
                                  @click="schedule.horary.push({start: '', end: ''})"
                              >
                          </div>  
                      </div>
                  </div>
              </div>
              </template>
          </SectionConfig>
        </section>
        <ChangesBar 
            :existingChanges="changes"
            :validChanges="changes && valid"
            @cancel="cancelChange" 
            @submit="submit"
        />
    </div>
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
  import SectionConfig from './components/SectionConfig.vue'
  import BaseTimeField from '@/components/Forms/BaseTimeField.vue'
  import { useChatSettingsStore } from '@/stores/modules/chat/chatSettings';
  import ModalNoSave from '@/components/ModalNoSave.vue'
  import { useMockupStore } from '@/stores/modules/mockup'
  import { useToastAlert } from '@/composables/useToastAlert'
  import ChangesBar from '@/components/Forms/ChangesBar.vue'
  import AlertShowGuest from './components/AlertShowGuest.vue'
  
  const form = reactive({
    hours: [],
    show_guest: null
  })
  
  const chatSettingsStore = useChatSettingsStore()
  const mockupStore = useMockupStore()
  const toast = useToastAlert()
  
  const initialForm = ref(null) // Para mantener el estado inicial del formulario
  
  onMounted(() => {
    getSettingsChatHours()
    mockupStore.$setIframeUrl('/mobile-chat/fake','showAvailability=true') 
    mockupStore.$setInfo1('Edita y guarda para aplicar tus cambios', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
    mockupStore.$setLanguageTooltip(true)
  })
  
  const getSettingsChatHours = async () => {
    const response = await chatSettingsStore.$getAllSettingsChat();
    form.show_guest = response.settings.show_guest == 1 ? true : false
    form.hours = JSON.parse(JSON.stringify(response.chatHours))
    initialForm.value = JSON.stringify(form) // Guardar el estado inicial del formulario

    mockupStore.$setIframeUrl('/mobile-chat/fake','showAvailability=true') 
    mockupStore.$setInfo1('Edita y guarda para aplicar tus cambios', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
  }
  
  const error_horary = ref(null)
  
  const handleInputChange = () => {
    // Actualizar la validez del formulario
    valid.value = form.hours.every(schedule => schedule.horary.every(time => time.start && time.end))
  }
  
  const cancelChange = () => {
    const oldValues = JSON.parse(initialForm.value)
    form.show_guest = oldValues.show_guest
    form.hours = oldValues.hours
  }
  
  const submit = async () => {
    /* const response = await storeGeneralSetting(form)
    if (response.ok) {
      toast.warningToast('Se han guardado los cambios', 'top-right')
    } else {
      toast.errorToast('Ha ocurrido un error al guardar los cambios', 'top-right')
    }
    getSettingsChatHours()
    mockupStore.$reloadIframe() */

    const response = await chatSettingsStore.$updateAvailability(form)

    if (response) {
      toast.warningToast('Se han guardado los cambios', 'top-right')
    } else {
      toast.errorToast('Ha ocurrido un error al guardar los cambios', 'top-right')
    }
    mockupStore.$reloadIframe();
    
    initialForm.value = JSON.stringify(form) // Actualizar el estado inicial después de guardar
  }
  
  // Computed para los cambios
  const changes = computed(() => {
    return JSON.stringify(form) !== initialForm.value
  })
  
  // Computed para la validez
  const valid = computed(() => {
    return form.hours.every(schedule => schedule.horary.every(time => time.start && time.end))
  })
  
  watch(form, handleInputChange, { deep: true })
  </script>
  