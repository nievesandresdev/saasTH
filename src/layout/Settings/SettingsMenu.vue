<template>
  <nav class="h-full w-full bg-white shadow-menu overflow-y-auto">
      <div class="py-3">
          <p class="text-base font-semibold leading-[120%] py-[10.5px] px-6">WebApp</p>
      </div>
      <template
        v-for="(section, index_section) in menu_section"
        :key="index_section"
      >
        <ul
          v-if="!section?.disabled"
        >
            <li class="pl-6 py-[11.5px] text-sm font-semibold" v-show="section.title">
              <h5 class="text-sm font-semibold uppercase leading-[124%]">{{ section.title }}</h5>
            </li>
            <template
              v-for="(menu, index_menu) in section.group"
              :key="index_menu"
            >
              <li
                v-if="menu?.group"
                :key="index_menu"
              >
                <a
                  href="javascript:void(0)"
                  @click="toggleSubMenu(index_section, index_menu, section, menu)"
                  class="text-sm font-medium flex items-center justify-between py-2 px-6 hover-hbg-gray-200"
                >
                  <div class="flex items-center">
                    <img :src="menu.icon" class="inline-block w-6 h-6 mr-2"> 
                    <span class="text-sm font-medium leading-[140%]">{{ menu.title }}</span> <!-- items con icono -->
                  </div>
                  <img :src="menu.expanded ? '/assets/icons/1.TH.I.DROPDOWN.OPEN.svg' : '/assets/icons/1.TH.I.dropdown.svg'" class="inline-block w-[12px] h-[12px]">
                </a>
                <ul ref="menuRef" v-if="menu.expanded">
                  <template v-for="(sub_menu, index_sub_menu) in menu.group" :key="index_sub_menu">
                    <!-- <li
                      v-if="sub_menu.place"
                      class=" w-full h-full hover-hbg-gray-200"
                      :class="fullUrl.includes(`selected_place=${dataTypePlaces?.[index_sub_menu]?.id}`) || fullUrl == '/places' && dataTypePlaces?.[index_sub_menu]?.name == 'Qué visitar' ? 'hbg-green-200' : ''"
                    > -->
                    <li
                      v-if="sub_menu.place"
                      class=" w-full h-full hover-hbg-gray-200"
                      :class="isActive(sub_menu, index_sub_menu) ? 'hbg-green-200' : ''"
                    >
                      <div
                        class="w-full h-full block pl-[36px] pr-[24px] cursor-pointer"
                        @click="dataTypePlaces?.[index_sub_menu]?.id ? goLinkPlace({name: 'Places', query: {selected_place: dataTypePlaces?.[index_sub_menu]?.id}},index_sub_menu) : ''"
                      >
                        <div class="flex items-center border-l-[1px] border-[#BFBFBF] relative">
                          <span 
                          v-if="isActive(sub_menu, index_sub_menu)"
                          class="absolute inline-block bg-[#2A8873] h-[25px] w-[3px]  rounded-full left-[-2px]"
                          >
                        </span>
                          <div class="py-[8px] ml-[20px]">
                            <span class="text-sm normal-case">{{ sub_menu.title }} </span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li
                      v-else
                      class=" w-full h-full"
                      :class="sub_menu.selectedArr.includes(route.name) ? 'hbg-green-200' : 'hover-hbg-gray-200'"
                    >
                      <div
                        class="w-full block px-6 cursor-pointer"
                        @click="goLink(sub_menu.to)"
                      >
                        <div class="flex items-center h-10 relative">
                          <div class="w-6 h-full relative">
                            <div class="mx-auto h-full w-[1px] hbg-gray-400"></div>
                            <div v-if="sub_menu.selectedArr.includes(route.name)" class="h-[25px] w-[3px] bg-[#2A8873] absolute inset-0 mx-auto my-1 rounded-full"></div>
                          </div>
                          <span class="text-sm font-medium leading-[140%] ml-2">{{ sub_menu.title }} </span>
                        </div>
                      </div>
                    </li>
                  </template>
                </ul>
              </li>
              <!-- normal link -->
              <li
                v-else
                class="hover-hbg-gray-200 "
                :class="fullUrl.includes(menu.include) ? 'hbg-green-200' : ''"
              >
                <a
                  href="javascript:void(0)"
                  class="w-full py-[8px] pr-[14px] pl-[24px] block"
                  @click="goLink(menu.to,menu)"
                >
                  <div class="flex items-center">
                    <img :src="menu.icon" class="inline-block w-[24px] h-[24px] mr-2">
                    <span class="text-sm font-medium leading-[140%]">{{ menu.title }}</span>
                  </div>
                </a>
              </li>
            </template>
        </ul>
        <template v-else>
          <TooltipResponsive
              size="xs"
              :top="33"
              :right="11"
          >
              <template v-slot:button>
                  <ul
                    class="opacity-30 w-full"
                  >
                      <li class="pl-[24px] py-[12.5px] text-sm font-semibold">
                        <h5 class="uppercase ">{{ section.title }}</h5>
                      </li>
                      <template
                        v-for="(menu, index_menu) in section.group"
                        :key="index_menu"
                      >
                        <li
                          v-if="menu?.group"
                          class="group"
                          :key="index_menu"
                        >
                          <a
                            href="javascript:void(0)"
                            class="text-sm font-medium flex items-center justify-between py-[8px] px-[24px] hover-hbg-gray-200"
                          >
                            <div class="flex items-center">
                              <img :src="menu.icon" class="inline-block w-6 h-6 mr-2">
                              <span class="text-sm font-medium leading-[140%]">{{ menu.title }}</span>
                            </div>
                            <img :src="menu.expanded ? '/vendor_asset/img/hoster/icons/1.TH.I.DROPDOWN.OPEN.svg' : '/vendor_asset/img/hoster/icons/1.TH.I.DROPDOWN.svg'" class="inline-block w-[12px] h-[12px]">
                          </a>
                          <ul v-if="menu.expanded">
                            <template v-for="(sub_menu, index_sub_menu) in menu.group" :key="index_sub_menu">
                              <li
                                v-if="sub_menu.place"
                                class=" w-full h-full hover-hbg-gray-200"
                                :class="fullUrl.includes(`selected_place=${dataTypePlaces?.[index_sub_menu]?.id}`) || fullUrl == '/places' && dataTypePlaces?.[index_sub_menu]?.name == 'Qué visitar' ? 'hbg-green-200' : ''"
                              >
                                <a
                                  href="javascript:void(0)"
                                  class="w-full h-full block pl-[44px] pr-[24px] py-[8px]"
                                >
                                  <div class="flex items-center">
                                    <img :src="sub_menu.icon" class="inline-block w-[24px] h-[24px] mr-2">
                                    <span class="text-sm normal-case">{{ sub_menu.title }} </span>
                                  </div>
                                </a>
                              </li>
                              <li
                                v-else
                                class=" w-full h-full hover-hbg-gray-200"
                                :class="fullUrl.includes(sub_menu.include) ? 'hbg-green-200' : ''"
                              >
                                <a
                                  href="javascript:void(0)"
                                  class="w-full h-full block pl-[44px] pr-[24px] py-[8px]"
                                >
                                  <div class="flex items-center">
                                    <img :src="sub_menu.icon" class="inline-block w-[24px] h-[24px] mr-2">
                                    <span class="text-sm normal-case">{{ sub_menu.title }}</span>
                                  </div>
                                </a>
                              </li>
                            </template>
                          </ul>
                        </li>
                        <li
                          v-else
                          class="hover-hbg-gray-200"
                          :class="fullUrl.includes(menu.include) ? 'hbg-green-700' : ''"
                        >
                          <a
                            href="javascript:void(0)"
                            class="w-full py-[8px] px-[24px] block"
                            @click="goLink(menu.to)"
                          >
                            <div class="flex items-center">
                              <img :src="menu.icon" class="inline-block w-[24px] h-[24px] mr-2">
                              <span class="text-sm capitalize font-medium leading-[140%]">{{ menu.title }}</span>
                            </div>
                          </a>
                        </li>
                      </template>
                  </ul>
              </template>
              <template v-slot:content>
                  <p class="text-xs font-normal">
                      Desbloquea con <span class="font-bold">HostMaster</span>
                  </p>
              </template>
          </TooltipResponsive>
        </template>
      </template>
  </nav>
