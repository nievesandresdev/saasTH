<template>
    <section class="px-6">
        <TitleChatActivate status="Post-Stay" />
        <HeadChat />
        <!-- <p class="text-sm mt-2">
            El feedback en post-stay no puede desactivarse debido a que es crucial para conocer la experiencia de los huéspedes. Teniendo como objetivo la obtención de la reseña positiva o para la prevención de una posible valoración negativa.
        </p> -->
        <SectionConfig>
            <template #title>
                <h1 class="text-base font-medium mb-2">Ajustes del chat</h1>
            </template>
            <template #content>
                <!-- <div class="bg-white shadow-md py-6 px-4 rounded-lg mt-6"> -->
                    <!-- <h3 class="text-base font-medium">Ajustes del chat</h3> -->
                    <div class="mt-6 w-full">
                        <label class="text-sm font-medium mb-2 block">Nombre en la ventana de conversación</label>
                        <input
                            type="text"
                            id="headertext"
                            v-model="form.name"
                            :placeholder="errorsKey.includes('name') ? 'Debes añadir un texto' : 'Ej: “Hotel Posada del Sol”'"
                            :class="{
                                'border-gray-400 text-gray-500': !form.name,
                                'border-black': form.name,
                                'border-red-500': errorsKey.includes('name')
                            }"
                            class="border p-2 rounded w-full"
                            style="font-size: 14px; font-weight: 500; color: #A0A0A0;"
                        />
                        <label class="text-sm font-medium mb-2 block mt-4">Idiomas disponibles para la atención a tus huéspedes</label>
                        <div class="relative" ref="dropdownRef">
                            <input
                                type="text"
                                class="pl-10 text-sm border border-gray-400 h-11 rounded w-full"
                                placeholder="Selecciona los idiomas con los que se comunicará tu personal"
                                v-model="search"
                                :class="{'border-dark': search}"
                                @keyup.prevent="$searchLang"
                                @keypress.enter="submit_filters"
                                @input="updateSearchTerms"
                                @focus="showResults = true"
                                style="font-size: 14px; font-weight: 500; color: #A0A0A0;"
                            />
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <ul
                                v-if="result.length && showResults"
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
                    
                <!-- </div> -->
            </template>
        </SectionConfig>
    </section>
    <ChangesBar 
        :existingChanges="changes > 0" 
        :validChanges="valid"
        @cancel="cancelarCambios" 
        @submit="submit"
    />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import TitleChatActivate from './components/TitleChatActivate.vue'
import HeadChat from './components/HeadChat.vue'
import SectionConfig from './components/SectionConfig.vue'
import ChangesBar from '@/components/Forms/ChangesBar.vue'
import { getSettings, searchLang as fetchLangs } from '@/api/services/chat/chatSettings.services';
import useClickOutside from '@/composables/useClickOutside';

const form = ref({
    name: '',
    languages: [
        { id: 1, name: 'Español', abbreviation: 'es' },
        { id: 2, name: 'Inglés', abbreviation: 'en' }
    ]
})

const notSearchLang = ref([])

onMounted(() => {
    getSettingsData()
})

const getSettingsData = async () => {
    const response = await getSettings()
    form.value.languages = JSON.parse(JSON.stringify(response.data.languages))
    response.data.languages.forEach(lang => {
        notSearchLang.value.push(lang.id)
    })
}

const search = ref('')
const errorsKey = ref([])
const result = ref([])
const showResults = ref(false)
const changes = ref(0)
const valid = ref(false)

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
}

const add_lang = (lang) => {
    form.value.languages.push(lang)
    notSearchLang.value.push(lang.id)
    search.value = ''
    showResults.value = false
    changes.value++
    valid.value = true // Actualiza esta lógica según las validaciones necesarias
}

const delete_lang = (langId) => {
    form.value.languages = form.value.languages.filter(lang => lang.id !== langId)
    notSearchLang.value = notSearchLang.value.filter(id => id !== langId)
    changes.value++
    valid.value = true // Actualiza esta lógica según las validaciones necesarias
}

const updateSearchTerms = () => {}

const submit_filters = () => {}

// Funciones para manejar los eventos de ChangesBar
const cancelarCambios = () => {
    console.log('Cancelando cambios')
    // Lógica para cancelar cambios
}

const submit = () => {
    console.log('Enviando cambios')
    // Lógica para enviar cambios
}
</script>

<style scoped>
/* Las clases CSS personalizadas ya no son necesarias */
</style>
