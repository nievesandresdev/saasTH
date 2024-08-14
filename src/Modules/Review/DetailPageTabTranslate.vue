<template>
    <div>
        <p v-if="enableTabsTranslate" class="text-xs font-medium leading-[90%]">Traducir al:</p>
        <div
            v-if="enableTabsTranslate"
            class="mt-2 w-full flex space-x-4 items-center"
        >
            <div
                v-for="(item, index) in tabsLanguagesTranslate"
                :key="index"
                class="chip-primary py-2 px-3 rounded-[6px] text-sm font-medium leading-[110%] flex items-center cursor-pointer"
                :class="{'chip-primary-active': languageActiveTranslate  == tranformLanguageDefault(item) }"
                @click="loadLanguageTranslate(item == languageActiveTranslate ? 'default' : item)"
            >
                    <!-- v-if="tranformLanguageDefault(item) == 'default' ? exist_icon_origin_language_translate : true" -->
                <img
                    class="w-4 h-4 mr-2"
                    :alt="item"
                    :src="`/assets/icons/flags/${item}.svg`"
                >
                <template v-if="tranformLanguageDefault(item) == 'default'">
                    {{ cribadoTranslateReview.originalLanguageName }}
                </template>
                <template v-else>
                    {{ item == 'es' ? 'Español' : 'Inglés' }}
                </template>
            </div>
            <button 
                @click="loadLanguageTranslate('default')"
                class="ml-4 text-sm font-medium underline"
                v-if="languageActiveTranslate !== 'default'"
            >Mostrar original</button>
        </div>
    </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue';

//INJECT
const reviewData = inject('reviewData');
const translateReviewData = inject('translateReviewData');
const cribadoTranslateReview = inject('cribadoTranslateReview');
const languageActiveTranslate = inject('languageActiveTranslate');

// COMPUTED
const fullDataTranslateReviews = computed (() => {
    const full = !!reviewData.value?.travelerTitle ||
        !!reviewData.value?.travelerText ||
        !!reviewData.value?.travelerRextNegative ||
        !!reviewData.value?.travelerTextPositive
    return full;
});
const enableTabsTranslate = computed (() => {
    if (!translateReviewData.value) return false;
    let enable;
    let existsBool = (!!cribadoTranslateReview.value.originaLanguage && fullDataTranslateReviews.value);
    if(cribadoTranslateReview.value?.languageOrigin == 'es'){
        enable = !!translateReviewData.value?.reviewTranslations?.englishtranslation && existsBool;
    }else if(cribadoTranslateReview.value?.languageOrigin == 'en'){
        enable = !!translateReviewData.value?.reviewTranslations?.spanishTranslation && existsBool;
    }else{
        enable = !!translateReviewData.value?.reviewTranslations?.spanishTranslation || 
                !!translateReviewData.value?.reviewTranslations?.englishtranslation || 
                existsBool;
    }
                
    return enable
});

const tabsLanguagesTranslate = computed (() => {
    let tabs = [];
    let data = translateReviewData.value?.reviewTranslations;
    if (
        ( data?.spanishtranslation?.travelerTitle ||
        data?.spanishTranslation?.travelerText ||
        data?.spanishTranslation?.travelerTextPositive ||
        data?.spanishTranslation?.travelerTextNegative) &&
        cribadoTranslateReview.value?.languageOrigin !== 'es'
    ) {
        tabs.push('es')
    }
    if (
        (data?.englishTranslation?.travelerTitle ||
        data?.englishTranslation?.travelerText ||
        data?.englishTranslation?.travelerTextPositive ||
        data?.englishTranslation?.travelerTextNegative) &&
        cribadoTranslateReview.value?.languageOrigin !== 'en'
    ) {
        tabs.push('en')
    }
    
    tabs = [...new Set(tabs)];
    tabs = tabs.filter(item => !!item);
    return tabs;

});

// FUNCTIONS
function loadLanguageTranslate (lg) {
    languageActiveTranslate.value = lg;
}
function tranformLanguageDefault (lg) {
    if (!lg) return;
    return ['es', 'en'].includes(lg) ? lg : 'default';
}

</script>