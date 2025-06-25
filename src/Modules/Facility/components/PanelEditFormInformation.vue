<template>
    <div class="space-y-4">
        <div class="space-y-2">
             <label class="text-sm font-medium">Nombre de la instalación</label>
            <BaseTextField
                v-model="form.title"
                placeholder="Nueva instalación"
                class-content="flex-1"
                name="title"
                :max="'50'"
                :errors="errors"
                @blur:validate="validate('title')"
            />
        </div>
        <div class="space-y-2">
             <label class="text-sm font-medium">Descripción</label>
            <BaseTextareaField
                v-model="form.description"
                placeholder="Describe la nueva instalación"
                class-content="flex-1"
                name="description"
                :max="'500'"
                :rows="2"
            />
        </div>
        <div class="space-y-2">
            <div class="flex items-center">
                <label class="text-sm font-medium mr-2">Etiqueta de anuncio</label>
                <BaseTooltipResponsive
                    size="s"
                    :top="40"
                    :left="0"
                >
                    <template #button>
                        <img class="w-[13px] h-[13px]" src="/assets/icons/TH.INFO.GREEN.svg">
                        </template>
                        <template #content>
                        <p class="text-sm leading-[150%] font-normal">
                            Puedes agregar una etiqueta para anunciar información eventual sobre esta instalación. 
                        </p>
                        <p class="mt-2 text-sm leading-[150%] font-normal">
                            Ej: "Cierre temporal", "20% Off", "Happy hour", etc.
                        </p>
                    </template>
                </BaseTooltipResponsive>
            </div>
            <BaseTextField
                v-model="form.ad_tag"
                placeholder="Ingresa tu texto"
                class-content="flex-1"
                name="ad_tag"
                :max="'20'"
            />
        </div>
            <section> <!-- Añade un menú o catálogo para tus huéspedes -->
                <label class="text-sm font-medium">Añade un menú o catálogo para tus huéspedes</label>
                <BaseSelectField
                    v-model="form.document"
                    placeholder="Ingresa tu texto"
                    class-content="flex-1"
                    name="document"
                    :max="'20'"
                    mandatory
                    :options="documentOptions"
                />
                <span class="text-xs text-[#333] font-normal" v-if="form.document === 'upload_file'">
                    Tus huéspedes descargarán el archivo desde la WebApp
                    <section class="flex flex-col mt-6">
                        <div class="w-full">
                            <input 
                                type="file" 
                                accept=".pdf,.jpeg,.png"
                                class="hidden" 
                                ref="fileInput"
                                @change="handleFileUpload"
                            >
                            <!-- Vista de archivo cargado -->
                            <div v-if="fileUploaded" class="flex flex-col w-full">
                                <div class="flex items-start gap-3 border border-[#333] rounded-[6px] p-4 w-full">
                                    <!-- Thumbnail -->
                                    <div class="w-24 h-24 flex items-center justify-center bg-gray-100 rounded overflow-hidden">
                                        <template v-if="selectedFileFormat === 'PDF'">
                                            <canvas ref="pdfCanvas" class="w-[130px] h-auto rounded"></canvas>
                                        </template>
                                        <template v-else>
                                            <img 
                                            :src="getFilePreview" 
                                            class="w-[130px] h-[95px] object-cover"
                                            alt="Preview"
                                            />
                                        </template>
                                    </div>

                                    <!-- Información del archivo -->
                                    <div class="flex-1">
                                        <div class="flex items-center gap-2">
                                            <p class="text-sm font-medium">
                                                {{ selectedFileName }}<span class="text-[#A0A0A0]">.{{ selectedFileFormat }}</span>
                                            </p>
                                            <img src="/assets/icons/TH.CHECK.svg" alt="check" class="w-5 h-5">
                                        </div>
                                        <p v-if="selectedFileSize" class="text-xs text-[#A0A0A0] mt-1">{{ selectedFileSize }}</p>
                                    </div>
                                </div>
                                <div class="flex justify-end mt-2">
                                    <button 
                                        class="flex items-center gap-2 text-[14px] text-[#333] font-medium"
                                        @click="resetFileUpload"
                                    >
                                        <img src="/assets/icons/1.TH.DELETE.SHAPE.svg" alt="delete" class="w-5 h-5">
                                        <span>Eliminar archivo</span>
                                    </button>
                                </div>
                            </div>
                            <!-- Botón de carga -->
                            <div v-else class="flex flex-col mb-4">
                                <div class="flex items-center gap-3">
                                    <div 
                                        class="flex items-center gap-2 border border-[#333] rounded-[6px] px-4 py-4 focus:outline-none focus:border-[#333] active:border-[#333] hover:border-[#333] cursor-pointer"
                                        @click="$refs.fileInput.click()"
                                    >
                                        <img src="/assets/icons/1.TH.UPLOAD.svg" alt="upload" class="w-5 h-5">
                                        <span class="text-[16px] font-medium">Cargar archivo</span>
                                    </div>
                                    <p class="text-xs text-[#A0A0A0] font-medium">
                                        Formatos soportados:<br>
                                        PDF, JPEG, PNG hasta 10MB
                                    </p>
                                </div>
                                <!-- Mensaje de error -->
                                <div v-if="fileError" class="flex items-center gap-2 mt-2">
                                    <img src="/assets/icons/1.TH.WARNING.RED.svg" alt="warning" class="w-4 h-4">
                                    <span class="text-[12px] font-normal text-[#F66] mt-[2px]">El formato o tamaño del archivo no cumple con los requisitos</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </span>
                <span class="text-xs text-[#333] font-normal" v-if="form.document === 'link_document'">
                    Redirige a tus huéspedes a la página web donde se encuentre el menú
                </span>
            </section>
            <section v-if="form.document === 'link_document'" class="mt-6">   <!-- URL del documento -->
                <label class="text-sm font-medium">Añadir URL</label>
                <BaseTextField
                    v-model="form.link_document_url"
                    placeholder="Ej: htttp://spa.com/catalogo"
                    class-content="flex-1"
                    name="link_document_url"
                />
            </section>
            <section v-if="form.document === 'link_document' || form.document === 'upload_file'" class="mt-6">   <!-- Texto del botón -->
                <div class="flex items-center">
                    <label class="text-sm font-medium mr-2">Texto del botón</label>
                    <BaseTooltipResponsive
                        size="s"
                        :top="-80"
                        :left="0"
                    >
                        <template #button>
                            <img class="w-[13px] h-[13px]" src="/assets/icons/TH.INFO.GREEN.svg">
                        </template>
                        <template #content>
                            <p class="text-sm leading-[150%] font-normal">
                                Ingresa el texto que aparecerá en el botón que verán tus huéspedes.
                            </p>
                        </template>
                    </BaseTooltipResponsive>
                </div>
                <BaseTextField
                    v-model="form.text_document_button"
                    placeholder='Ej: "Descargar menú", "Ver catálogo", etc.'
                    class-content="flex-1"
                    name="text_document_button"
                    :max="'20'"
                />
            </section>
    </div>
