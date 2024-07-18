<template>
    <section class="px-6">
        <TitleChatActivate status="Post-Stay" />
        <HeadChat />
        <SectionConfig>
            <template #title>
                <h1 class="text-base font-medium mb-2">Ajustes del chat</h1>
            </template>
            <template #content>
                <div class="mt-6 w-full">
                    <label class="text-sm font-medium mb-2 block">Nombre en la ventana de conversación</label>
                    <BaseTextField
                        v-model="form.name"
                        placeholder="Ej: “Hotel Posada del Sol”"
                        class-content="w-full"
                        class-input="text-sm"
                        @input="handleInputChange"
                    ></BaseTextField>
                    <label class="text-sm font-medium mb-2 block mt-4">Idiomas disponibles para la atención a tus huéspedes</label>
                    <div class="relative" ref="dropdownRef">
                        <BaseTextField
                            v-model="search"
                            prepend-inner-icon="/assets/icons/1.TH.SEARCH.svg"
                            placeholder="Selecciona los idiomas con los que se comunicará tu personal"
                            class-content="w-full"
                            class-input="text-sm"
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
        @cancel="cancelarCambios" 
        @submit="submit"
    />

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
import SectionConfig from './components/SectionConfig.vue'
import ChangesBar from '@/components/Forms/ChangesBar.vue'
import BaseTextField from '@/components/Forms/BaseTextField'
import { getSettings, searchLang as fetchLangs } from '@/api/services/chat/chatSettings.services';
import useClickOutside from '@/composables/useClickOutside';
import ModalNoSave from '@/components/ModalNoSave.vue'

const form = reactive({
    name: '',
    languages: [
        { id: 1, name: 'Español', abbreviation: 'es' },
        { id: 2, name: 'Inglés', abbreviation: 'en' }
    ]
})

const initialForm = ref(null) // Para mantener el estado inicial del formulario
const notSearchLang = ref([])

onMounted(() => {
    getSettingsData()
})

const getSettingsData = async () => {
    const response = await getSettings()
    form.languages = JSON.parse(JSON.stringify(response.data.languages))
    response.data.languages.forEach(lang => {
        notSearchLang.value.push(lang.id)
    })

    form.name = response.data.name
    initialForm.value = JSON.stringify(form) // Guardar estado inicial después de cargar los datos
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

const cancelarCambios = () => {
    const oldValues = JSON.parse(initialForm.value)
    form.name = oldValues.name
    form.languages = oldValues.languages
}

const submit = async () => {
    console.log('Enviando cambios')
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

<style scoped>
/* Las clases CSS personalizadas ya no son necesarias */
</style>
