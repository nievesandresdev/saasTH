<template>
    <div class="bg-white flex flex-col border border-[#BFBFBF] rounded-[10px] px-4 py-6 mt-6">
        <div class="grid grid-cols-3 gap-4">
            <div class="flex flex-col items-start">
                <span :class="subscribed ? 'htext-green-800 text-[10px] font-semibold mb-2 leading-[130%]' : 'text-xs font-semibold mb-2 text-normal-color'">
                    {{ subscribed ? 'REPUTACIÓN ONLINE' : 'Contrata REPUTACIÓN ONLINE' }}
                </span>
                <div :class="subscribed ? '' : 'grayscale opacity-50'">
                    <span class="font-semibold text-sm">
                        Feedback de tus huéspedes
                    </span>
                </div>
            </div>
            <div class="flex items-end" :class="subscribed ? '' : 'grayscale opacity-50'">
                <div class="flex gap-4">
                    <span class="font-semibold text-sm">
                        Integraciones
                    </span>
                </div>
            </div>
            <div class="flex items-end" :class="subscribed ? '' : 'grayscale opacity-50'">
                <div class="flex gap-4">
                    <span class="font-semibold text-sm">
                        Promedio de tu hotel
                    </span>
                </div>
            </div>
        </div>
        <!-- contenido -->
        <div class="grid grid-cols-3 gap-4 mt-4">
            <div class="row-span-2 flex gap-6 flex-col" :class="subscribed ? '' : 'grayscale opacity-50'">
                <div class="px-4 pt-2 bg-white border border-[#BFBFBF] rounded-[10px] overflow-hidden">
                    <p class="text-xs font-semibold leading-[130%]">STAY</p>
                    <!--caritas STAY -->
                    <div class="flex justify-between mt-[13px]">
                        <div 
                            v-for="feeling in feelingsInStay" 
                            :key="feeling.name" 
                            class="w-[35px]"
                        >
                            <img :src="subscribed ? `/assets/icons/reviews/${feeling.name}.svg` : `/assets/icons/reviews/VOID.svg`" class="w-6 h-6 mx-auto">
                            <p class="text-sm font-medium text-center leading-[140%] mt-2">{{feeling.percentage.percentage ?? '--'  }}%</p>
                            <div class="w-full h-[7px] mt-2" v-if="subscribed && feeling.percentage.isMax">
                                <div class="w-full h-full rounded-t-[10px] hbg-green-800"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-4 pt-2 bg-white border border-[#BFBFBF] rounded-[10px] overflow-hidden">
                    <p class="text-xs font-semibold leading-[130%]">POST-STAY</p>
                    <!--caritas POST-STAY -->
                    <div class="flex justify-between mt-[13px]">
                        <div 
                            v-for="feeling in feelingsPostStay" 
                            :key="feeling.name" 
                            class="w-[35px]"
                        >
                            <img :src="subscribed ? `/assets/icons/reviews/${feeling.name}.svg` : `/assets/icons/reviews/VOID.svg`" class="w-6 h-6 mx-auto">
                            <p class="text-sm font-medium text-center leading-[140%] mt-2">{{feeling.percentage.percentage ?? '--'  }}%</p>
                            <div class="w-full h-[7px] mt-2" v-if="subscribed && feeling.percentage.isMax">
                                <div class="w-full h-full rounded-t-[10px] hbg-green-800"></div>
                            </div>
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
                <div class="bg-[#D9F2E9] py-2 px-4">
                    <p class="text-xs font-semibold leading-[130%]">TheHoster REVIEW INDEX™</p>
                </div>
                <div class="p-4 3xl:p-8 flex gap-4 items-center h-[86.5%]">
                    <CircleProgress
                        :size="98"
                        :percent="subscribed ? average : 100"
                        border-width="22"
                        border-bg-width="14"
                        :linecap="'line'"
                        :fill-color="'#34A98F'"
                        :empty-color="'#ECF9F5'"
                        class="transformCircle"
                    />
                    <div class="flex flex-col gap-3 w-[118px] 3xl:w-[164px]">
                        <span class="text-xs leading-[normal]">Promedio de todas las OTAs vinculadas a tu hotel</span>
                        <div class="flex items-center">
                            <span class="text-[24px] font-semibold leading-[90%]">{{ subscribed && average != 0 ? average.toFixed(1) : '-.-' }}</span>
                            <span class="text-[24px] font-semibold leading-[90%]">/</span>
                            <span class="text-base font-semibold mt-auto leading-[90%]">100</span>
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
const screenWidth = ref(screen.width);
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

/* const handleDataOta = async () => {
    const response = await dataReviewOTA();
    console.log('response',response)

    if (response.ok) {
        let totalRating = 0;
        let count = 0;
        const reviews = response.data.summaryReviews || [];
        reviews.forEach(review => {
            // Default data review values in case data_review is missing
            const defaultDataReview = { reviews_rating: '--', reviews_count: '--' };
            const dataReview = review.data_review || defaultDataReview;

            // Assign data based on OTA type
            switch (review.ota) {
                case 'TRIPADVISOR':
                    tripadvisorReview.value = { ...review, data_review: dataReview };
                    break;
                case 'EXPEDIA':
                    expediaReview.value = { ...review, data_review: dataReview };
                    break;
                case 'BOOKING':
                    bookingReview.value = { ...review, data_review: dataReview };
                    break;
                case 'GOOGLE':
                    googleReview.value = { ...review, data_review: dataReview };
                    break;
                case 'AIRBNB':
                    airbnbReview.value = { ...review, data_review: dataReview };
                    break;
                default:
                    break;
            }

            // Only calculate ratings if data_review has valid rating data
            if (dataReview.reviews_rating !== '--') {
                totalRating += parseFloat(dataReview.reviews_rating);
                count++;
            }
        });

        // Calculate the average rating if count is greater than 0
        average.value = count > 0 ? (totalRating / count) * 10 : 0;
    } else {
        toast.errorToast(response.data.message, 'top-right');
        average.value = 0; // Ensure average is 0 if there was an error
    }
}; */

const handleDataOta = async () => {
    const response = await dataReviewOTA();
    console.log('test response', response);

    if (response.ok) {
        let totalRating = 0;
        let count = 0;
        const reviews = response.data.summaryReviews || [];
        reviews.forEach(review => {
            // Default data review values in case data_review is missing
            // const defaultDataReview = { reviews_rating: '--', reviews_count: '-' };
            const dataReview = { 
                reviews_rating: review.data_review?.reviews_rating ?? '--', 
                reviews_count: review.data_review?.reviews_count ?? '-', 
            };

            let rating = parseFloat(dataReview.reviews_rating ?? 0);
            
            // Assign data based on OTA type and scale ratings if necessary
            switch (review.ota) {
                case 'TRIPADVISOR':
                    tripadvisorReview.value = { ...review, data_review: dataReview };
                    rating = rating * 2; // Escalar de 5 a 10
                    break;
                case 'EXPEDIA':
                    expediaReview.value = { ...review, data_review: dataReview };
                    // Expedia está en escala de 10, no necesita ajuste
                    break;
                case 'BOOKING':
                    bookingReview.value = { ...review, data_review: dataReview };
                    // Booking está en escala de 10, no necesita ajuste
                    break;
                case 'GOOGLE':
                    googleReview.value = { ...review, data_review: dataReview };
                    rating = rating * 2; // Escalar de 5 a 10
                    break;
                case 'AIRBNB':
                    airbnbReview.value = { ...review, data_review: dataReview };
                    // Airbnb está en escala de 5, agregar ajuste si se usa
                    break;
                default:
                    break;
            }
            
            // Solo calcular las calificaciones si data_review tiene un rating válido
            if (dataReview.reviews_rating && dataReview.reviews_rating !== '--') {
                totalRating += rating;  // Añadir la calificación ajustada al total
                count++;
            }
        });

        // Calcular el promedio de calificación si el count es mayor que 0
        average.value = count > 0 ? (totalRating / count) * 10 : 0;
    } else {
        toast.errorToast(response.data.message, 'top-right');
        average.value = 0; // Asegurarse que el promedio sea 0 si hubo un error
    }
};


</script>

<style scoped>
.text-normal-color {
    color: #0B6357;
}

/* .rounded-bottom-border {
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
} */

.transformCircle {
    transform: rotate(150deg);
}
</style>
