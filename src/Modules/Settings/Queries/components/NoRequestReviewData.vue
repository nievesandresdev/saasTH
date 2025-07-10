<template>
    <div class="mt-8">
        <div class="flex items-center">
            <h3 class="text-sm font-medium leading-[140%]">Solicitar un comentario</h3>
            <p class="text-sm font-semibold leading-[120%] ml-auto mr-1">
                Activo
            </p>
            <ToggleButton
                v-model="valuesForm.no_request_comment_activate"
                id="toggle-1"
            />
            
        </div>
        <!-- comment -->
        <div class="mt-[6px]">
            <AutoTextArea 
                v-if="valuesForm.no_request_comment_msg"
                :key="forceUpdate"
                @empty="event => handleEmpty(event,'no_request_comment_msg')"
                :id="'AutoTextArea1'"
                v-model="valuesForm.no_request_comment_msg['es']" 
                :wordLimit="150"
                mandatory
            />
        </div>
        <!-- thanks -->
        <div class="mt-4">
            <h3 class="text-base font-semibold leading-[120%]">Mensaje de agradecimiento sin solicitud de reseña</h3>
            <p class="text-sm leading-[140%] mt-2">
                Personaliza aquí el mensaje de agradecimiento a los huéspedes que dejen un feedback positivo.
            </p>
            <div class="mt-4">
                <p class="text-sm font-semibold leading-[120%] mb-2">Título del mensaje</p>
                <AutoTextArea 
                    v-if="valuesForm.no_request_thanks_title"
                    :key="forceUpdate"
                    @empty="event => handleEmpty(event,'no_request_thanks_title')"
                    :id="'AutoTextArea1'"
                    v-model="valuesForm.no_request_thanks_title['es']" 
                    :wordLimit="150"
                    mandatory
                />
            </div>

            <div class="mt-4 relative">
                <p class="text-sm font-semibold leading-[120%] mb-2">Texto del mensaje</p>
                <Editor 
                    v-if="valuesForm.no_request_thanks_msg"
                    v-model="valuesForm.no_request_thanks_msg['es']"
                    placeholder="Debes introducir un texto"
                    showCounter
                    mandatory
                    :maxLength="300"
                    @validation="textBodyFullNoRequest = $event"
                    countType="static"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue'
import ToggleButton from '@/components/Buttons/ToggleButton.vue'
import AutoTextArea from '@/components/Forms/AutoTextArea.vue'
import Editor from '@/components/Forms/Editor.vue'

const valuesForm = inject('valuesForm')
const textBodyFullNoRequest = inject('textBodyFullNoRequest')
const forceUpdate = inject('forceUpdate')
const emit = defineEmits(['handleEmpty'])

function handleEmpty(event,input) {
    emit('handleEmpty',event,input)
}
</script>   
