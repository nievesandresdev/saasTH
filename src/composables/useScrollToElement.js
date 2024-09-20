// useScrollToElement.js
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default function useScrollToElement() {
    const route = useRoute();

    // Define el método scrollToElement para que pueda ser llamado manualmente
    const scrollToElement = (elementId) => {
        const targetElement = elementId ? document.querySelector(`${elementId}`) : document.querySelector(route.hash.toLowerCase());
        // console.log('targetElement',targetElement)
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Ejecuta automáticamente si hay un hash en la URL cuando el componente se monta
    onMounted(() => {
        if (route.hash) {
            setTimeout(() => scrollToElement(), 100); // Utiliza un retraso para asegurar que el DOM esté listo
        }
    });

    // Exponer scrollToElement para que pueda ser llamado externamente
    return { scrollToElement };
}
