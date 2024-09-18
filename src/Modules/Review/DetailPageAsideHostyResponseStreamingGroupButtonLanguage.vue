<template>
<transition>
    <div v-if="!disabledButtons" class="mt-4">
        <p class="text-sm font-medium mb-2">Idioma original:</p>
        <div
            v-if="languageOrigin"
            class="inline-block w-max chip-primary py-2 px-[12px] rounded-[6px] text-sm font-medium leading-[110%] flex items-center cursor-pointer mb-4 h-[24px]"
            :class="{'chip-primary-active': languageActiveResponse === 'originalLanguage' , 'opacity-30': loadingTranslation}"
            @click="selectLanguage('originalLanguage')"
        >
            <img
                class="w-4 h-4 mr-2"
                :src="`/assets/icons/flags/${languageOrigin}.svg`"
            >
            {{ languagesObject[languageOrigin] }}
        </div>
        <p class="text-sm font-medium mb-2">Traducir a:</p>
        <div class="flex space-x-4">
            <div
                v-for="(language, index) in languagesButtonsAvailable"
                class=" inline-block chip-primary py-2 px-[12px] rounded-[6px] text-sm font-medium leading-[110%] flex items-center cursor-pointer h-[24px]"
                :class="{'chip-primary-active': languageActiveResponse === language , 'opacity-30': loadingTranslation }"
                @click="selectLanguage(language)"
            >
                <img
                    class="w-4 h-4 mr-2"
                    :src="`/assets/icons/flags/${language}.svg`"
                >
                {{ languagesObject[language] }}
            </div>
        </div>
    </div>
</transition>
</template>

<script setup>
import { inject, computed } from 'vue';

const emits = defineEmits(['change-language']);

// INJECT
const loadingTranslation = inject('loadingTranslation');
const disabledButtons = inject('disabledButtons');
const reviewData = inject('reviewData');
const languagesObject = inject('languagesObject');
const languageActiveResponse = inject('languageActiveResponse');
const languageActiveResponseOriginal = inject('languageActiveResponseOriginal');
const responseStringStreaming = inject('responseStringStreaming');
const responseCurrent = inject('responseCurrent');

const languageOrigin = computed(() => {
    return reviewData.value.languageOrigin || 'es';
});

// DATA STATIC
const LANGUAGES_TRANSLATION = ['es', 'en'];

// DATA

// COMPUTED
const languagesButtonsAvailable = computed(() => {
   const languages = LANGUAGES_TRANSLATION.filter(item => languageOrigin.value !== item);
   return languages;
});

// FUNCTION
function selectLanguage (lg) {
    if (loadingTranslation.value) return;
    emits('change-language', lg);
}



</script>