</template>

<script setup>
import { reactive, onMounted, computed, watch,watchEffect } from 'vue'
import { useRoute, useRouter  } from 'vue-router';
import { $formatTypeLodging } from '@/utils/helpers'

const route = useRoute();
const router = useRouter();
const status_subscription = false

import { usePlaceStore } from '@/stores/modules/place';
const placeStore = usePlaceStore();



const menu_section = reactive([
  {
      title: '',
      group: [
          {
              title: 'Home',
              to: 'Configuracion',
              icon: '/assets/icons/1.TH.HOME-black.svg',
              include: '/alojamiento/configuracion',
              selectedArr: ['Configuration'],
            
          },
          {
              title: $formatTypeLodging(true),
              icon: '/assets/icons/1.TH.icon.instalaciones.svg',
              expanded: ['Perfil','Facilities','Configuration'].includes(route.name),
              group: [
                  {
                      title: 'Perfil',
                      icon: '/assets/icons/1.TH.icon.instalaciones.svg',
                      to: 'Perfil',
                      selectedArr: ['Perfil']
                  },
                  {
                      title: 'Instalaciones',
                      icon: '/assets/icons/1.TH.icon.instalaciones.svg',
                      to: 'Facilities',
                      selectedArr: ['Facilities']
                  },
                  /* {
                      title: 'Configuración',
                      icon: '/assets/icons/1.TH.icon.instalaciones.svg',
                      to: 'Configuracion',
                      selectedArr: ['Configuracion']
                  }, */

              ],
              selectedArr: ['Perfil','Facilities','Configuration']
          },
          {
              title: 'Destino',
              icon: '/assets/icons/1.TH.DESTINO.svg',
              expanded: false,
              group: [
                {
                  title: 'Qué visitar',
                  icon: '/assets/icons/1.TH.DESTINO.svg',
                  place: true,
                  include: '/places',
                  selectedArr: ['Places']
                },
                {
                  title: 'Dónde comer',
                  icon: '/assets/icons/1.TH.DESTINO.svg',
                  place: true,
                  include: '/places',
                  selectedArr: ['Places']
                },
                {
                  title: 'Ocio',
                  icon: '/assets/icons/1.TH.DESTINO.svg',
                  place: true,
                  include: '/places',
                  selectedArr: ['Places']
                },
              ],
              selectedArr: ['Places']
          },
          // {
          //     title: 'Experiencias',
          //     to: 'Experiences',
          //     icon: '/assets/icons/1.TH.CAMERA.svg',
          //     include: '/experiencias',
          //     selectedArr: ['Experiences'],
          // },
          {
            title: 'Servicios',
            icon: '/assets/icons/1.TH.recepcion.svg',
            expanded: ['Conforts', 'Transports', 'Experiences'].includes(route.name),
            group: [
                {
                    title: 'Confort',
                    to: 'Conforts',
                    selectedArr: ['Conforts']
                },
                {
                    title: 'Transporte',
                    to: 'Transports',
                    selectedArr: ['Transports']
                },
                {
                    title: 'Actividades turísticas',
                    to: 'Experiences',
                    selectedArr: ['Experiences']
                },

            ],
            selectedArr: ['Confort']
          },
          {
              title: 'Chat',
              to: 'GeneralSettings',
              icon: '/assets/icons/1.TH.CHAT.NEW.svg',
              include: '/chat/webapp',
              selectedArr: ['GeneralSettings', 'AvailabilitySettings', 'AutomaticResponses'],
            
          },
          {
              title: 'Check-in',
              to: 'CheckinGeneral',
              icon: '/assets/icons/1.TH Check-in.svg',
              include: '/webapp/checkin',
              selectedArr: ['CheckinGeneral', 'CheckinForms'],
            
          },
      ],
  },
  {
      title: '',
      group: [
          {
              title: 'Seguimiento',
              icon: '/assets/icons/1.TH.SEGUIMIENTO.svg',
              expanded: ['ReviewRequestSettingsIndex','SettingsPreStayPage','StayPage','SettingsPostStayPage'].includes(route.name),
              group: [
                  {
                      title: 'Sentimiento',
                      to: 'SettingsPreStayPage',
                      selectedArr: ['SettingsPreStayPage','SettingsStayPage','SettingsPostStayPage']
                  },
                  {
                      title: 'Solicitudes',
                      to: 'ReviewRequestSettingsIndex',
                      selectedArr: ['ReviewRequestSettingsIndex','ReviewRequestSettingsPostStay']
                  },
              ],
              selectedArr: ['ReviewRequestSettingsIndex','SettingsPreStayPage','SettingsStayPage','SettingsPostStayPage']
          }
      ],
  },
  //reservas
  {
      title: '',
      group: [
          {
              title: 'Programa de referidos',
              icon: '/assets/icons/1.TH.Referidos.svg',
              to: 'Referrals',
              include: '/referidos',
              selectedArr: ['Referrals'],
          },
      ],
  },
  
  {
      title: 'reputación online',
      disabled: status_subscription?.product_name_current !== 'HostMaster',
      group: [
          {
              title: 'seguimiento',
              icon: '/vendor_asset/img/hoster/icons/TH.SEGUIMIENTO.svg',
              expanded: false,
              group: [
                  {
                      title: 'Feedback',
                      icon: '/vendor_asset/img/hoster/icons/TH.CONSULTAS.svg',
                      to: 'hoster.queries.setting-prestay',
                      include: '/consultas'
                  },
                  {
                      title: 'solicitudes',
                      icon: '/vendor_asset/img/hoster/icons/TH.SOLICITUDES.svg',
                      to: 'requests.configuration.index',
                      include: '/solicitudes'
                  },
              ],
          },
          {
              title: 'reseñas',
              to: '',
              icon: '/vendor_asset/img/hoster/icons/1.TH.RESEÑAS.svg',
              include: '/resenas'
          },
      ],
  },
  {
      title: 'General',
      group: [
      {
            title: 'Promociona tu WebApp',
            icon: '/assets/icons/1.TH.PROMOCIONA-black.svg',
            to: 'PromoteWebApp',
            include: '/promociona-webapp',
            selectedArr: ['PromoteWebApp'],
        },
        {
            title: 'Comunicaciones',
            icon: '/assets/icons/1.TH.COMUNICACIONES.svg',
            to: 'ComunicationHome',
            include: '/comunicaciones',
            selectedArr: ['ComunicationHome'],
        },
        {
            title: 'Diseño',
            icon: '/assets/icons/1.TH.PERSONALIZAR.svg',
            to: 'Appearence',
            include: '/apariencia',
            selectedArr: ['Appearence'],
        },
        {
            title: 'Galería de imágenes',
            icon: '/assets/icons/1.TH.IMAGES.svg',
            to: 'Gallery',
            include: '/galeria',
            selectedArr: ['Gallery'],
        },
        {
            title: 'Ajustes',
            icon: '/assets/icons/1.TH.Settings.svg',
            expanded: false,
            selectedArr: [],
            group: [
                {
                    title: 'General',
                    icon: '/vendor_asset/img/hoster/icons/TH.CONSULTAS.svg',
                    to: 'Customization',
                    selectedArr: ['Customization'],
                },
                {
                    title: 'Textos legales',
                    icon: '/vendor_asset/img/hoster/icons/TH.SOLICITUDES.svg',
                    to: 'GeneralLegal',
                    selectedArr: ['GeneralLegal', 'PoliciesLegal', 'PolicyCookiesLegal', 'PolicyPrivacyLegal'],
                },
            ],
        },
      ],
  },
])
const page_url = 'x'

