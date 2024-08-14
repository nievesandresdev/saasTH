import { ref, computed, reactive } from 'vue';


export function useLanguage () {

    function findLanguage  (languages, languageCode) {
        if (!languages) return;
        let language = languages.find(item => item.abbreviation === languageCode);
        return language;
    }

    return {
        findLanguage,
    }
}