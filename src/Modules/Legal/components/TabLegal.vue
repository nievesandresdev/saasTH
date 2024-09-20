<template>
    <div class="mb-6">
        <TabMenu :links="views"/>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();

import TabMenu from '@/components/TabMenu.vue'

const views = ref([
    {
        name: 'General',
        active : route.name == 'GeneralLegal',
        viewName :'GeneralLegal'
    },
    {
        name: 'Normas',
        active : route.name == 'PoliciesLegal',
        viewName :'PoliciesLegal'
    },
    {
        name: 'Política de privacidad',
        active : route.name == 'PolicyPrivacyLegal',
        viewName :'PolicyPrivacyLegal'
    },
    {
        name: 'Política de cookies',
        active : route.name == 'PolicyCookiesLegal',
        viewName :'PolicyCookiesLegal'
    }
   
])
</script>