const dataTypePlaces = reactive([
{
    id: 1,
    name: "Qué visitar",
    active: 1,
    show: 1,
},
{
    id: 2,
    name: "Dónde comer",
    active: 1,
    show: 1,
},
{
    id: 3,
    name: "Ocio",
    active: 1,
    show: 1,
},
]);


onMounted(() => {
  loadMenuState();
  getTypePlaces()
  focusMenu()
})

const fullUrl = computed(() => {
let url = `${route.fullPath}`;
return url;
});

watch(route, (to, from) => {
focusMenu();
});

async function getTypePlaces(){
  const response = await placeStore.$getTypePlaces();
  // console.log(response, 'response');
  if (response.ok) {
    let typePlaces = response.data;
    // console.log(typePlaces, 'typePlaces');
    typePlaces.forEach(item => {
      let type = dataTypePlaces.find(t => t.name == item.name);
      if (type) {
        type.id = item.id;
        //localStorage.setItem('selected_place', item.id);
      }
    });
  }
}


function toggleSubMenu(index_section_selected, index_menu_selected, section_selected, menu_selected) {
    menu_selected.expanded = !menu_selected.expanded;
    saveMenuState();
}

function saveMenuState() {
    const menuState = menu_section.map(section => {
        return section.group.map(menu => menu.expanded);
    });
    localStorage.setItem('menuState', JSON.stringify(menuState));
}

