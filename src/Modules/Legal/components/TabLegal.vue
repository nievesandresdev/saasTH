<template>
    <div class="">
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
        name: 'Políticas',
        active : route.name == 'AvailabilitySettings',
        viewName :'AvailabilitySettings'
    },
    {
        name: 'Política de privacidad',
        active : route.name == 'AutomaticResponses',
        viewName :'AutomaticResponses'
    },
    {
        name: 'Política de cookies',
        active : route.name == 'AutomaticResponses',
        viewName :'AutomaticResponses'
    }
   
])
</script>