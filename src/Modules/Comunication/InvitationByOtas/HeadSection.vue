<template>
    <div class="px-6">
        <div class="flex items-center gap-2 pt-5 pb-[18px]">
            <!-- title -->
            <div class="flex items-center gap-2">
                <router-link to="/comunicaciones">
                    <img class="w-6 h-6" src="/assets/icons/1.TH.ARROW.LEFT.svg" alt="">
                </router-link>
                <h1 class="text-[24px] font-medium leading-[110%]">Invitación desde OTAs</h1>
                <BaseTooltipResponsive
                    size="l"
                    :top="30"
                    :left="0"
                >
                    <template #button>
                        <img class="w-5 h-5" src="/assets/icons/TH.INFO.GREEN.svg">
                    </template>
                    <template #content>
                        <p class="text-sm leading-[150%] font-normal">
                            -
                        </p>
                    </template>
                </BaseTooltipResponsive>
            </div>
        </div>
        <TabMenuContainer>
            <TabLink
                label="Booking"
                viewName="comunicationInvitationByBooking"
                :selected="route.name == 'comunicationInvitationByBooking'"
            />
            <TabLink
                label="Airbnb"
                viewName="comunicationInvitationByAirbnb"
                :selected="route.name == 'comunicationInvitationByAirbnb'"
            />
            <TabLink
                label="Expedia"
                viewName="comunicationInvitationByExpedia"
                :selected="route.name == 'comunicationInvitationByExpedia'"
            />
        </TabMenuContainer>
    </div>
</template>
<script setup>
import BaseTooltipResponsive from "@/components/BaseTooltipResponsive.vue";
import TabMenuContainer from '@/components/TabMenuWSlot.vue'
import TabLink from '@/components/TabMenuLink.vue'
import { useRoute } from 'vue-router'

const route = useRoute();
</script>