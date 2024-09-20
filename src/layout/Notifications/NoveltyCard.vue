<template>
    <div class="py-6 border-b hborder-gray-400">
      <p class="text-sm leading-[140%] htext-gray-500 text-right">
        {{$formatTimestampDate(data.created_at, 'dd/MM/yyyy')}}
      </p>
      <h3 class="text-sm font-medium leading-[140%] mt-2">{{ data.title }}</h3>
      <h5 class="text-sm font-medium leading-[140%] mt-2 htext-gray-500">{{ data.subtitle }}</h5>
      <p class="mt-4 text-sm font-medium leading-[140%]">
        {{ isExpanded ? data.description : truncatedDescription }}
      </p>
      <button v-if="showMoreButton" @click="toggleDescription" class="mt-2 text-sm font-medium leading-[110%] underline text-[#333] hover:text-[#000]">
        {{ isExpanded ? 'Mostrar menos' : 'Mostrar más' }}
      </button>
      <button v-if="data.link" @click="openLink" class="mt-4 text-sm font-semibold leading-[120%] flex items-center ghost-green-600">
        {{ data.link_title }}
        <img class="ml-2 w-5 h-5 ghost-green-600-icon" src="/assets/icons/1.TH.NEXT.svg" alt="" />
      </button>
      <div class="mt-6">
        <EmojiFeedbackInput  @updateFeedback="updateFeedback"/>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, provide, reactive, onMounted } from 'vue'
  import EmojiFeedbackInput from '@/components/EmojiFeedbackInput.vue'
  import { useNotifyUserStore } from '@/stores/modules/users/notifiyUser';
  //composable
  import { useToastAlert } from '@/composables/useToastAlert'

  const notifyUserStore = useNotifyUserStore();
  const toast = useToastAlert();
  const props = defineProps({
    data: Object
  })
  
  const form = reactive({
    type: null
  })
  const isExpanded = ref(false)
  const translateVote = {
    'happy' : 'GOOD',
    'normal' : 'NORMAL',
    'sad' : 'WRONG',
  };
  const translateVoteToSave = {
    'GOOD' : 'happy',
    'NORMAL' : 'normal',
    'WRONG' : 'sad',
  };

  onMounted(() => {
    form.type = translateVote[props.data?.interaction?.vote] ?? null;
  })
  
  const updateFeedback = async () => {
    let face = translateVoteToSave[form.type];
    await notifyUserStore.$vote(props.data?.id, face);
    toast.warningToast('Actualizado','top-right');
  }

  const toggleDescription = () => {
    isExpanded.value = !isExpanded.value
  }
  
  const openLink = () => {
    if (props.data.link) {
      window.open(props.data.link, '_blank')
    }
  }
  
  const truncatedDescription = computed(() => {
    return props.data.description.length > 240 
      ? props.data.description.slice(0, 240) + '...'
      : props.data.description
  })
  
  const showMoreButton = computed(() => {
    return props.data.description.length > 240
  })
  provide('form', form)
  </script>
  