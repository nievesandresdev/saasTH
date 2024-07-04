<template>
    <div class="space-y-2">
        <label class="text-sm font-medium">Ubicación</label>
        <div class="relative">
        <img
            class="w-6 h-6 absolute top-2 left-3.5"
            src="/assets/icons/lupa.svg"
            alt
        />
        <input
            v-model="form.address"
            type="text"
            id="metting_point"
            ref="metting_point"
            class="h-10 rounded-[6px] text-sm font-medium w-full pl-11 hinput hinput-green"
            :placeholder="'Introduce la ubicación hotel'"
        />
        <p v-if="!form.address" class="mt-2 text-xs htext-alert-negative flex items-center">
            <img
                src="/assets/icons/1.TH.WARNING.RED.svg"
                alt="icon alert red"
                class="inline w-4 h-4 mr-2"
            />
            Introduce la ubicación
        </p>
        </div>
        <div id="map" class="h-[13.436rem] w-full rounded-2xl border-2 border-gray-500 mt-2"></div>
    </div>
</template>

<script setup>
    import { inject, onMounted } from 'vue';

    // DATA
    const form = inject('form')
    const hotelData = inject('hotelData')

    // ONMOUNTED
    onMounted(() => {
    })

    // FUNCTION
    const initGoogleMap = () => {
      var script = document.createElement("script");
      const KEY_GOOGLE = process.env.VUE_APP_KEY_GOOGE
      script.src =  `https://maps.googleapis.com/maps/api/js?key=${KEY_GOOGLE}&libraries=places&callback=initMap`;
      script.async = true;
        let latitude = hotelData.latitude ?? 37.38283;
        let longitude = hotelData.longitude ?? -5.97317;
      const coord = { lat: Number(latitude), lng: Number(longitude)};
      // Attach your callback function to the `window` object
      let vueform = form;
      window.initMap = function() {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: coord,
          zoom: 8,
          disableDefaultUI: true
        });

        const marker = new google.maps.Marker({
          position: coord,
          map: map
        });

        let metting_point = document.getElementById("metting_point");
        var address = null;

        const options = {
          componentRestrictions: { country: "es" }
          // types: ["establishment"],
        };
        const search_metting = new google.maps.places.Autocomplete(
          metting_point,
          options
        );
        // search_metting.setTypes(["street_address", "geometry", "name"]);
        search_metting.bindTo("bounds", map);

        let info_metting = new google.maps.InfoWindow();
        search_metting.addListener("place_changed", function() {
          info_end.close();
          marker.setVisible(false);

          var place = search_metting.getPlace();

              if (!place.geometry.viewport) {
            alert("Error al mostrar el lugar");
            return;
          }

          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.viewport);
            map.setZoom(8);
          }

          marker.setPosition(place.geometry.location);
          marker.setVisible(true);
          if (place.address_components) {
            address = [
              (place.address_components[0] &&
                place.address_components[0].short_name) ||
                "",
              (place.address_components[1] &&
                place.address_components[1].short_name) ||
                "",
              (place.address_components[2] &&
                place.address_components[2].short_name) ||
                ""
            ];
          }
          info_metting.setContent(
            "<div><strong>" + place.name + "</strong><br>" + address
          );
          info_metting.open(map, marker);
          let addresString = "";
          for (let index = 0; index < address.length; index++) {
            addresString = address[index] + "," + addresString;
          }
                    // console.log(`log: ${marker.getPosition().lng()}`)
                    // console.log(`lat: ${marker.getPosition().lat()}`)
                    // console.log(`address: ${addresString.slice(0, -1)}`)

          vueform.metting_point_latitude = marker.getPosition().lat();
          vueform.metting_point_longitude = marker.getPosition().lng();
          vueform.metting_point_reference = place.name;
          vueform.address = addresString.slice(0, -1);
          let city = place.address_components.reduce((acc, item) => {
              if (item.types.includes('locality')) {
                  acc = item.long_name
              }
              return acc
          }, '')
          vueform.city = city
        //   if (vueform.end_point_auto) {
        //     vueform.end_point_latitude = marker.getPosition().lat();
        //     vueform.end_point_longitude = marker.getPosition().lng();
        //     vueform.end_point_reference = place.name;
        //   }
        });

        let info_end = new google.maps.InfoWindow();
      };

      document.head.appendChild(script);
    }

    defineExpose({
        initGoogleMap
    })
</script>