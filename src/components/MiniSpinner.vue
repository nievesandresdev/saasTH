<template>
    <!-- load page -->
    <div class="flex w-full justify-center">
        <svg class="spinner w-8 h-8" viewBox="0 0 50 50">
            <defs>
                <linearGradient id="spinnerGradient" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stop-color="#34A98F" stop-opacity="0.1" /> <!-- Verde suave para la punta que desaparece -->
                    <stop offset="60%" stop-color="#34A98F" stop-opacity="0.3" />
                    <stop offset="100%" stop-color="#34A98F" stop-opacity="1" />
                </linearGradient>
            </defs>
            <circle ref="circle" cx="25" cy="25" r="20" fill="none" stroke="url(#spinnerGradient)" stroke-width="2.5" stroke-dasharray="125.6" stroke-dashoffset="125.6"></circle>
        </svg>
    </div>
</template>
<style scoped>
/* CSS */
.spinner {
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}

circle {
  stroke-dasharray: 125.6;
  stroke-dashoffset: 125.6;
  animation: dash 1.5s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

</style>