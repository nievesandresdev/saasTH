<template>
    <div 
        id="main-container"
         class="h-screen flex"
    >
        <!-- hole for main side -->
        <div class="w-16 flex-shrink-0 bg-red-700 h-full"></div>
        <!-- hole for side section -->
        <div class="w-[236px] flex-shrink-0 bg-red-700 h-full"></div>
        <!-- main side -->
        <aside class="h-screen flex-shrink-0 bg-red-100 fixed top-0 left-0 z-[500] flex">
            <div class="group px-3 py-2">
                <div class="flex flex-shrink-0 p-2">
                    <img class="w-6 h-8" src="/assets/icons/1.TH.logo.svg" alt="">
                    <div class="w-0 group-hover:w-[188px] overflow-hidden group-hover:pl-4 flex items-center">
                        <p class="text-lg ml-2">hotel michos</p>
                        <img class="w-3 h-3 ml-auto" src="/assets/icons/1.TH.I.dropdown.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="w-[236px] flex-shrink-0">
                <SettingsLayout />
            </div>
        </aside>
        <div id="main-content" class="overflow-y-auto bg-gray-500">
            <router-view></router-view>
        </div>
    </div>
  </template>
  <script setup>
  import SettingsLayout from '@/layout/Settings/SettingsLayout.vue'
  
  </script>
  