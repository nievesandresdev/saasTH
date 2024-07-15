<template>
    <!-- <Dialog id="delete-note" :styleContent="{'max-width': '344px !important'}">
        <template v-slot:header>
            <div class="relative">
                <img 
                    data-dismiss="modal" aria-label="Close" class="w-6 h-6 cursor-pointer ml-auto"
                    src="/vendor_asset/img/partner/icons/close.svg"
                >
                <div>
                    <img
                        class="h-8 w-8 mx-auto"
                        src="/vendor_asset/img/partner/icons/warning.svg" 
                    >
                </div>
                <h1 class="mt-4 text-[20px] font-semibold text-center">¿Eliminar nota?</h1> 
            </div>
        </template>
        <template v-slot:body>
            <p class="text-sm mt-2 text-center">Las notas se eliminan de forma permanente y no pueden ser recuperadas</p>
        </template>
        <template v-slot:action>
            <div class="mt-4 flex justify-between items-center">
                <button class="text-sm font-medium underline" data-dismiss="modal" aria-label="Close">
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
    </Dialog> -->
</template>
<script setup>
import { inject, reactive } from 'vue'
// import Dialog from '@/Components/Dialog.vue'

const deleteNoteId = inject('deleteNoteId')
const noteType = inject('noteType')

const form = reactive({
    noteId: null
});

const deleteNote = () => {
    $('#delete-note').modal('hide');
    form.noteId = deleteNoteId.value;
    let route_delete = 'stay.notes.delete';
    console.log('noteType',noteType)
    if(noteType.value == 'HU'){
        route_delete = 'stay.guest.notes.delete';
    }
    form.delete(route(route_delete),{
        preserveScroll: true,
        onSuccess: () => {
            form.noteId = null 
            deleteNoteId.value = null
            console.log('delte note')
        },
    });
    // Inertia.delete(route('stay.notes.delete',deleteNoteId.value));
}
</script>