
import { ref, inject, watch } from 'vue';

import { useRouter } from 'vue-router';
const route = useRouter();

export function useHighlightSearch () {

    const searchQuery = ref('');
    // const searchQuery = ref(route.query.search || '');

    // watch(() => route.query.search, (newSearch) => {
    //     searchQuery.value = newSearch;
    // }, { immediate: true });

    function load(text, searchText) {
        // console.log(searchText, 'searchText')
        if (!searchText) return text;
        const re = new RegExp(searchText, 'gi');
        return text.replace(re, match => `<span style="background-color:#fff1be;">${match}</span>`);
    }

    return {
        searchQuery,
        load,
    }

}