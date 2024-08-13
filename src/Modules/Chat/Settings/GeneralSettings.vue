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
                    <h1 class="text-base font-medium mb-2">Ajustes del chat</h1>
                </template>
                <template #content>
                    <div class="w-full">
                        <label class="text-sm font-medium mb-2 block">Nombre en la ventana de conversación</label>
                        <BaseTextField
                            v-model="form.name"
                            placeholder="Ej: “Hotel Posada del Sol”"
                            :class-content="'3xl:w-1/2 1xl:w-full'"
                            @input="handleInputChange"
                        ></BaseTextField>
                        <div class="flex justify-between 3xl:w-1/2 1xl:w-full">
                            <label class="text-sm font-medium mb-2 block mt-4">Idiomas disponibles para la atención a tus huéspedes</label>
                            <Tooltip
                                size="l"
                                :top="45"
                                :right="0"
                            >
                                <template v-slot:button>
                                    <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
                                </template>
                                <template v-slot:content>
                                    <p class="text-sm">
                                        Estos son los idiomas que ofrecerá tu personal para comunicarse con tus huéspedes. Ten en cuenta que no todos estos idiomas serán utilizados en las traducciones automáticas.
                                    </p>
                                </template>
                            </Tooltip>
                        </div>
                        
                        <div class="relative" ref="dropdownRef">
                            <BaseTextField
                                v-model="search"
                                prepend-inner-icon="/assets/icons/1.TH.SEARCH.svg"
                                placeholder="Selecciona los idiomas con los que se comunicará tu personal"
                                :class-content="'3xl:w-1/2 1xl:w-full'"
                                @keyup.prevent="$searchLang"
                                @enter:search="$searchLang"
                            ></BaseTextField>
                            <ul
                                v-if="result.length > 0 && showResults"
                                class="absolute top-10 left-0 w-full z-50 bg-white overflow-hidden shadow-md rounded-lg"
                            >
                                <li
                                    v-for="lg in result" :key="lg.id"
                                    @click="add_lang({id: lg.id, name: lg.name, abbreviation: lg.abbreviation})"
                                    class="px-3 py-2.5 flex items-center hover:bg-gray-100 cursor-pointer"
                                >
                                    <img class="w-5 h-5 mr-2" :src="'/assets/icons/flags/' + lg.abbreviation + '.svg'" alt="">
                                    <p class="text-sm">{{lg.name}}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- added languages -->
                    <div class="flex flex-wrap mt-4">
                        <div
                            v-for="lang in form.languages" :key="lang.id"
                            class="chip-primary rounded-lg px-3 py-2 flex items-center mt-2 mr-4"
                        >
                            <img class="w-5 h-5 mr-2" :src="'/assets/icons/flags/' + lang.abbreviation + '.svg'" alt="">
                            <p class="text-sm font-medium mr-2">{{lang.name}}</p>
                            <img @click="delete_lang(lang.id)" class="w-4 h-4 cursor-pointer" src="/assets/icons/1.TH.CLOSE.svg" alt="">
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
        :open="changes &&  valid"
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
import ChangesBar from '@/components/Forms/ChangesBar.vue'
import BaseTextField from '@/components/Forms/BaseTextField'
import { storeGeneralSetting, searchLang as fetchLangs } from '@/api/services/chat/chatSettings.services';
import useClickOutside from '@/composables/useClickOutside';
import ModalNoSave from '@/components/ModalNoSave.vue'
import { useMockupStore } from '@/stores/modules/mockup'
import { useToastAlert } from '@/composables/useToastAlert'
import { useChatSettingsStore } from '@/stores/modules/chat/chatSettings';
import AlertShowGuest from './components/AlertShowGuest.vue'
import Tooltip from '@/components/Tooltip.vue'
import { usePreloaderStore } from '@/stores/modules/preloader';
/* import LoadPage from '@/shared/LoadPage.vue'; // Asegúrate de que la ruta sea correcta */

const form = reactive({
    name: '',
    languages: [],
    languages_id: [],
    show_guest: null
})

/* const preloaderStore = usePreloaderStore();
const activeRequests = computed(() => preloaderStore.activeRequests); */

const mockupStore = useMockupStore()
const chatSettingsStore = useChatSettingsStore()
const toast = useToastAlert()

const initialForm = ref(null) // Para mantener el estado inicial del formulario
const notSearchLang = ref([])

onMounted(() => {
    ata()
    mockupStore.$setInfo1('Edita y guarda para aplicar tus cambios', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
    mockupStore.$setLanguageTooltip(true)
})

const ata = async () => {
    console.log('ata')
    const response = await chatSettingsStore.$getAllSettingsChat();

    form.languages = JSON.parse(JSON.stringify(response.settings.languages))
    response.settings.languages.forEach(lang => {
        notSearchLang.value.push(lang.id)
    })

    form.name = response.settings.name
    form.show_guest = response.settings.show_guest == 1 ? true : false
    initialForm.value = JSON.stringify(form) 
    mockupStore.$setIframeUrl('/mobile-chat/fake')

    

}

const search = ref('')
const result = ref([])
const showResults = ref(false)
const anyEmpty = ref([])

const { elementRef: dropdownRef } = useClickOutside(() => {
    showResults.value = false;
});

const $searchLang = async () => {
    const params = {
        search: search.value,
        notSearch: notSearchLang.value
    }
    const response = await fetchLangs(params)
    result.value = response.data

    if (search.value) {
        showResults.value = true
    } else {
        showResults.value = false
    }
}

const add_lang = (lang) => {
    form.languages.push(lang)
    notSearchLang.value.push(lang.id)
    search.value = ''
    showResults.value = false
}

const delete_lang = (langId) => {
    form.languages = form.languages.filter(lang => lang.id !== langId)
    notSearchLang.value = notSearchLang.value.filter(id => id !== langId)
}

const handleInputChange = () => {
    // Actualizar la validez del formulario
    valid.value = form.name.trim() !== '' && form.languages.length > 0
}

const cancelChange = () => {
    const oldValues = JSON.parse(initialForm.value)
    form.name = oldValues.name
    form.languages = oldValues.languages
}

const submit = async () => {
    form.languages_id = []
    form.languages.forEach(lang => {
        form.languages_id.push(lang.id)
    });

    const response = await storeGeneralSetting(form)

    if(response.ok){
        toast.warningToast('Se han guardado los cambios','top-right')
    } else {
        toast.errorToast('Ha ocurrido un error al guardar los cambios','top-right')
    }
    //getSettingsData()
    mockupStore.$reloadIframe();
    // Lógica para enviar cambios
    initialForm.value = JSON.stringify(form) // Actualizar el estado inicial después de guardar
}

// Computed para los cambios
const changes = computed(() => {
    return JSON.stringify(form) !== initialForm.value
})

// Computed para la validez
const valid = computed(() => {
    return form.name.trim() !== '' && form.languages.length > 0
})

watch(form, handleInputChange, { deep: true })
</script>


