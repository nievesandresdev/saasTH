<template>
    <div
        class="aside-stay-card border-t border-b p-4 cursor-pointer hover-gray-100 relative"
    >
        <div class="flex items-center">
            <div :class="loadClasses" class="w-5 h-5"></div>
            <p :class="loadClasses" class="text-xs font-semibold leading-[130%] ml-1">XX/XX - XX/XX</p>
            <span
                :class="loadClasses"
                class="px-2 py-1 text-[10px] font-semibold leading-[130%] rounded-full ml-2">
                pre-stay
            </span>

            <div :class="loadClasses" class="ml-auto w-5 h-5"></div>
        </div>

        <div class="flex justify-between items-center mt-2">
            <div class="flex items-center">
                <div :class="loadClasses" class="w-10 h-6 rounded-[5px] object-cover"></div>
                <div class="bg-white rounded-[5px] relative px-[2px] left-[-2.5px]">
                    <div :class="loadClasses" class="w-10 h-6 rounded-[5px] object-cover"></div>
                </div>
            </div>

            <!-- iconos de notificacion -->
            <div class="flex items-center">
                <div :class="loadClasses" class="w-5 h-5"></div>
                <div :class="loadClasses" class="w-5 h-5 ml-2"></div>
            </div>
        </div>
    </div>
</template>
<script setup>
const loadClasses = 'hbg-gray-500 htext-gray-500 rounded animate-pulse';
</script>
