<template>
    <nav class="h-full w-full bg-white shadow-menu">
        <div class="py-3">
            <p class="text-base font-semibold leading-[120%] py-[10.5px] px-4">WebApp</p>
        </div>
        <!-- {{dataTypePlaces}}
        {{ fullUrl }} -->
      <template
        v-for="(section, index_section) in menu_section"
        :key="index_section"
      >
        <ul
          v-if="!section?.disabled"
        >
            <li class="pl-6 py-[11.5px] text-sm font-semibold">
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
                    <span class="text-sm font-medium leading-[140%]">{{ menu.title }}</span>
                  </div>
                  <img :src="menu.expanded ? '/assets/icons/1.TH.I.dropdown.svg' : '/assets/icons/1.TH.I.dropdown.svg'" class="inline-block w-[12px] h-[12px]">
                </a>
                <ul v-if="menu.expanded">
                  <template v-for="(sub_menu, index_sub_menu) in menu.group" :key="index_sub_menu">
                    <li
                      v-if="sub_menu.place"
                      class=" w-full h-full hover-gray-100"
                      :class="fullUrl.includes(`typeplace=${dataTypePlaces?.[index_sub_menu]?.id}`) || fullUrl == '/places' && dataTypePlaces?.[index_sub_menu]?.name == 'Qué visitar' ? 'hbg-green-200' : ''"
                    >
                      <div
                        class="w-full h-full block pl-[44px] pr-[24px] cursor-pointer"
                        @click="dataTypePlaces?.[index_sub_menu]?.id ? goLinkPlace({name: 'Places', query: {selected_place: dataTypePlaces?.[index_sub_menu]?.id}}) : ''"
                      >
                        <!-- @click="dataTypePlaces?.[index_sub_menu]?.id ? goLinkPlace({name: 'Places', query: {selected_place: dataTypePlaces?.[index_sub_menu]?.id}}) : ''" -->
                        <!-- @click="dataTypePlaces?.[index_sub_menu]?.id ? goLinkPlace(dataTypePlaces?.[index_sub_menu]?.id) : ''" -->
                        <div class="flex items-center border-l-[1px] border-[#BFBFBF] relative">
                          <span v-if="fullUrl.includes(`selected_place=${dataTypePlaces?.[index_sub_menu]?.id}`) || fullUrl == '/places' && dataTypePlaces?.[index_sub_menu]?.name == 'Qué visitar'" class="absolute inline-block bg-[#2A8873] h-[24px] w-[3px]  rounded-full left-[-2.4px]"></span>
                          <div class="py-[8px] ml-[20px]">
                            <span class="text-sm normal-case">{{ sub_menu.title }}</span>
                          </div>
                        </div>
                        <!-- <div class="flex items-center">
                          <img :src="sub_menu.icon" class="inline-block w-[24px] h-[24px] mr-2">
                          <span class="text-sm normal-case">{{ sub_menu.title }} </span>
                        </div> -->
                      </div>
                      <!-- <a
                        href="javascript:void(0)"
                        class="w-full h-full block pl-[36px] pr-[12px]"
                        @click="!load_page && data_type_places?.[index_sub_menu]?.id ? goLinkWithRoute(route('hoster.plataform.cityguide', { typeplace: data_type_places?.[index_sub_menu]?.id })) : ''"
                      >
                        <div class="flex items-center border-l-[1px] border-[#BFBFBF] relative">
                          <span v-if="$page.url.includes(`typeplace=${data_type_places?.[index_sub_menu]?.id}`) || $page.url == '/tablero-hoster/plataforma/guia-de-la-ciudad' && data_type_places?.[index_sub_menu]?.name == 'Qué visitar'" class="absolute inline-block bg-[#2A8873] h-[24px] w-[3px]  rounded-full left-[-2.4px]"></span>
                          <div class="py-[8px] ml-[20px]">
                            <span class="text-sm normal-case">{{ $utils.capitalize(sub_menu.title) }}</span>
                          </div>
                        </div>
                      </a> -->
                    </li>
                    <li
                      v-else
                      class=" w-full h-full"
                      :class="sub_menu.selectedArr.includes(route.name) ? 'hbg-green-200' : 'hover-gray-100'"
                    >
                    <!-- else -->
                      <div
                        class="w-full block px-6 cursor-pointer"
                        @click="goLink(sub_menu.to)"
                      >
                        <div class="flex items-center h-10 relative">
                          <div class="w-6 h-full relative">
                            <div class="mx-auto h-full w-[1px] hbg-gray-400"></div>
                            <div v-if="sub_menu.selectedArr.includes(route.name)" class="w-[3px] h-6 bg-[#2A8973] absolute inset-0 mx-auto my-2 rounded-full"></div>
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
                :class="menu.include.includes(route.name) ? 'hbg-green-200' : ''"
              >
                <a
                  href="javascript:void(0)"
                  class="w-full py-[8px] px-[24px] block"
                  @click="goLink(menu.to)"
                >
                  <div class="flex items-center">
                    <img :src="menu.icon" class="inline-block w-[24px] h-[24px] mr-2">
                    <span class="text-sm capitalize font-medium leading-[140%]">{{ menu.title }}</span> <!--menu individual-->
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
                                :class="fullUrl.includes(`typeplace=${dataTypePlaces?.[index_sub_menu]?.id}`) || fullUrl == '/places' && dataTypePlaces?.[index_sub_menu]?.name == 'Qué visitar' ? 'hbg-green-200' : ''"
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
                                :class="page_url.includes(sub_menu.include) ? 'hbg-green-200' : ''"
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
                          :class="page_url.includes(menu.include) ? 'hbg-green-200' : ''"
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
import { reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter  } from 'vue-router';
// import DropdownHotel from '@/Pages/Associates/Layouts/DropdownHotel.vue';
// import TooltipResponsive from '@/Components/TooltipResponsive.vue'

  const route = useRoute();
  const router = useRouter();
  const status_subscription = false

  import { usePlaceStore } from '@/stores/modules/place';
  const placeStore = usePlaceStore();