</template>
https://www.google.com/maps/place/WELLDONE+ANTIQUARIUM/@37.3945703,-5.9925358,17z/data=!3m1!4b1!4m9!3m8!1s0xd126c045d138193:0xdc483bf9c7e345b8!5m2!4m1!1i2!8m2!3d37.3945661!4d-5.9899609!16s%2Fg%2F11f3p8rffy?entry=ttu&g_ep=EgoyMDI0MDkwOS4wIKXMDSoASAFQAw%3D%3D

<script setup>
import { ref, computed, inject, onBeforeUnmount, nextTick, watch } from 'vue';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.entry';

GlobalWorkerOptions.workerSrc = workerSrc;

// COMPONENTES
import BaseTextField from "@/components/Forms/BaseTextField.vue";
import BaseTextareaField from "@/components/Forms/BaseTextareaField.vue";
import BaseTooltipResponsive from "@/components/BaseTooltipResponsive.vue";
import BaseSelectField from "@/components/Forms/BaseSelectField.vue";

// Inyecciones
const form = inject('form');
const itemSelected = inject('itemSelected');
const errors = inject('errors');
const validateField = inject('validateField');
const facilityStore = inject('facilityStore');

// Refs
const fileInput = ref(null);
const selectedFile = ref(null);
const selectedFileName = ref('');
const selectedFileSize = ref('');
const selectedFileFormat = ref('');
const fileUploaded = ref(false);
const pdfCanvas = ref(null);
const fileError = ref(false);

