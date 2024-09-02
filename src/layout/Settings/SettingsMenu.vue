<template>
  <nav class="h-full w-full bg-white shadow-menu">
      <div class="py-3">
          <p class="text-base font-semibold leading-[120%] py-[10.5px] px-4">WebApp</p>
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
                  class="text-sm font-medium flex items-center justify-between py-2 px-6 hover-gray-100"
                >
                  <div class="flex items-center">
                    <img :src="menu.icon" class="inline-block w-6 h-6 mr-2"> 
                    <span class="text-sm font-medium leading-[140%]">{{ menu.title }}</span> <!-- items con icono -->
                  </div>
                  <img :src="menu.expanded ? '/assets/icons/1.TH.I.DROPDOWN.OPEN.svg' : '/assets/icons/1.TH.I.dropdown.svg'" class="inline-block w-[12px] h-[12px]">
                </a>
                <ul v-if="menu.expanded">
                  <template v-for="(sub_menu, index_sub_menu) in menu.group" :key="index_sub_menu">
                    <li
                      v-if="sub_menu.place"
                      class=" w-full h-full hover-gray-100"
                      :class="fullUrl.includes(`selected_place=${dataTypePlaces?.[index_sub_menu]?.id}`) || fullUrl == '/places' && dataTypePlaces?.[index_sub_menu]?.name == 'Qué visitar' ? 'hbg-green-200' : ''"
                    >
                      <div
                        class="w-full h-full block pl-[37px] pr-[24px] cursor-pointer"
                        @click="dataTypePlaces?.[index_sub_menu]?.id ? goLinkPlace({name: 'Places', query: {selected_place: dataTypePlaces?.[index_sub_menu]?.id}}) : ''"
                      >
                        <div class="flex items-center border-l-[1px] border-[#BFBFBF] relative">
                          <span v-if="fullUrl.includes(`selected_place=${dataTypePlaces?.[index_sub_menu]?.id}`) || fullUrl == '/places' && dataTypePlaces?.[index_sub_menu]?.name == 'Qué visitar'" class="absolute inline-block bg-[#2A8873] h-[30px] w-[4px]  rounded-full left-[-2px]"></span>
                          <div class="py-[8px] ml-[20px]">
                            <span class="text-sm normal-case">{{ sub_menu.title }}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li
                      v-else
                      class=" w-full h-full"
                      :class="sub_menu.selectedArr.includes(route.name) ? 'hbg-green-200' : 'hover-gray-100'"
                    >
                      <div
                        class="w-full block px-6 cursor-pointer"
                        @click="goLink(sub_menu.to)"
                      >
                        <div class="flex items-center h-10 relative">
                          <div class="w-6 h-full relative">
                            <div class="mx-auto h-full w-[1px] hbg-gray-400"></div>
                            <div v-if="sub_menu.selectedArr.includes(route.name)" class="h-[30px] w-[4px] bg-[#2A8873] absolute inset-0 mx-auto my-1 rounded-full"></div>
                          </div>
                          <span class="text-sm font-medium leading-[140%] ml-2">{{ sub_menu.title }} </span>
                        </div>
                      </div>
                    </li>
                  </template>
                </ul>
              </li>
              <li
                v-else
                class="hover-gray-100"
                :class="fullUrl.includes(menu.include) ? 'hbg-green-200' : ''"
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
                            class="text-sm font-medium flex items-center justify-between py-[8px] px-[24px] hover-gray-100"
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
                                class=" w-full h-full hover-gray-100"
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
                                class=" w-full h-full hover-gray-100"
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
                          class="hover-gray-100"
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
import { reactive, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter  } from 'vue-router';

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
              title: 'Alojamiento',
              icon: '/assets/icons/1.TH.icon.instalaciones.svg',
              expanded: ['Perfil','Facilities'].includes(route.name),
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
              ],
              selectedArr: ['Perfil','Facilities']
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
          {
              title: 'Experiencias',
              to: 'Experiences',
              icon: '/assets/icons/1.TH.CAMERA.svg',
              include: '/experiencias',
              selectedArr: ['Experiences'],
          },
          {
              title: 'Chat',
              to: 'GeneralSettings',
              icon: '/assets/icons/1.TH.CHAT.NEW.svg',
              include: '/chat/webapp',
              selectedArr: ['GeneralSettings', 'AvailabilitySettings', 'AutomaticResponses'],
            
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
                      title: 'Feedback',
                      to: 'SettingsPreStayPage',
                      selectedArr: ['SettingsPreStayPage','SettingsStayPage','SettingsPostStayPage']
                  },
                  {
                      title: 'Solicitudes',
                      to: 'ReviewRequestSettingsIndex',
                      selectedArr: ['ReviewRequestSettingsIndex']
                  },
              ],
              selectedArr: ['ReviewRequestSettingsIndex','SettingsPreStayPage','SettingsStayPage','SettingsPostStayPage']
          }
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
            title: 'Comunicaciones',
            icon: '/assets/icons/1.TH.COMUNICACIONES.svg',
            to: 'ComunicationHome',
            include: '/comunicacion',
            selectedArr: ['ComunicationHome'],
        },
        {
            title: 'Personalización',
            icon: '/assets/icons/1.TH.PERSONALIZAR.svg',
            to: 'Customization',
            include: '/personalizacion',
            selectedArr: ['Customization'],
        },
        {
            title: 'Textos legales',
            to: 'GeneralLegal',
            icon: '/assets/icons/1.TH.TEXTOS.LEGALES.svg',
            include: '/legal'
        },
        {
            title: 'Galería de imágenes',
            icon: '/assets/icons/1.TH.IMAGES.svg',
            to: 'Gallery',
            include: '/galeria',
            selectedArr: ['Gallery'],
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
if (response.ok) {
  let typePlaces = response.data;
  typePlaces.forEach(item => {
    let type = dataTypePlaces.find(t => t.name == item.name);
    if (type) {
      type.id = item.id;
    }
  });
}
}

function toggleSubMenu (index_section_selected, index_menu_selected, section_selected , menu_selected) {
console.log({
  'partidea': 'toggleSubMenu',
  'index_section_selected': index_section_selected,
  'index_menu_selected': index_menu_selected,
  'section_selected': section_selected,
  'menu_selected': menu_selected
})

menu_selected.expanded = !menu_selected.expanded
}

function focusMenu () {
menu_section.forEach((section, index_section) => {
  section.group.forEach((menu, index_menu) => {
    menu.expanded = menu.selectedArr && menu.selectedArr.includes(route.name);
    /* console.log({
      'partidea': 'focusMenu',
      'index_section': index_section,
      'index_menu': index_menu,
      'menu': menu,
      'route': route.name,
      'menu.selectedArr': menu.selectedArr,
      'menu.expanded': menu.expanded
    }) */
    menu?.group?.forEach((sub_menu) => {
      if (fullUrl.value?.includes(sub_menu.include)) {
        menu_section[index_section].group[index_menu].expanded = true;
      }
    })
  })
})
}

function goLink(viewName) {
  router.push({ name: viewName});
}

function goLinkPlace(r) {
  router.replace(r);
  const newUrl = `${window.location.origin}/places?selected_place=${r?.query?.selected_place}`
  window.location.assign(newUrl);
}

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
