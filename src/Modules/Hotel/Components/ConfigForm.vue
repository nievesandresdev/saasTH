<template>
    <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="form-group">
            <label class="text-sm font-medium mb-1 block">Título</label>
            <input 
                v-model="formData.title" 
                type="text" 
                class="w-full p-2 border rounded"
                @input="handleInput"
            >
        </div>
        <div class="form-group">
            <label class="text-sm font-medium mb-1 block">Contenido</label>
            <textarea 
                v-model="formData.content" 
                class="w-full p-2 border rounded h-32"
                @input="handleInput"
            ></textarea>
        </div>
        <!-- Puedes agregar más campos según necesites -->
    </form>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
    initialData: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['update:data', 'change']);

// Creamos una copia local de los datos
const formData = ref({ ...props.initialData });

// Observamos cambios en los props para actualizar el formulario
watch(() => props.initialData, (newValue) => {
    formData.value = { ...newValue };
}, { deep: true });

const handleInput = () => {
    emit('update:data', formData.value);
    emit('change'); // Para activar el ChangesBar
};

const handleSubmit = () => {
    emit('update:data', formData.value);
};
</script> 