const validate = (field) => validateField(field);

const documentOptions = [
    { label: 'No añadir menú o catálogo', value: 'no_add_document' },
    { label: 'Subir archivo', value: 'upload_file' },
    { label: 'Insertar URL', value: 'link_document' },
];

// Funciones auxiliares
const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileFormat = (filename) => filename.split('.').pop().toUpperCase();

const resetFileUpload = () => {
    selectedFile.value = null;
    selectedFileName.value = '';
    selectedFileSize.value = '';
    selectedFileFormat.value = '';
    fileUploaded.value = false;
    fileError.value = false;
    form.document_file = null;
    
    if (fileInput.value) {
        fileInput.value.value = '';
    }
};

// Función para cargar archivo existente
async function loadExistingFile(fileUrl) {
    if (!fileUrl) return;

    if (fileUrl.toLowerCase().endsWith('.pdf')) {
        try {
            // For PDFs, use the direct URL
            const pdf = await getDocument(fileUrl).promise;
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({ scale: 1.5 });

            await nextTick();
            const canvas = pdfCanvas.value;
            if (canvas) {
                const context = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                await page.render({ canvasContext: context, viewport }).promise;
            }
        } catch (error) {
            console.error('Error al cargar el PDF:', error);
            fileError.value = true;
            // Resetear el canvas si hay error
            if (pdfCanvas.value) {
                const context = pdfCanvas.value.getContext('2d');
                context.clearRect(0, 0, pdfCanvas.value.width, pdfCanvas.value.height);
            }
        }
    }
}

const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    fileError.value = false;

    // Validación de tipo
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
        fileError.value = true;
        fileInput.value.value = ''; // Limpiar input
        return;
    }

    // Validación de tamaño
    if (file.size > 10 * 1024 * 1024) {
        fileError.value = true;
        fileInput.value.value = ''; // Limpiar input
        return;
    }

    selectedFile.value = file;
    selectedFileName.value = file.name.split('.')[0];
    selectedFileSize.value = formatFileSize(file.size);
    selectedFileFormat.value = getFileFormat(file.name);
    fileUploaded.value = true;
    form.document_file = file;

    // Renderizar PDF si corresponde
    if (file.type === 'application/pdf') {
        const fileURL = URL.createObjectURL(file);
        const pdf = await getDocument(fileURL).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });

        await nextTick();
        const canvas = pdfCanvas.value;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: context, viewport }).promise;
    }
};

// Watch para actualizar el estado cuando cambia document_file
watch(() => form.document_file, (newValue) => {
    if (newValue) {
        fileUploaded.value = true;
        if (typeof newValue === 'string') {
            // Es una URL existente
            selectedFileName.value = newValue.split('/').pop().split('.')[0];
            selectedFileFormat.value = newValue.split('.').pop().toUpperCase();
            loadExistingFile(newValue);
        } else if (newValue instanceof File) {
            // Es un archivo nuevo
            selectedFileName.value = newValue.name.split('.')[0];
            selectedFileFormat.value = getFileFormat(newValue.name);
            selectedFileSize.value = formatFileSize(newValue.size);
        }
    } else {
        resetFileUpload();
    }
}, { immediate: true });

// Computed properties
const getFilePreview = computed(() => {
    if (form.document_file instanceof File) {
        return URL.createObjectURL(form.document_file);
    }
    if (typeof form.document_file === 'string') {
        return facilityStore.formatImage({ url: form.document_file },'facility_documents');
    }
    return '';
});

onBeforeUnmount(() => {
    if (selectedFile.value) {
        URL.revokeObjectURL(getFilePreview.value);
    }
});
</script>
