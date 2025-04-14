<template>
<div class="relative" ref="dropdownRef">
    <BaseTextField
        v-model="search"
        prepend-inner-icon="/assets/icons/1.TH.SEARCH.svg"
        :placeholder="placeholder"
        @keyup:prevent="handleSearchLang"
        class-content="'w-full'"
        @enter:search="handleSearchLang"
    ></BaseTextField>
    <ul
        v-if="result.length > 0 && showResults"
        class="absolute top-10 left-0 w-full z-50 bg-white overflow-hidden shadow-md rounded-lg"
    >
        <li
            v-for="lg in result" :key="lg.id"
            @click="selectlanguage({id: lg.id, name: lg.name, abbreviation: lg.abbreviation})"
            class="px-3 py-2.5 flex items-center hover:bg-gray-100 cursor-pointer"
        >
            <img class="w-5 h-5 mr-2" :src="'/assets/icons/flags/' + lg.abbreviation + '.svg'" alt="">
            <p class="text-sm">{{lg.name}}</p>
        </li>
    </ul>
    <div class="flex flex-wrap mt-4">
        <div
            v-for="lang in value ?? []" :key="lang.id"
            class="chip-primary rounded-lg px-3 py-2 flex items-center mt-2 mr-4"
        >
            <img class="size-4 mr-2" :src="'/assets/icons/flags/' + lang.abbreviation + '.svg'" alt="">
            <p class="text-sm font-medium mr-2 l">{{lang.name}}</p>
            <img @click="deleteLanguageSelected(lang.abbreviation, lang.id)" class="size-4 cursor-pointer" src="/assets/icons/1.TH.CLOSE.svg" alt="">
        </div>
    </div>
</div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch, toRefs } from 'vue';

import BaseTextField from '@/components/Forms/BaseTextField'

import { searchLang as fetchLangs } from '@/api/services/chat/chatSettings.services';

const emit = defineEmits(['selectedValue', 'update:modelValue']);

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    placeholder: {
        type: String,
        default: "",
    },
});
const { modelValue } = toRefs(props);

const search = ref('')
const result = ref([])
const showResults = ref(false)
const anyEmpty = ref([])
const notSearchLang = ref([])

const value = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
});

const selectlanguage = (lang) => {
    value.value.push(lang);
    notSearchLang.value.push(lang.id);
    search.value = '';
    showResults.value = false;
    emit('selectedValue', lang);
}

const handleSearchLang = async () => {
    const params = {
        search: search.value,
        notSearch: []
    }
    const response = await fetchLangs(params)
    result.value = response.data
    if (search.value) {
        showResults.value = true
    } else {
        showResults.value = false
    }
}

function deleteLanguageSelected (langAbbreviation, langId) {
    value.value = value.value.filter(lang => lang.abbreviation !== langAbbreviation);
    notSearchLang.value = notSearchLang.value.filter(id => id !== langId);
}

</script>