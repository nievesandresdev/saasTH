// useGoogleMaps.js

import { ref, onUnmounted } from 'vue';

export function useGoogleMaps() {

  const apiKey = process.env.VUE_APP_KEY_GOOGE
  
  const map = ref(null);
  const marker = ref(null);

  const loadMapScript = () => {
    return new Promise((resolve, reject) => {
      if (window.google) {
        return resolve();
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  };

  const initMap = (mapElement, center) => {
    map.value = new google.maps.Map(mapElement, {
      zoom: 8,
      center: center,
      disableDefaultUI: true,
    });

    marker.value = new google.maps.Marker({
      position: center,
      map: map.value,
    });
  };

  onUnmounted(() => {
    if (map.value) {
      google.maps.event.clearInstanceListeners(map.value);
    }
  });

  return {
    map,
    marker,
    loadMapScript,
    initMap,
  };
}
