<template>
    <div class="mt-6 px-4 py-6 shadow-hoster rounded-[10px] bg-white">
        <h3 class="text-base font-semibold leading-[120%]">Notas</h3>
        <div v-for="(note, index) in notes" :key="note.id" :class="{'mt-4':index == 0, 'mt-6':index > 0}">
            <NoteCard :note="note" @confirmDelete="confirmDelete" @reloadList="reloadList"/>
        </div>
        <div v-if="!noteId">
            <NoteEditor @reloadList="reloadList"/>
        </div>
    </div>
    <DeleteNote @reloadList="reloadList"/>
</template>
<script setup>
import { ref, provide, watch, inject } from 'vue'
import NoteCard from './NoteCard.vue'
import NoteEditor from './NoteEditor.vue'
import DeleteNote from './DeleteNote'
//store
import { useStayStore } from '@/stores/modules/stay/stay';

const stayStore = useStayStore();

const noteText = ref(null);
const noteId = ref(null);
const noteType = ref(null);
const deleteNoteId = ref(null);
const notes = ref(null);
const openDeleteModal = ref(false);

provide('noteText',noteText)
provide('noteId',noteId)
provide('noteType',noteType)
provide('deleteNoteId',deleteNoteId)
provide('modelNotes','stay')
provide('openDeleteModal',openDeleteModal)
// provide('currentGuestId',guestId)

const dataDetail = inject('data')

const confirmDelete = (noteId) =>{
    deleteNoteId.value = noteId;
    openDeleteModal.value = true;
}

watch(() => dataDetail.value, async (newData) => {
    notes.value = await stayStore.$getAllNotesByStay(newData.id)
}, { immediate: true });        

async function reloadList(){
    notes.value = await stayStore.$getAllNotesByStay(dataDetail.value.id, false)
}
</script>