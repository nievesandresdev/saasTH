<template>
  <div :class="disabled ? 'opacity-[0.8] cursor-not-allowed' : ''">
    <label class="block text-sm mb-2 font-medium leading-[140%] htext-black-100" v-if="textLabel">
      {{ textLabel }}
    </label>
    <div class="relative w-full" v-if="options.length > 0" ref="dropdown" :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'">
      <div
        :disabled="disabled"
        :id="`dropdown-input-${options[0].value}`"
        class="text-start flex items-center w-full border-[2px]"
        :class="[
          size ? style.content : '',
          borderClasses,
          bgClasses,
          { 'hover-hbg-gray-200': !showOptions }
        ]"
        @click="toggleOptions"
      >
        <img v-if="icon_left" :src="icon_left" :class="icon_left_class">
        <span
          class="flex-grow truncate font-medium mr-2"
          :class="[
            {
              'htext-font-secondary': !error && !modelValue && !focusedAlweys,
              // 'htext-alert-negative': error,
              'htext-black-100': modelValue || focusedAlweys,
            },
            size ? style.text : '',
            compact ? 'text-xs' : ''
          ]"
        >
          {{ labelSelect }}
        </span>
        <template v-if="modelValue && !mandatory">
          <img :src="icon_delete" :class="[icon_delete_class, compact ? 'h-4 w-4' : '']" @click.stop="deleteOption" class="cursor-pointer">
        </template>
        <template v-else>
          <img :src="icon_right" :class="[icon_right_class, compact ? '!h-4 !w-4' : '']">
        </template>
      </div>
      <div
        class="absolute z-50 bg-white"
        :class="[
          'dropdown-menu',
          extra_dropdown,
          top_dropdown,
          { 'compact-dropdown': compact }
        ]"
        :aria-labelledby="`dropdown-input-${options[0].value}`"
        v-if="showOptions"
      >
        <div
          v-for="(option, index) in options"
          :key="index"
          class="option cursor-pointer relative p-3 text-sm"
          :class="[
            {
              'active': option.value == modelValue,
              'disabled': option.disabled,
              'h-8': compact,
              'h-10': !compact
            }
          ]"
          @click.stop="selectOption(option)"
          @mouseover="hoverOption = index"
          @mouseleave="hoverOption = false"
          tabindex="-1"
          aria-disabled="true"
        >
          <p>
            <img v-if="option.img" :src="option.img" :class="option.img_class ?? option_classes">
            {{ option.label }}
            <span v-if="option.tag" class="status-tag inline ml-2" :class="option.tag.class">
              {{ option.tag.text }}
            </span>
          </p>
        </div>
      </div>
      <div class="mt-1 flex items-center" v-if="error">
        <img class="inline w-4 h-4 mr-2" src="/assets/icons/1.TH.WARNING.RED.svg">
        <p class="text-xs htext-alert-negative leading-[90%]">
          {{ texterror }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

export default {
  props: {
    id: {
      type: String,
      default: '',
    },
    error: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    textLabel: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [Number, String],
      default: null,
    },
    options: {
      type: Array,
      default: () => ([]),
    },
    classLabel: {
      type: Object,
      default: null,
    },
    icon_left: {
      type: String,
      default: null,
    },
    icon_left_class: {
      type: String,
      default: 'h-6 w-6 mr-2',
    },
    icon_right: {
      type: String,
      default: '/assets/icons/1.TH.I.dropdown.svg',
    },
    icon_right_class: {
      type: String,
      default: 'h-6 w-6',
    },
    icon_delete: {
      type: String,
      default: '/assets/icons/1.TH.CLOSE.svg',
    },
    icon_delete_class: {
      type: String,
      default: 'h-6 w-6',
    },
    option_classes: {
      type: String,
      default: 'h-6 w-6 mr-2 inline',
    },
    mandatory: {
      type: Boolean,
      default: false
    },
    texterror: {
      type: String,
      default: 'Campo obligatorio'
    },
    size: {
      type: String,
      default: 'm', //s.m,l
    },  
    top_dropdown: {
      type: String,
      default: 'top-dropdown', //opciones : top-auto
    },
    extra_dropdown: {
      type: String,
      default: '', //opciones : top-auto
    },
    textLabel: {
      type: String,
      default: null,
    },
    focusedAlweys: Boolean,
    compact: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const showOptions = ref(false);
    const hoverOption = ref(null);
    const selected = ref(false);
    const value = ref(null);
    const dropdown = ref(null);

    const toggleOptions = () => {
      if (!props.disabled) {
        showOptions.value = !showOptions.value;
        hoverOption.value = null;
      } else {
        showOptions.value = false;
        hoverOption.value = null;
      }
    };

    const selectOption = (option) => {
      if (!option.disabled && props.modelValue !== option.value) {
        emit('update:modelValue', option.value);
        emit('change', option.value);
        showOptions.value = false; // Close the dropdown after selection
      }
    };

    const deleteOption = () => {
      if (props.modelValue !== null) {
        emit('update:modelValue', null);
        emit('change', null);
      }
    };

    const label = computed(() => {
      const lb = props.options.find(item => props.modelValue == item.value);
      return lb ? lb.label : null;
    });

    const labelSelect = computed(() => {
      return label.value || props.textLabel;
    });

    const style = computed(() => {
      let s = {
        content: 'h-10 rounded-[6px] py-2 px-3',
        text: 'text-sm',
      };
      if (props.size == 's') {
        s.content = 'h-8 rounded-[6px] py-auto py-1.5 px-3';
        return s;
      }
      if (props.size == 'free') {
        s = {
          content: 'border-0',
          text: 'mr-1'
        };
        return s;
      }
      if (props.compact) {
        s.content = 'h-[21px] rounded-[6px] !py-0 !px-1';
        return s;
      }
      return s;
    });

    const borderClasses = computed(() => {
      if(props.disabled){
        return 'hborder-disabled-input';
      }
      if(props.error){
        return 'hborder-alert-negative';
      }
      return showOptions.value ? 'hborder-green-600' : 'hborder-gray-400';
    });

    const bgClasses = computed(() => {
      return props.disabled ? 'hbg-disabled-input' : 'bg-white';
    });

    const handleClickOutside = (event) => {
      if (dropdown.value && !dropdown.value.contains(event.target)) {
        showOptions.value = false;
      }
    };

    onMounted(() => {
      if (props.modelValue) {
        value.value = props.modelValue;
      }
      document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    watch(() => props.modelValue, (newValue) => {
      value.value = newValue;
    });

    return {
      showOptions,
      hoverOption,
      selected,
      value,
      dropdown,
      toggleOptions,
      selectOption,
      deleteOption,
      labelSelect,
      style,
      borderClasses,
      bgClasses
    };
  }
};
</script>

<style scoped>
.border-0:hover,
.border-0 {
  border: none !important;
}
.top-dropdown {
  top: 40px !important;
  transform: none !important;
}
.top-auto {
  top: 0;
}
.compact-dropdown {
  top: 21px !important;
}
.dropdown-menu {
  box-shadow: 0px 3.5px 7px rgba(0, 0, 0, 0.15);
  border-radius: 0px 0px 10px 10px;
  border: none;
  width: 100%;
  padding: 0;
}

.option:last-child {
  border-radius: 0px 0px 10px 10px;
}
.active {
  background: #ECF9F5 !important;
}
.option:hover {
  background: #F1F1F1;
}
.disabled:hover {
  background-color: #fff;
}
.option-selected {
  background: red;
}
.option-hover {
  background: yellow;
}
.hoverForm:hover{
    color: var(--h-green-600);
    border: 1px solid var(--h-green-600) !important;
}
.hoverForm:hover::placeholder {
    color: var(--h-green-600);
    opacity: 1;
  }

</style>
