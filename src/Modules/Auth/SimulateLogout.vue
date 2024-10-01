<template>
    <LoadPage />
</template>
<script setup>
import { onMounted } from 'vue';
import LoadPage from '@/shared/LoadPage.vue';
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth/login'

const authStore = useAuthStore()
const router = useRouter()

onMounted(async()=>{
    await authStore.logout()
    router.push('/login')
})

</script>