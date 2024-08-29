<template>
    <div class="bg-white flex flex-col border border-[#BFBFBF] rounded-[10px] p-4 mt-7">
        <div class="grid grid-cols-3 gap-4 mt-4">
            <div class="flex flex-col items-start">
                <span :class="subscribed ? 'htext-green-800 text-[10px] font-semibold mb-2 leading-[130%]' : 'text-xs font-semibold mb-2 text-normal-color'">
                    {{ subscribed ? 'REPUTACIÓN ONLINE' : 'Contrata REPUTACIÓN ONLINE' }}
                </span>
                <div :class="subscribed ? '' : 'grayscale opacity-50'">
                    <span class="font-semibold text-sm flex gap-4">
                        Feedback de tus huéspedes
                    </span>
                </div>
            </div>
            <div class="flex items-end" :class="subscribed ? '' : 'grayscale opacity-50'">
                <div class="flex gap-4">
                    <span class="font-semibold text-sm flex gap-4">
                        Integraciones
                    </span>
                </div>
            </div>
            <div class="flex items-end" :class="subscribed ? '' : 'grayscale opacity-50'">
                <div class="flex gap-4">
                    <span class="font-semibold text-sm flex gap-4">
                        Promedio de tu hotel
                    </span>
                </div>
            </div>
        </div>
        <!-- contenido -->
        <div class="grid grid-cols-3 gap-4 mt-4">
            <div class="row-span-2 flex gap-6 flex-col" :class="subscribed ? '' : 'grayscale opacity-50'">
                <div class="bg-white border border-[#BFBFBF] rounded-[10px] overflow-hidden">
                    <div class="py-2 px-3 flex items-center">
                        <span class="text-xs font-semibold">STAY</span>
                    </div>
                    <!--caritas STAY -->
                    <div class="grid grid-cols-5">
                        <div 
                            v-for="feeling in feelingsInStay" 
                            :key="feeling.name" 
                            class="w-full p-2 flex flex-col items-center"
                            :class="subscribed && feeling.percentage.isMax ? 'rounded-bottom-border' : ''"
                        >
                            <img :src="subscribed ? `/assets/icons/reviews/${feeling.name}.svg` : `/assets/icons/reviews/VOID.svg`" class="w-8 h-8">
                            <span class="text-sm font-medium">{{feeling.percentage.percentage ?? '--'  }}%</span>
                        </div>
                    </div>
                </div>
                <div class="bg-white border border-[#BFBFBF] rounded-[10px] overflow-hidden">
                    <div class="py-2 px-3 flex items-center">
                        <span class="text-xs font-semibold">POST-STAY</span>
                    </div>
                    <!--caritas POST-STAY -->
                    <div class="grid grid-cols-5">
                        <div 
                            v-for="feeling in feelingsPostStay" 
                            :key="feeling.name" 
                            class="w-full p-2 flex flex-col items-center"
                            :class="subscribed && feeling.percentage.isMax ? 'rounded-bottom-border' : ''"
                        >
                            <img :src="subscribed ? `/assets/icons/reviews/${feeling.name}.svg` : `/assets/icons/reviews/VOID.svg`" class="w-8 h-8">
                            <span class="text-sm font-medium">{{feeling.percentage.percentage ?? '--'  }}%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white border border-[#BFBFBF] rounded-[10px] overflow-hidden row-span-2" :class="subscribed ? '' : 'grayscale opacity-50'">
                <div class="py-6 px-4 flex flex-col gap-4">
                    <!-- Booking -->
                    <div class="flex items-center">
                        <div class="flex gap-1 items-center w-[108px]">
                            <img src="/assets/icons/otas/Booking.svg" alt="Booking">
                            <span class="text-sm font-medium">Booking</span>
                        </div>
                        <template v-if="bookingReview?.data_review">
                            <div class="ml-auto">
                                <span class="text-sm font-medium">{{  bookingReview.data_review.reviews_rating }}</span>
                                <span class="text-[10px] font-medium">/10</span>
                            </div>
                            <div class="text-[10px] ml-auto">
                                <p class="font-semibold leading-[90%]">{{  bookingReview.data_review.reviews_count }}</p>
                                <p class="font-medium leading-[90%]">reseñas</p>
                            </div>
                        </template>
                        <AddLinkOtaButton v-else/>
                    </div>
                    <!-- Expedia -->
                    <div class="flex items-center">
                        <div class="flex gap-1 items-center w-[108px]">
                            <img src="/assets/icons/otas/Expedia.svg" alt="Expedia">
                            <span class="text-sm font-medium">Expedia</span>
                        </div>
                        <template v-if="bookingReview?.data_review">
                            <div class="ml-auto">
                                <span class="text-sm font-medium">{{  expediaReview.data_review.reviews_rating }}</span>
                                <span class="text-[10px] font-medium">/10</span>
                            </div>
                            <div class="text-[10px] ml-auto">
                                <p class="font-semibold leading-[90%]">{{  expediaReview.data_review.reviews_count }}</p>
                                <p class="font-medium leading-[90%]">reseñas</p>
                            </div>
                        </template>
                        <AddLinkOtaButton v-else/>
                    </div>
                    <!-- Google -->
                    <div class="flex items-center">
                        <div class="flex gap-1 items-center w-[108px]">
                            <img src="/assets/icons/otas/Google.svg" alt="Google">
                            <span class="text-sm font-medium">Google</span>
                        </div>
                        <template v-if="googleReview?.data_review">
                            <div class="ml-auto">
                                <span class="text-sm font-medium">{{  googleReview.data_review.reviews_rating }}</span>
                                <span class="text-[10px] font-medium">/5</span>
                            </div>
                            <div class="text-[10px] ml-auto">
                                <p class="font-semibold leading-[90%]">{{  googleReview.data_review.reviews_count }}</p>
                                <p class="font-medium leading-[90%]">reseñas</p>
                            </div>
                        </template>
                        <AddLinkOtaButton v-else/>
                    </div>
                    <!-- Tripadvisor -->
                    <div class="flex items-center">
                        <div class="flex gap-1 items-center w-[108px]">
                            <img src="/assets/icons/otas/Tripadvisor.svg" alt="Tripadvisor">
                            <span class="text-sm font-medium">Tripadvisor</span>
                        </div>
                        <template v-if="tripadvisorReview?.data_review">
                            <div class="ml-auto">
                                <span class="text-sm font-medium">{{  tripadvisorReview.data_review.reviews_rating }}</span>
                                <span class="text-[10px] font-medium">/5</span>
                            </div>
                            <div class="text-[10px] ml-auto">
                                <p class="font-semibold leading-[90%]">{{  tripadvisorReview.data_review.reviews_count }}</p>
                                <p class="font-medium leading-[90%]">reseñas</p>
                            </div>
                        </template>
                        <AddLinkOtaButton v-else/>
                    </div>
                    <!-- AirBnb -->
                    <div class="flex items-center">
                        <div class="flex gap-1 items-center w-[108px]">
                            <img src="/assets/icons/otas/Airbnb.svg" alt="Airbnb">
                            <span class="text-sm font-medium">Airbnb</span>
                        </div>
                        <template v-if="airbnbReview?.data_review">
                            <div class="ml-auto">
                                <span class="text-sm font-medium">{{  airbnbReview.data_review.reviews_rating }}</span>
                                <span class="text-[10px] font-medium">/5</span>
                            </div>
                            <div class="text-[10px] ml-auto">
                                <p class="font-semibold leading-[90%]">{{  airbnbReview.data_review.reviews_count }}</p>
                                <p class="font-medium leading-[90%]">reseñas</p>
                            </div>
                        </template>
                        <AddLinkOtaButton v-else/>
                    </div>
                </div>
            </div>
            <div class="bg-white border border-[#BFBFBF] rounded-[10px] overflow-hidden row-span-2" :class="subscribed ? '' : 'grayscale opacity-50'">
                <div class="bg-[#D9F2E9] py-2 px-3 flex items-center gap-3">
                    <span class="text-sm font-semibold">TheHoster REVIEW INDEX™</span>
                </div>
                <div class="p-4 flex gap-4 items-center">
                    <CircleProgress
                        :size="120"
                        :percent="subscribed ? average : 100"
                        border-width="22"
                        border-bg-width="22"
                        :linecap="'line'"
                        :fill-color="'#34A98F'"
                        :empty-color="'#ECF9F5'"
                        class="transformCircle"
                    />
                    <div class="flex flex-col gap-2 w-1/2">
                        <span class="text-sm">Promedio de todas las OTAs vinculadas a tu hotel</span>
                        <div class="flex items-center">
                            <span class="text-2xl font-semibold">{{ subscribed && average != 0 ? average.toFixed(1) : '-.-' }}</span>
                            <span class="text-[23.642px] font-semibold">/</span>
                            <span class="text-base font-semibold flex mt-1">100</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import { dataFeedback, dataReviewOTA } from '@/api/services/dashboard/dashboard.services';
import AddLinkOtaButton from './AddLinkOtaButton.vue'
import { useToastAlert } from '@/composables/useToastAlert';
import { useUserStore } from '@/stores/modules/users/users'
import CircleProgress from 'vue3-circle-progress';
import "vue3-circle-progress/dist/circle-progress.css";

const toast = useToastAlert();
const user = useUserStore();

const feelingsInStay = ref([
    { name: 'VERYGOOD', percentage: '--' },
    { name: 'GOOD', percentage: '--' },
    { name: 'NORMAL', percentage: '--' },
    { name: 'WRONG', percentage: '--' },
    { name: 'VERYWRONG', percentage: '--' },
]);

const feelingsPostStay = ref([
    { name: 'VERYGOOD', percentage: '--' },
    { name: 'GOOD', percentage: '--' },
    { name: 'NORMAL', percentage: '--' },
    { name: 'WRONG', percentage: '--' },
    { name: 'VERYWRONG', percentage: '--' },
]);

const defaultReview = {
    data_review: {
        reviews_rating: '--',
        reviews_count: null,
    }
};

const tripadvisorReview = ref({ ota: 'TRIPADVISOR' });
const expediaReview = ref({ ota: 'EXPEDIA' });
const bookingReview = ref({ ota: 'BOOKING' });
const googleReview = ref({ ota: 'GOOGLE' });
const airbnbReview = ref({ ota: 'AIRBNB' });

const average = ref(0);
const subscribed = ref(true); // Variable para determinar la suscripción

onMounted(async () => {
    //await handleSubscription();
    if(subscribed.value) {
        await handleDataFeedback();
        await handleDataOta();
    }
    
    
});

const handleSubscription = async() => {
    const response = await user.$getSubscriptionStatus();
    if (response.ok) {
        //console.log(response.data.status);
        subscribed.value = response.data.status.subscribed;
    } else {
        toast.errorToast(response.data.message, 'top-right');
    }
    
};

const handleDataFeedback = async () => {
    const response = await dataFeedback();
    if (response.ok) {
        const inStay = response.data.inStay;
        const postStay = response.data.postStay;

        feelingsInStay.value = feelingsInStay.value.map(feeling => ({
            name: feeling.name,
            percentage: inStay[feeling.name] == 0 ? '--' : inStay[feeling.name],
        }));

        feelingsPostStay.value = feelingsPostStay.value.map(feeling => ({
            name: feeling.name,
            percentage: postStay[feeling.name] == 0 ? '--' : postStay[feeling.name],
        }));
    } else {
        toast.errorToast(response.data.message, 'top-right');
    }
};

const handleDataOta = async () => {
    const response = await dataReviewOTA();
    console.log('response',response)

    if (response.ok) {
        let totalRating = 0;
        let count = 0;
        const reviews = response.data.summaryReviews || [];
        reviews.forEach(review => {
            switch (review.ota) {
                case 'TRIPADVISOR':
                    tripadvisorReview.value = review;
                    break;
                case 'EXPEDIA':
                    expediaReview.value = review;
                    break;
                case 'BOOKING':
                    bookingReview.value = review;
                    break;
                case 'GOOGLE':
                    googleReview.value = review;
                    break;
                default:
                    break;
            }

            if (review.data_review && review.data_review.reviews_rating !== '--') {
                totalRating += parseFloat(review.data_review.reviews_rating);
                count++;
            }

            average.value = count > 0 ? (totalRating / count) * 10 : 0;
        });
        
    } else {
        toast.errorToast(response.data.message, 'top-right');
        average.value = 0; // Ensure average is 0 if there was an error
    }
};
</script>

<style scoped>
.text-normal-color {
    color: #0B6357;
}

.rounded-bottom-border {
    position: relative;
}

.rounded-bottom-border::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 35px;
    height: 7px;
    background-color: #0B6357;
    border-radius: 10px 10px 0 0;
}

.transformCircle {
    transform: rotate(150deg);
}
</style>