//   const buttonRefs = ref([]);
//   const applyHoverEffect = (index) => {
//     buttonRefs.value[index].classList.add('hover-effect');
//     };
// const removeHoverEffect = (index) => {
//   buttonRefs.value[index].classList.remove('hover-effect');
// };
  const menu_section = reactive([
      {
          title: 'Costumer experience',
          group: [
              {
                  title: 'Alojamiento',
                  icon: '/assets/icons/1.TH.icon.instalaciones.svg',
                  expanded: ['Perfil','Facilities'].includes(route.name),
                  group: [
                      {
                          title: 'perfil',
                          icon: '/assets/icons/1.TH.icon.instalaciones.svg',
                          to: 'Perfil',
                          selectedArr: ['Perfil']
                      },
                      {
                          title: 'instalaciones',
                          icon: '/assets/icons/1.TH.icon.instalaciones.svg',
                          to: 'Facilities',
                          selectedArr: ['Facilities']
                      },
                  ],
              },
              {
                  title: 'Destino',
                  icon: '/assets/icons/1.TH.DESTINO.svg',
                  expanded: false,
                  group: [
                    {
                      title: 'qué visitar',
                      icon: '/assets/icons/1.TH.DESTINO.svg',
                      place: true,
                      include: '/places',
                      selectedArr: ['Places']
                    },
                    {
                      title: 'dónde comer',
                      icon: '/assets/icons/1.TH.DESTINO.svg',
                      place: true,
                      include: '/places',
                      selectedArr: ['Places']
                    },
                    {
                      title: 'ocio',
                      icon: '/assets/icons/1.TH.DESTINO.svg',
                      place: true,
                      include: '/places',
                      selectedArr: ['Places']
                    },
                  ],
              },
              {
                  title: 'Experiencias',
                  to: 'hoster.plataform.experiences',
                  icon: '/assets/icons/1.TH.CAMERA.svg',
                  include: '/experiencias'
              },
              {
                  title: 'Chat',
                  to: 'GeneralSettings',
                  icon: '/assets/icons/1.TH.CHAT.NEW.svg',
                  include: ['GeneralSettings','AvailabilitySettings','AutomaticResponses']
                
              },
          ],
      },
      {
          title: 'Reputación online',
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
                  title: 'Personalización',
                  to: 'hoster.customatization.index',
                  icon: '/assets/icons/1.TH.PERSONALIZACION.svg',
                  include: '/personalizacion'
              },
              {
                  title: 'Textos legales',
                  to: '',
                  icon: '/assets/icons/1.TH.PERSONALIZACION.svg',
                  include: '/estancias'
              },
              {
                  title: 'Galería de imágenes',
                  to: '',
                  icon: '/assets/icons/1.TH.IMAGES.svg',
                  include: '/huespedes'
              },
          ],
      },
  ])
const page_url = 'x'
//   const load_page = inject('load_page')

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

  // ONMOUNTED
  onMounted(() => {
      getTypePlaces()
      focusMenu()
  })

  // COMPUTED
  const fullUrl = computed(() => {
    let url = `${route.fullPath}`;
    return url;
  });



  // FUNCTIONS

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
    menu_selected.expanded = !menu_selected.expanded
    menu_section.forEach((section, index_section) => {
      section.group.forEach((menu, index_menu) => {
        if (menu?.title && (menu_selected.title != menu?.title)) {
          menu_section[index_section].group[index_menu].expanded = false
        }
      })
    })
  }

  function focusMenu () {
    menu_section.forEach((section, index_section) => {
      section.group.forEach((menu, index_menu) => {
        menu?.group?.forEach((sub_menu) => {
          if (fullUrl.value?.includes(sub_menu.include)) {
            menu_section[index_section].group[index_menu].expanded = true
          }
        })
      })
    })
  }

  function goLink(viewName) {
    router.push({ name: viewName});
  }

  function goLinkPlace(r) {
    // console.log(router?.name, 'd');
    router.replace(r);
    const newUrl = `${window.location.origin}/places?selected_place=${r?.query?.selected_place}`
    window.location.assign(newUrl);
  }

  function goLinkWithRoute() {
    // Inertia.get(name_url)
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
