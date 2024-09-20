<template>
    <Modal id="delete-note" :isVisible="openDeleteModal" width="344px" footer>
        <template #content>
            <div class="relative">
                <img 
                    @click="closeModal"
                    class="w-6 h-6 cursor-pointer ml-auto"
                    src="/assets/icons/1.TH.CLOSE.svg"
                >
                <div>
                    <img
                        class="h-8 w-8 mx-auto"
                        src="/assets/icons/warning.svg" 
                    >
                </div>
                <h1 class="mt-4 text-[20px] font-semibold text-center">¿Eliminar nota?</h1> 
            </div>
            <p class="text-sm mt-2 text-center">Las notas se eliminan de forma permanente y no pueden ser recuperadas</p>
        </template>
        <template #footer>
            <div class="mt-4 flex justify-between items-center pb-4 px-4 htext-black-100">
                <button class="text-sm font-medium underline" @click="closeModal">
                    Cancelar
                </button>
                <button 
                    class="hbtn-primary py-3 px-4 text-sm font-medium leading-[110%]"
                    @click="deleteNote"
                >
                    Si, eliminar
                </button>
            </div>
        </template>
    </Modal>
</template>
<script setup>
import { inject, reactive } from 'vue'
import Modal from '@/components/ModalWindow.vue'
import { useRoute } from 'vue-router';
//composable
import { useToastAlert } from '@/composables/useToastAlert'
//store
import { useStayStore } from '@/stores/modules/stay/stay';

const stayStore = useStayStore();
const toast = useToastAlert();
const route = useRoute();

const emit = defineEmits(['reloadList'])

const deleteNoteId = inject('deleteNoteId')
const noteType = inject('noteType')
const openDeleteModal = inject('openDeleteModal')

const form = reactive({
    noteId: null,
    stayId:null
});

const deleteNote = async () => {
    openDeleteModal.value = false;
    form.stayId = route.params.stayId;
    form.noteId = deleteNoteId.value;
    if(noteType.value == 'HU'){
        await stayStore.$deleteGuestNote(form)
    }else{
        await stayStore.$deleteStayNote(form)
    }
    emit('reloadList');
    toast.warningToast('Nota eliminada','top-right');
}

const closeModal = async () => {
    openDeleteModal.value = false;
}
</script>