<template>
    <div class="space-y-6">
        <div class="flex items-center">
            <BaseSwichInput
                v-model="form.always_open"
                id="toggle-always-open"
                class="mr-4"
            />
                 <!-- @change:value="changeAlwaysopen()" -->
            <label class="text-sm font-medium">Abierto todos los días 24hs</label>
        </div>
        <div class="space-y-6" :class="{'opacity-25': form.always_open}">
            <div
                v-for="(schedule, indexSchedule) in form.schedules"
                class="flex items-center justify-start space-x-2"
            >
                <div class="w-[96px] flex items-center" >
                    <Checkbox v-model="schedule.active" />
                    <span class="text-sm font-medium ml-2">{{schedule.name}}</span>
                </div>
                <div class="flex items-center space-x-1">
                    <BaseTimeField
                        v-model="schedule.times[0].start"
                        :id="`time-${indexSchedule}-1`"
                        :custom-classes="{'h-[32px] w-[60px]': true}"
                    />
                    <span class="text-sm font-medium">a</span>
                    <BaseTimeField
                        v-model="schedule.times[0].end"
                        :id="`time-${indexSchedule}-2`"
                        :custom-classes="{'h-[32px] w-[60px] text-sm': true}"
                    />
                </div>
                <button
                    v-if="schedule.times.length < 2"
                    @click="addTimeInSchedule(schedule)"
                >
                    <img
                        src="/assets/icons/1.TH.PLUS.CIRCLE.svg"
                        alt="icon plus"
                        class="inline w-[20px] h-[20px]"
                    />
                </button>
                <div v-if="schedule.times.length > 1" class="flex items-center space-x-1">
                    <BaseTimeField
                        v-model="schedule.times[1].start"
                        :id="`time-${indexSchedule}-1`"
                        :custom-classes="{'h-[32px] w-[60px]': true}"
                    />
                    <span class="text-sm font-medium">a</span>
                    <BaseTimeField
                        v-model="schedule.times[1].end"
                        :id="`time-${indexSchedule}-2`"
                        :custom-classes="{'h-[32px] w-[60px] text-sm': true}"
                    />
                </div>
                <button
                    v-if="schedule.times.length > 1"
                    @click="deleteTime(schedule)"
                >
                    <img
                        src="/assets/icons/1.TH.DELETE.SHAPE.svg"
                        alt="icon delete"
                        class="inline w-[20px] h-[20px]"
                    />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, provide, computed, inject, watch } from 'vue';

// COMPONENTS
import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";
import BaseTimeField from "@/components/Forms/BaseTimeField.vue";
import Checkbox from "@/components/Forms/Checkbox.vue";


// PROVIDE
const form = inject('form');
const itemSelected = inject('itemSelected');
const time = ref(null);

// WATCH
watch(()=>form.always_open, (newValue, oldValue) => {
    if (!oldValue && newValue) {
        form.schedules = form.schedules.map(day => ({
            name: day.name,
            active: true,
            times: [
                { start: '00:00', end: '23:59' }
            ]
        }));
    }
})

// FUNCTIONS
function addTimeInSchedule (schedule) {
    if (schedule.times.length > 1) return;
    schedule.times.push({start: '00:00', end: '23:00'});
}
function deleteTime (schedule) {
     schedule.times.splice(1, 1)
}

// function changeAlwaysopen () {
//     console.log(form.always_open, 'form.always_open')
//     if (form.always_open) {
//         form.schedules = {...schedulesDefault}
//     }
// }

</script>