function loadMenuState() {
    const menuState = JSON.parse(localStorage.getItem('menuState'));
    if (menuState && menuState.length === menu_section.length) {
        menu_section.forEach((section, index_section) => {
            if (menuState[index_section] && menuState[index_section].length === section.group.length) {
                section.group.forEach((menu, index_menu) => {
                    menu.expanded = menuState[index_section][index_menu];
                });
            }
        });
    }
}

function focusMenu() {
    // No cambiaremos el estado `expanded` si ya ha sido cargado.
    menu_section.forEach((section, index_section) => {
        section.group.forEach((menu, index_menu) => {
            if (!menu.expanded && menu.selectedArr && menu.selectedArr.includes(route.name)) {
                menu.expanded = true;
            }
            menu?.group?.forEach((sub_menu) => {
                if (fullUrl.value?.includes(sub_menu.include)) {
                    menu.expanded = true;
                }
            });
        });
    });
}

watch(route, (to, from) => {
    // Cuando cambia la ruta, solo aplicamos el focus si es necesario
    focusMenu();
});

function goLink(viewName,menu = false) {
  router.push({ name: viewName});

  /* if (menu.title == 'Home') {
    window.location.replace(menu.include);
  }else{
    router.push({ name: viewName});
  } */
  
}

watch(
      () => route.fullPath, // Observa la URL completa
      (newUrl) => {
        if (!newUrl.startsWith('/places')) {
          // Si la URL no comienza con "/places", elimina el selected_place
          localStorage.removeItem('selected_place');
        }
      }
    );  

function goLinkPlace(r,d) {
  localStorage.setItem('selected_place', d); //guardar ese item para que cargue el active apenas inicie el componente 

  router.replace(r);
  const newUrl = `${window.location.origin}/places?selected_place=${r?.query?.selected_place}`;
  window.location.assign(newUrl);
}

const isActive = (sub_menu, index_sub_menu) => {
  const savedPlaceId = localStorage.getItem('selected_place');
  let inPlaces = fullUrl.value.includes('/places');
  return savedPlaceId == index_sub_menu && inPlaces ||  inPlaces && !savedPlaceId && !index_sub_menu;
};

/* onMounted(() => {
  const savedPlaceId = localStorage.getItem('selected_place');

  console.log('savedPlaceId', savedPlaceId);
}); */

function goLinkWithRoute() {
}

</script>

<style scoped>
a:hover{
  color:#333;
  text-decoration: none;
}
.shadow-menu{
  box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.15);
}

</style>
