import { ref, computed, reactive } from 'vue';
import { useGalleryStore } from '@/stores/modules/gallery';
const galleryStore = useGalleryStore();
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useMockupStore } from '@/stores/modules/mockup';
const mockupStore = useMockupStore();
// COMPOSABLES
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();

export function useGallery () {
    

    const PLACE = 'image-place';
    const HOTEL = 'image-hotel';
    const ITEMS_TABS = [{name: 'Mi alojamiento', value: HOTEL}, {name: 'Destino', value: PLACE}];

    // DATA
    const tabCurrent = ref(HOTEL);
    const form = reactive({
        search: '',
    });
    const search = ref('');
    const images = ref([]);
    const imageSelected = ref([]);
    const indexImageHover = ref(null);

    const previewUrl = ref(null);
    const isPreviewOpen = ref(false);

    const modalDeleteRef = ref(null);

    // COMPUTED
    const imagesContainer = computed(()=> {
        // console.log('images_container computed')
        const imagesCurrent = tabCurrent.value === HOTEL ? images.value.images_gallery_hotel : images.value.images_gallery_places ?? [];
        return imagesCurrent;
    });

    const textNumbersImagesFound = computed(() => {
        let numbers = imagesContainer.value?.length;
        let text =  numbers != 1 ? `${numbers} imágenes encontradas` : `${numbers} imágen encontrada`;
        return text;
    });

    const textNumbersImagesSelected = computed(() => {
        let numbers = imageSelected.value?.length;
        let text =  numbers != 1 ? `${numbers} imágenes seleccionadas` : `${numbers} imágen encontrada`;
        return text;
    });

    // FUNCTION

    function handleFiles(e) {
        const files = Array.from(e.target.files);
        const maxSize = 5 * 1024 * 1024;

        files.forEach((file) => {
            if (!(file instanceof File)) return;
            if (file.size > maxSize) {
                toast.error("Archivo mayor a 5mb", { position: "top-right", });
                return;
            }
            
            const reader = new FileReader();

            reader.onload = (e) => {
                if(file.type == "image/svg+xml" || file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/jpg"){
                        uploadFile(e.target.result,file);
                }else{
                    toast.error("Tipo de archivo no permitido", { position: "top-right", });
                }
            };
            reader.readAsDataURL(file);
        });
    }

    async function uploadFile (url,file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type',  tabCurrent.value);
        formData.append('name_image', formateNameImage(hotelStore.hotelData.name));
        const response = await galleryStore.$upload(formData);
        const { ok, data} = response;
        if (ok) {
            toast.warningToast('Imagen guardada','top-right');
            resetCompoent();
        } else {
            toast.warningToast(data?.message,'top-right');
        }
    }

    function formateNameImage (nameImageOld) {
        let nameImageNew = nameImageOld?.replace(/<\/?[^>]+(>|$)/g, "")?.trim()  ?? null;
        return nameImageNew;
    }

    async function loadGallery() {
        imageSelected.value = [];
        let config = { showPreloader: false  }
        const response = await galleryStore.$getAll(form, config);
        const { ok, data} = response;
        if (ok) {
            images.value = data;
        }
    }

    function checkSelectedImage (url) {
        let exit = imageSelected.value?.some(item => item?.url == url)
        return exit
    }

    function resetCompoent () {
        loadGallery();
        resetSelected();
    }

    async function submitDelete () {
            let bodyRequest = {
                ids_delete: [...imageSelected.value]
            }
            const response = await galleryStore.$deleteBulk(bodyRequest);
            const { ok, data } = response;
            if (ok) {
                toast.warningToast('Cambios guardados con éxito','top-right');
                resetCompoent();
            } else {
                toast.warningToast(data?.message,'top-right');
            }
    }

    function openModalDelete () {
        modalDeleteRef.value.openModal();
    }

    function openPreview(url) {
        // console.log(url,'url');
        previewUrl.value = url;
        isPreviewOpen.value = true;
    }

    function closePreviewImage () {
        previewUrl.value = null;
        isPreviewOpen.value = false;
    }

    function resetSelected () {
        imageSelected.value = [];
    }

    function resetFilter  (TYPE) {
        tabCurrent.value = TYPE
        search.value = ''
        form.search = ''
        loadGallery();
    }


    return {
        //DATA
        ITEMS_TABS,
        tabCurrent,
        form,
        search,
        indexImageHover,
        textNumbersImagesFound,
        textNumbersImagesSelected,
        previewUrl,
        isPreviewOpen,
        // FUNCTIONS
        loadGallery,
        resetFilter,
        imagesContainer,
        imageSelected,
        handleFiles,
        openPreview,
        closePreviewImage,
        resetCompoent,
    }
}