<template>
    <div class="mt-6">
        <label v-if="type !== 'edit'" class="text-sm font-medium leading-[110%] mb-2">Aplicar nota a</label>
        <div v-if="type !== 'edit'" class="w-[362px] mb-4">
            <BaseSelectField
                :icon_left="iconLeftDropdown"
                textLabel="Selecciona el medio de la reserva"
                :options="dataDetail.optionsListNote"
                v-model="noteTo"
                mandatory
            />
        </div>
        <p v-if="type == 'edit' && createAt" class="text-xs font-semibold leading-[90%] mb-2">
            Editando nota del: 
             {{$formatTimestampDate(createAt, 'dd/MM/yyyy')}} - {{$formatTimestampDate(createAt, 'HH:mm')}}hs
        </p>
        <Editor
            :id="'editor-nota-estancia'+createAt"
            :key="'editor-nota-estancia'+createAt"
            v-model="text" 
            placeholder="Escribe algo"
            showCounter
            :maxLength="300"
            @validation="titleFull = $event"
            countType="static"
            minHeight="s"
            :mandatory="Boolean(type == 'edit')"
        />
    </div>
    <div class="mt-4 flex justify-end items-center">
        <button @click="closeEdit" class="text-sm font-medium leading-[110%] underline mr-8"  v-if="text && titleFull || type == 'edit'">
            Cancelar
        </button>
        <button 
            class="hbtn-primary px-4 py-3 text-sm leading-[110%]"
            @click="submit"
            :class="{'primary-disabled':!validate}"
            :disabled="!validate"
        >
            Guardar nota 
        </button>
    </div>
</template>
<script setup>
import { ref, inject, computed } from 'vue'
import Editor from '@/components/Forms/Editor.vue'
import BaseSelectField from '@/components/Forms/BaseSelectField.vue';
//composable
import { useToastAlert } from '@/composables/useToastAlert'
//store
import { useStayStore } from '@/stores/modules/stay/stay';

const stayStore = useStayStore();
const toast = useToastAlert();
const emit = defineEmits(['reloadList'])

const props = defineProps({
    type:{
        type: String,
        default:'create'
    },
    createAt:{
        type: String,
        default:null
    },
})
const text = inject('noteText')
const noteId = inject('noteId')
const noteType = inject('noteType')
const dataDetail = inject('data')

const titleFull = ref(false)
const noteTo = ref('STAY')

const submit = async () =>{
    let data = {
        content: text.value,
        noteId: noteId.value,
        stayId: dataDetail.value.id,
        guestId: noteTo.value,
    }
    let response = 'Actualizado';
    if(props.type == 'create' && noteTo.value == 'STAY' || props.type == 'edit' && noteType.value == 'ES'){
        response = await stayStore.$createOrupdateStayNote(data);
    }else{
        response = await stayStore.$createOrupdateGuestNote(data);
    }
    emit('reloadList');
    noteId.value = null;
    titleFull.value = false;
    text.value = "<p><br></p>";
    toast.warningToast(response,'top-right');
    
   
}

const closeEdit = () =>{
    text.value = "<p><br></p>";
    noteId.value = null; 
    titleFull.value = false;    
}

const validate = computed(()=>{

    return titleFull.value;
})

const iconLeftDropdown = computed( () => {
    let value = dataDetail.value.optionsListNote.find(item => item.value == noteTo.value)  
    return value.img;
})
</script>