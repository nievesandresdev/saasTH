<template>
    <div class="">
        <div class="flex w-full items-center">
            <img 
                class="w-10 h-8 rounded-[6px] object-cover" 
                :src="acronymIcon"
            >
            <p class="text-base ml-2 w-[248px] 3xl:w-[448px]">{{ note.guest_name ? note.guest_name : 'Estancia' }}</p>
            <p class="text-xs font-semibold text-center ml-9">
                {{$formatTimestampDate(note.created_at,'dd/MM')}} - 
                {{$formatTimestampDate(note.created_at,'HH:mm')}}hs
            </p>
            <div class="relative flex-shrink-0 w-[80px] ml-auto">
                <div class="absolute flex top-[-20px]">
                    <HoveredIcon 
                        :src="'/assets/icons/1.TH.EDIT.OUTLINED.svg'"
                        :height_icon="'24px'"
                        :width_icon="'24px'"
                        :padding_container="'8px'"
                        style="--background-color: #f3f3f3;"
                        @click="editNote(note.id, note.type, note.content)"
                    />
                    <HoveredIcon 
                        :src="'/assets/icons/1.TH.DELETE.OUTLINE.svg'"
                        :height_icon="'24px'"
                        :width_icon="'24px'"
                        :padding_container="'8px'"
                        style="--background-color: #f3f3f3;"
                        @click="confirmDelete(note.id, note.type)"
                    />
                </div>
            </div>
            <div class="relative flex-shrink-0 w-[40px] ml-2">
                <div class="absolute flex top-[-20px]">
                    <HoveredIcon 
                        :src="`/assets/icons/${ openContent ? '1.TH.I.dropdown' : '1.TH.I.DROPDOWN.OPEN'}.svg`"
                        :height_icon="'24px'"
                        :width_icon="'24px'"
                        :padding_container="'8px'"
                        style="--background-color: #f3f3f3;"
                        @click="toggleNote('note'+note.id+note.type)"
                    />
                </div>
            </div>
        </div>
        <div :id="'note'+note.id+note.type" class="container-text-quill mt-4 hidden" v-html="note.content"></div>
        <div class="border-b border-gray-300 mt-4"></div>
    </div>
    <NoteEditor 
        type="edit"  v-if="noteId == note.id && noteType == note.type" 
        :createAt="note.created_at" @reloadList="reloadList"
    />
</template>
<script setup>
import { inject, computed, ref } from 'vue'
import NoteEditor from './NoteEditor.vue'
import HoveredIcon from '@/components/Buttons/HoveredIcon.vue'

const noteText = inject('noteText')
const noteId = inject('noteId')
const noteType = inject('noteType')
const deleteNoteId = inject('deleteNoteId')

const { note } = defineProps({
    note: {
        type: Object,
        default: () => ({}),
    }
})

const openContent = ref(true);

const emit = defineEmits(['confirmDelete','reloadList'])
const editNote = (noteID, noteTYPE, ContentTEXT) =>{
    noteText.value = ContentTEXT;
    noteType.value = noteTYPE;
    noteId.value = noteID;
}

const confirmDelete = (noteId, noteTYPE) =>{
    noteType.value = noteTYPE;
    emit('confirmDelete',noteId)
}

const reloadList = () =>{
    console.log('dentro de card?')
    emit('reloadList')
}

const acronymIcon = computed(()=>{
    let icon =  "https://ui-avatars.com/api/?name=ES&color=fff&background=34A98F";
    if(note.guest_name){
        icon =  `https://ui-avatars.com/api/?name=${note.guest_acronym}&color=fff&background=${note.guest_color}`;
    }
    return icon
})


const toggleNote = (id) =>{
    openContent.value = !openContent.value;
    var el = document.getElementById(id);
    el.classList.toggle("hidden");
}
</script>