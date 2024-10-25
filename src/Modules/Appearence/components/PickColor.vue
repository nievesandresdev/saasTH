<template>
    <input
        ref="colorInputRef"
        v-model="codesColor.codHex"
        type="color"
        id="colorPicker"
        class="color-input invisible"
        @input="handleColor"
    />
    <div class="flex">
        <div 
            class="color-display" 
            :style="{ backgroundColor: codesColor.codHex }" 
            @click="openColorPicker"
        />
        <div class="px-4 py-2 flex space-x-4">
            <div class="space-y-2">
                <h6 class="text-sm font-medium">Código Hexadecimal</h6>
                <input
                    v-model="codesColor.codHex"
                    type="text"
                    @click="openColorPicker"
                    class="border-[#333] rounded-[6px] h-[40px] border px-[12px] py-[16px] text-sm font-medium leading-[19.6px]"
                >
            </div>
            <div class="">
                <h6 class="text-sm font-medium mb-2">Código RGB</h6>
                <div class="flex space-x-2">
                    <input
                        v-model="rgbValue.r"
                        type="text"
                        @click="openColorPicker"
                        class="border-[#333] rounded-[6px] w-[38px] h-[40px] border text-center text-sm font-semibold leading-[19.6px]"
                    >
                    <input
                        v-model="rgbValue.g"
                        type="text"
                        @click="openColorPicker"
                        class="border-[#333] rounded-[6px] w-[38px] h-[40px] border text-center text-sm font-semibold leading-[19.6px]"
                    >
                    <input
                        v-model="rgbValue.b"
                        type="text"
                        @click="openColorPicker"
                        class="border-[#333] rounded-[6px] w-[38px] h-[40px] border text-center text-sm font-semibold leading-[19.6px]"
                    >
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>

    import { ref, onMounted, toRefs, reactive, computed, watch } from 'vue';

    const emits = defineEmits(['change:color']);

    const props = defineProps({
       codesColor: {
           default: () => ({
                codHex: '#333333',
                codRbg: 'rgb(51, 51, 51)',
           }),
       }
    });

    const codesColor = reactive({
        codHex: '#333333',
        codRbg: 'rgb(51, 51, 51)',
    });
    const colorInputRef = ref(null);

    const hexValue = computed(() => {
      return codesColor.codHex;
    });
    const rgbValue = computed(() => {
      return convertHexToRgb(codesColor.codHex);
    });

    watch(()=> props.codesColor, function(value) {
        Object.assign(codesColor,value);
    });

    function  convertHexToRgb(hex) {
        let codeHex = hex.replace('#', '');
        const bigint = parseInt(codeHex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
    }

    function loadColor () {
        Object.assign(codesColor, props.codesColor);
    }

    function openColorPicker() {
      colorInputRef.value.click();
    }

    function handleColor () {
        codesColor.codRbg = `rgb(${rgbValue.value.r},${rgbValue.value.g},${rgbValue.value.b})`;
        emits('change:color', codesColor);
    }

</script>

<style lang="scss" scoped>
    .color-display {
        width: 80px;
        height: 80px;
        border: 1px solid #BFBFBF;
        border-radius: 10px;
        outline: none;
        cursor: pointer;
    }
    .color-input {
    }
</style>