<template>
    <section>
        <h1 class="text-sm font-semibold mb-2">Integración para la obtención de los beneficios</h1>
        <p class="text-sm font-normal mb-4">
            Integra este código en tu página web para la verificación y asignación de los beneficios al huésped en la página de confirmación tras su uso. 
        </p>
        
        <!-- Información de integración -->
        <div class="flex justify-start gap-1 items-center">
            <img class="w-[17px] h-[17px]" src="/assets/icons/info-white.svg" />
            <span class="text-sm font-medium">¿Cómo integrarlo?</span>
            <img 
                class="w-4 h-4 transition-transform duration-300 cursor-pointer"
                :class="{ 'rotate-180': showDescription }" 
                src="/assets/icons/1.TH.I.dropdown.svg" 
                @click="toggleDescription"
            />
        </div>

        <!-- Descripción detallada -->
        <div class="flex w-full mt-1" v-show="showDescription">
            <p class="text-sm leading-[150%] font-normal">
                Cuando el usuario coloca este código en su sitio web, el sistema captura automáticamente un identificador de referencia desde la URL y lo envía mediante una solicitud HTTP a nuestro servidor. Allí, se verifica si el código está registrado, activo y en uso. En caso contrario, no se realiza ninguna acción. Todo el proceso se ejecuta de forma automática y segura, permitiendo un seguimiento eficaz sin intervención manual.
            </p>
        </div>

        <!-- Estado de integración -->
        <div class="flex justify-start items-center gap-1 mt-2" v-if="!props.referent.used">
            <img class="w-[20px] h-[20px]" src="/assets/icons/1.TH.WARNING.svg" />
            <span class="text-sm font-medium">Hasta que no se realice la integración, no se activarán y otorgarán los beneficios.</span>
        </div>
        <div class="flex justify-start items-center gap-1 mt-2" v-else> 
            <img class="w-[20px] h-[20px]" src="/assets/icons/TH.CHECK.svg" />
            <span class="text-sm font-medium">Integración realizada</span>
        </div>

        <!-- Bloque de código con botón de copiar -->
        <div class="code-container p-4 mt-4 mb-2">
            <h3 class="text-sm font-medium mb-2">Código de integración:</h3>
            <pre ref="codeBlock">
&lt;script&gt;
(function(){function g(n){var v=new URLSearchParams(location.search).get(n);
if(!v){var h=location.hash||"",i=h.indexOf("?");if(i>-1)v=new URLSearchParams(h.substring(i+1)).get(n);}
return v}function c(){var v=g("code");if(v)document.cookie="r_code="+v+";path=/";else
{var m=document.cookie.match(/(^| )r_code=([^;]+)/);v=m?m[2]:null}return v}var code=c()||null,hotel="{{ props.referent.hotel_id }}",
w=encodeURIComponent(location.href),s=document.createElement("script");s.
src="{{REFERENT_URL}}?code="+code+"&hotel="+hotel+"&webUrl="+w;document.head.appendChild(s)})();
&lt;/script&gt;
            </pre>

            <!-- Botón de copiar -->
            <div class="flex justify-end mt-2 items-center gap-2">
                <img src="/assets/icons/1.TH.COPY.svg" alt="Copiar" class="w-4 h-4 cursor-pointer" @click="copyCode" />
                <button @click="copyCode" class="text-sm font-medium"> 
                    {{ copied ? "Copiado!" : "Copiar" }}
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const showDescription = ref(false)
const copied = ref(false)

const REFERENT_URL = process.env.VUE_APP_REFERENT_URL

const props = defineProps({
    referent: {
        type: Object,
        required: true
    }
})

const toggleDescription = () => {
    showDescription.value = !showDescription.value
}

// Función para copiar el código al portapapeles
const copyCode = () => {
    const codeElement = document.querySelector("pre")
    if (codeElement) {
        navigator.clipboard.writeText(codeElement.innerText.trim()).then(() => {
            copied.value = true
            setTimeout(() => copied.value = false, 1500) // Mensaje "Copiado!" por 1.5s
        })
    }
}
</script>

<style>
/* Contenedor del código */
.code-container {
    background: #F7F7F7;
    border-radius: 10px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
}

/* Bloque del código */
pre {
    background-color: #F7F7F7;
    color: #333;
    padding: 2px;
    border-radius: 3px;
    font-size: 12px;
    line-height: 1.2;
    white-space: pre-wrap;
    overflow-x: auto;
}
</style>
