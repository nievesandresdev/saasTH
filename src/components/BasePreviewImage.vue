
<template>  
    <div 
        v-if="isOpen" 
        class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-[1000000] rounded-[10px]"
        @click="closePreview"
    >
        <div class="relative m-auto" @click.stop>
            <img :src="urlImage" class="max-w-[800px] max-h-[500px] rounded-[10px]" />
            <button 
                @click="closePreview"
                class="absolute top-4 right-4 z-50 p-[4px] bg-[#ffff] rounded-[6px]"
            >
                <img 
                    class="w-[20px] h-[20px]" 
                    src="/assets/icons/1.TH.CLOSE.svg"
                >
            </button>
        </div>
    </div>
</template>

  <script setup>
  import { ref } from 'vue';
  
  // Las props se deben definir en el contexto de script setup como sigue:
  defineProps({
    urlImage: String,
    isOpen: Boolean
  });

  const emit = defineEmits('update:isOpen')
  
  // Método para cerrar la previsualización
  const closePreview = () => {
    emit('click:close', false);
  };
  </script>
  

  <style lang="" scoped>
      
  </style>
  