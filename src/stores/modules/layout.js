// store/layout.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutStore = defineStore('layout', () => {
  const leftSidebarKey = ref(0)
  const rightSidebarKey = ref(0)

  function $forceLeftSidebarRerender() {
    leftSidebarKey.value++
  }

  function $forceRightSidebarRerender() {
    rightSidebarKey.value++
  }

  return {
    leftSidebarKey,
    rightSidebarKey,
    $forceLeftSidebarRerender,
    $forceRightSidebarRerender
  }
})
