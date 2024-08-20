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
const fullDataTranslateReviews = inject('fullDataTranslateReviews');
const reviewData = inject('reviewData');
const translateReviewData = inject('translateReviewData');
const cribadoTranslateReview = inject('cribadoTranslateReview');
const languageActiveTranslate = inject('languageActiveTranslate');

// COMPUTED

const languagesTranslationEnable = computed(() => {
    if (!!cribadoTranslateReview.value.languageOrigin && !fullDataTranslateReviews.value || !translateReviewData.value) return [];
    const { es, en } = translateReviewData.value;
    const KEYS_DISABLED = ['_id'];
    const lgs = Object.keys(translateReviewData.value)
        .filter(key => ( !!translateReviewData.value?.[key] && !KEYS_DISABLED.includes(key) ))
    return lgs;
});

const enableTabsTranslate = computed (() => {
    if (!translateReviewData.value) return false;
    let existsBool = (!!cribadoTranslateReview.value.languageOrigin && !!fullDataTranslateReviews.value);

    return existsBool && languagesTranslationEnable.value?.length > 0;
});

const tabsLanguagesTranslate = computed (() => {
    let tabs = [...languagesTranslationEnable.value];
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