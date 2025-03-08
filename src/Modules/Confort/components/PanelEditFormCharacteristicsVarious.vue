<template>
    <div class="mt-4">
        <div class="p-[12px] card flex justify-between items-center">
            <div class="space-x-2 flex">
                <button>
                    <img class="w-6 h-6" src="/assets/icons/TH.GRAD.svg" alt="grad">
                </button>
                <div class="card__img">
                    <img class="rounded-[5.455px]" src="https://thehosterappbucket.s3.eu-south-2.amazonaws.com/test/storage/gallery/168895d518de9a4a6c2bbb61cad6706ae00eeece14a1a744a13296cdc96dbace.jpg" alt="">
                </div>
                <div class="">
                    <h5 class="text-[12px] font-bold leading-[150%]">Masaje facial</h5>
                    <span class="text-[12px] font-medium">22,00€</span>
                </div>
            </div>
            <div class="space-x-4">
                <button>
                    <img
                        src="/assets/icons/1.TH.EDIT.OUTLINED.svg"
                        class="size-6"
                        alt=""
                    >
                </button>
                <button>
                    <img
                        src="/assets/icons/1.TH.DELETE.OUTLINE.svg"
                        class="size-6"
                        alt=""
                    >
                </button>
            </div>
        </div>
    </div>
    <div class="flex justify-end ">
        <button
            class="text-[12px] font-medium hbtn-primary py-[12px] px-[8px] flex items-center leading-none"
            @click="openPanelEditSubservice('ADD')"
        >
            <img
                src="/assets/icons/1.TH.PLUS.svg"
                class="size-4  mr-2 inline-block"
            >
            Añadir
        </button>
    </div>
</template>

<script setup>
import { inject } from 'vue';

const form = inject('form');

// COMPOSABLES
import { useEventBus } from '@/composables/eventBus';
const { emitEvent } = useEventBus();

function openPanelEditSubservice (typeAction, subservice = null) {
    let payload = {
        action: typeAction,
        serviceId: form.id,
        subservice
    }
    emitEvent('open-panel-edit-subservice', payload);
}

</script>

<style lang="scss">
    .card {
        border-radius: 6px;
        border: 1px solid #BFBFBF;
        background: #FFF;
    }
    .card__img {
        background-size: cover;
        width: 60px;
        height: 40px;
        border-radius: 5.455px;
    }
</style>
