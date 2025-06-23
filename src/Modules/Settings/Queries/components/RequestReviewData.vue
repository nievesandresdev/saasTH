<template>
<div>
    <!-- messages -->
    <div class="mt-8">
        <h1 class="text-base font-semibold leading-[120%]">Mensaje de solicitud de reseña</h1>
        <div class="mt-2">
            <p class="text-sm leading-[140%]">Personaliza aquí el mensaje que acompañará la solicitud.</p>
        </div>
        <div class="mt-4">
            <div class="mt-4">
                <p class="text-sm font-semibold leading-[120%] mb-2">Título del mensaje</p>
                <AutoTextArea 
                    v-if="valuesForm.response_title"
                    :key="forceUpdate"
                    @empty="event => handleEmpty(event,'thanksEmpty')"
                    :id="'AutoTextArea1'"
                    v-model="valuesForm.response_title['es']" 
                    :wordLimit="150"
                    mandatory
                />
            </div>

            <div class="mt-4 relative">
                <p class="text-sm font-semibold leading-[120%] mb-2">Texto del mensaje</p>
                <Editor 
                    v-if="valuesForm.response_msg"
                    v-model="valuesForm.response_msg['es']"
                    placeholder="Debes introducir un texto"
                    showCounter
                    mandatory
                    :maxLength="300"
                    @validation="textBodyFull = $event"
                    countType="static"
                />
            </div>
        </div>
    </div>

    <OtasTooltipsSection />
    
</div>
</template>
<script setup>
import { inject } from 'vue';
import Editor from '@/components/Forms/Editor.vue'
import AutoTextArea from '@/components/Forms/AutoTextArea.vue'
import OtasTooltipsSection from './OtasTooltipsSection.vue'
const emit = defineEmits(['handleEmpty'])
const props = defineProps({
    disabledOtas: {
        type: Array,
        default: () => []
    }
})

const valuesForm = inject('valuesForm')
const forceUpdate = inject('forceUpdate')
const textBodyFull = inject('textBodyFull')

function handleEmpty(event,input) {
    emit('handleEmpty',event,input)
}
</script>