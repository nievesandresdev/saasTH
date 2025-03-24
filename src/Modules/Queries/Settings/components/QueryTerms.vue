<template>
    <section class="px-6 mt-6">
        <div class="bg-white py-6 px-4 rounded-[10px]">
            <h1 class="text-base font-semibold leading-[120%]">Sentimiento del huésped en {{ status }}</h1>
            <div class="flex mt-4">
                <p class="text-sm font-medium mr-2">Pregunta</p>
                <p class="text-sm">{{ question }}</p>
            </div>
            <div class="flex mt-4">
                <p class="text-sm font-medium mr-2">Opciones de respuesta</p>
                <p class="text-sm">{{ questionOptions }}</p>
            </div>
            <div class="flex mt-4">
                <p class="text-sm font-medium mr-2">Envío</p>
                <p class="text-sm">{{ queryTrigger }}</p>
            </div>
            <div class="flex mt-4">
                <p class="text-sm font-medium mr-2">Disponible</p>
                <p class="text-sm">{{ whenAvailable }}</p>
            </div>
        </div>
    </section>
</template>
<script setup>
import { $formatTypeLodging } from '@/utils/helpers'
 defineProps({
    status:{
        type:String,
        default:'Pre-Stay'
    },
    question:{
        type:String,
        default:'¿Hay algo que podamos hacer para tu llegada al '+ $formatTypeLodging() +'?'
    },
    questionOptions:{
        type:String,
        default:'Cuadro de texto'
    },
    queryTrigger:{
        type:String,
        default:'Se enviará cuando el huésped cree la estancia'
    },
    whenAvailable:{
        type:String,
        default:'Hasta el día del check-in'
    },
 })
</script>