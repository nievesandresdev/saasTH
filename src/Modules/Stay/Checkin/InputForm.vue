<template>
    <div>
        <label class="text-sm font-medium leading-[140%] mb-[6px]" :class="{'opacity-25':disabled}">
            {{label}}
        </label>
        <div class="px-3 py-2 rounded-[6px] input-checkin h-10">
            <p class="text-sm font-medium leading-[140%]" v-if="!disabled">{{ content }}</p>
            <p class="text-sm italic leading-[140%] disabled-color-text" v-else>Campo desactivado</p>
        </div>
    </div>
</template>
<script setup>
defineProps({
    content:{
        type:String,
        default:null
    },
    label:{
        type:String,
        default:null
    },
    disabled:{
        type:Boolean,
        default:false
    },
})
</script>
<style>
.input-checkin{    
    border: 2px solid #bfbfbf80;
    background: #fafafa80;
}
.disabled-color-text{
    color: rgba(51, 51, 51, 0.50);
}
</style>