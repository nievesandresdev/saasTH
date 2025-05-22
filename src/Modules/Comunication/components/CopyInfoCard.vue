<template>
    <div class="w-[752px]">
        <div class="border hborder-gray-400 rounded-[10px] p-4 w-full h-[250px]" v-html="text"></div>
        <div class="text-right mt-8">
            <a @click="copyTextToClipboard" href="javascript:void(0)" class="hbtn-primary cursor-pointer px-4 py-3 h-10 text-sm leading-[100%] inline-block">
                Copiar mensaje
            </a>
        </div>
    </div>
</template>

<script>
import { $urlBaseWebapp } from '@/utils/helpers';
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();

let subdomainChain = hotelStore?.hotelData?.chain?.subdomain;
let slugHotel = hotelStore?.hotelData?.subdomain;
const urlBase = $urlBaseWebapp(subdomainChain, slugHotel);

export default {
    props: {
        text: {
            type: String,
            default: () => {
                /* let subdomainChain = hotelStore?.hotelData?.chain?.subdomain;
                let slugHotel = hotelStore?.hotelData?.subdomain;
                const urlBase = $urlBaseWebapp(subdomainChain, slugHotel); */
                return `
                    <p style="font-size:14px;font-weight: 500;line-height: 140%;">
                        Estimado huésped,<br/>
                        Deseamos que su estancia sea cómoda y placentera. Nuestro equipo está a su disposición para cualquier necesidad que pueda surgir.<br/><br/><br/>
                        Te invitamos a explorar nuestra WebApp, donde encontrarás la información sobre nuestras instalaciones y servicios. Además, descubre nuestras recomendaciones de experiencias y restaurantes seleccionados. Lo mejor de la ciudad, sin necesidad de descargar nada.<br/>
                        Prueba nuestra WebApp click <a href="${urlBase}" style="text-decoration: underline;color:#0B6357;">aquí</a>.<br/>
                       
                    </p>
                `;
            }
        },
        textNotHtml: {
            type: String,
            default: () => {
                
                return `Estimado huésped, Deseamos que su estancia sea cómoda y placentera. Nuestro equipo está a su disposición para cualquier necesidad que pueda surgir. Te invitamos a explorar nuestra WebApp, donde encontrarás la información sobre nuestras instalaciones y servicios. Además, descubre nuestras recomendaciones de experiencias y restaurantes seleccionados. Lo mejor de la ciudad, sin necesidad de descargar nada. Prueba nuestra WebApp click ${urlBase}.`;
            }
        }
    }
}
</script>

<script setup>
import { useToastAlert } from '@/composables/useToastAlert';





const props = defineProps();
const toast = useToastAlert();

const copyTextToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(props.textNotHtml);
        toast.warningToast('Copiado con éxito', 'top-right');
    } catch (err) {
        console.error('Error al copiar el texto: ', err);
        toast.errorToast('Error al copiar el texto', 'top-right');
    }
}
</script>

