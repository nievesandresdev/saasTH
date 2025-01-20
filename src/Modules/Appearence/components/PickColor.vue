<template>
    <input
        ref="colorInputRef"
        v-model="codesColorForm.codHex"
        type="color"
        id="colorPicker"
        class="color-input invisible"
        @input="handleColor"
    />
    <div class="flex">
        <div 
            class="color-display" 
            :style="{ backgroundColor: codesColorForm.codHex }" 
            @click="openColorPicker"
        />
        <div class="px-4 py-2 flex space-x-4">
            <div class="space-y-2">
                <h6 class="text-sm font-medium">Código Hexadecimal</h6>
                <input
                    v-model="codesColorForm.codHex"
                    type="text"
                    @click="openColorPicker"
                    class="border-[#333] rounded-[6px] h-[40px] border px-[12px] py-[16px] text-sm font-medium leading-[19.6px] htext-black-100"
                >
            </div>
            <div class="">
                <h6 class="text-sm font-medium mb-2">Código RGB</h6>
                <div class="flex space-x-2">
                    <input
                        v-model="rgbValue.r"
                        type="text"
                        @click="openColorPicker"
                        class="border-[#333] rounded-[6px] w-[38px] h-[40px] border text-center text-sm font-semibold leading-[19.6px] htext-black-100"
                    >
                    <input
                        v-model="rgbValue.g"
                        type="text"
                        @click="openColorPicker"
                        class="border-[#333] rounded-[6px] w-[38px] h-[40px] border text-center text-sm font-semibold leading-[19.6px] htext-black-100"
                    >
                    <input
                        v-model="rgbValue.b"
                        type="text"
                        @click="openColorPicker"
                        class="border-[#333] rounded-[6px] w-[38px] h-[40px] border text-center text-sm font-semibold leading-[19.6px] htext-black-100"
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
           type: Object,
           default: () => ({
                codHex: '#333333',
                codRbg: 'rgb(51, 51, 51)',
           }),
       }
    });

    const codesColorForm = reactive({
        codHex: '#333333',
        codRbg: 'rgb(51, 51, 51)',
    });
    const colorInputRef = ref(null);

    const hexValue = computed(() => {
      return codesColorForm.codHex;
    });
    const rgbValue = computed(() => {
      return convertHexToRgb(codesColorForm.codHex);
    });

    onMounted(() => {
        loadColor();
    });

    watch(()=> props.codesColor, function(value) {
        Object.assign(codesColorForm,value);
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
        Object.assign(codesColorForm, props.codesColor);
    }

    function openColorPicker() {
      colorInputRef.value.click();
    }

    function handleColor () {
        codesColorForm.codRbg = `rgb(${rgbValue.value.r},${rgbValue.value.g},${rgbValue.value.b})`;
        emits('change:color', codesColorForm);
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
        position: absolute;
    }
</style>