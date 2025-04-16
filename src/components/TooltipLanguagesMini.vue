<template>
    <Tooltip
        size="s"
        :bottom="24"
        :left="0"
    >
        <template v-slot:button>
            <img class="w-4 h-4" src="/assets/icons/info.blue.svg">
        </template>
        <template v-slot:content>
            <p class="text-[11px] leading-[115%] font-normal">
                Nuestra IA, Hosty, traducirá todo el contenido de la WebApp del español al idioma preferido por tu huésped.
            </p>
            <br>
            <p class="text-[11px] leading-[115%] font-normal">
                Cada cambio que realices en la configuración se traducirá automáticamente del español a todos los idiomas disponibles.
            </p>
            <br>
            <div class="grid grid-cols-3 gap-2">
                <template v-for="(language, index) in languages">
                    <div class="flex items-center">
                        <img :src="language.img" class="w-4 h-4">
                        <span class="text-[11px] font-normal ml-1">{{ language.label }}</span>
                    </div>
                </template>
            </div>
        </template>
    </Tooltip>
</template>
<script setup>
import Tooltip from '@/components/Tooltip.vue'

const languages = [
        { value: 'es', label: 'Español', img: '/assets/icons/flags/es.svg' },
        { value: 'pt', label: 'Portugués', img: '/assets/icons/flags/pt.svg' },
        { value: 'al', label: 'Alemán', img: '/assets/icons/flags/al.svg' },
        { value: 'en', label: 'Inglés', img: '/assets/icons/flags/en.svg' },
        { value: 'it', label: 'Italiano', img: '/assets/icons/flags/it.svg' },
        { value: 'fr', label: 'Francés', img: '/assets/icons/flags/fr.svg' },
        { value: 'nl', label: 'Holandés', img: '/assets/icons/flags/nl.svg' },
        { value: 'ca', label: 'Catalán', img: '/assets/icons/flags/ca.svg' },
        { value: 'eu', label: 'Euskera', img: '/assets/icons/flags/eu.svg' },
        { value: 'gl', label: 'Gallego', img: '/assets/icons/flags/gl.svg' },
    ]
</script>