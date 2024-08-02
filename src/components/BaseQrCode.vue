<template>
    <div :class="{'hidden': hiddenQr}">
        <QRCodeVue3
            :width="300"
            :height="300"
            imgclass="souvenirs_img"
            :value="url"
            :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
            :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }" :dotsOptions="{
                    type: 'square',
                    color: '#333',
                    gradient: {
                        type: 'linear',
                        rotation: 0,
                        colorStops: [
                            { offset: 0, color: '#333' },
                            { offset: 1, color: '#333' },
                        ],
                    },
            }"
            fileExt="jpeg"
            :backgroundOptions="{ color: '#ffffff' }"
            :cornersSquareOptions="{ type: 'dot', color: '#333' }"
            :cornersDotOptions="{ type: undefined, color: '#333' }"
            downloadButton="view-cart bg-info mt-3 souvenirs_btn"
            :downloadOptions="{ name: 'souvenirs', extension: 'jpeg' }"
            crossOrigin="anonymous"
            :download="false"
        />
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import axios from 'axios';
import QRCodeVue3 from "qrcode-vue3"

import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();

const props = defineProps({
    url: {
        type: String,
        default: '',
    },
    hiddenQr: {
        type: Boolean,
        default: false,
    }
})

function copyUrl () {
    let textarea = document.createElement("textarea")
    textarea.value = props.url
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    toast.warningToast('Enlace copiado con éxito','top-right');
}

function downloadQr () {
    let element = document.querySelector('.souvenirs_img');
    let urlItem = element.getAttribute('src');
    if (!urlItem) {
        console.error('No se pudo obtener el atributo src');
        return;
    }
    axios({
        url: urlItem,
        method: 'GET',
        responseType: 'blob'
    })
    .then((response) => {
        let nameqr = 'qr_url_generica';
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', nameqr + '.png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.warningToast('QR descargado con éxito','top-right');
    });
}
defineExpose({ copyUrl, downloadQr });

</script>