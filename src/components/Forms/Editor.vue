<template>
    <div class="relative">
      <div
        id="editor-quill"
        :class="{
          'editor-is-empty': isValid || !mandatory && !isValid,
          'editor-is-focused': isFocused,
          'editor-is-invalid': !isValid && mandatory,
          'padding-with-counter': showCounter && countType === 'absolute',
          'padding-without-counter': !showCounter || (showCounter && countType !== 'absolute')
        }"
        :style="{ minHeight: minHeight ?? null, '--editorMinHeight': `calc(${minHeight} - 42px)` }"
      >
        <QuillEditor
            :key="id"
            v-model:content="content"
            @textChange="onTextChange"
            contentType="html"
            :placeholder="placeholder"
            :toolbar="toolbarOptions"
            ref="quillRef"
            @focus="onFocus"
            @blur="onBlur"
        />
      </div>
      <div
        v-if="showCounter"
        :key="characterCount"
        :class="{
          'character-count-static': countType === 'static',
          'character-count': countType === 'absolute',
        }"
      >
        {{ characterCount }}/{{ maxLength }}
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { QuillEditor } from '@vueup/vue-quill';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  
  const props = defineProps({
    id: { type: String, default: ''},
    modelValue: { type: String, default: ''},
    placeholder: {type: String, default: null},
    mandatory: { type: Boolean, default: false },
    maxLength: { type: Number, default: 25 },
    showCounter: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    countType: { type: String, default: 'absolute' },
    minHeight: { type: String, default: null }
  });
  
    const emit = defineEmits(['update:modelValue', 'validation']);
    const isValid = ref(true);
    const characterCount = ref(0);
  
    const content = ref(props.modelValue)
    const quillRef = ref(null);
    const isFocused = ref(false);
    
  
  onMounted(() => {
    // console.log('mounted editor',props.modelValue)
    if(props.modelValue){
      characterCount.value = props.modelValue.length
    }
  })
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['link'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }], 
    [{ 'align': [] }]
  ];
  
  const onTextChange = () => {
    const editor = quillRef.value.getQuill();
    const plainText = quillRef.value.getText().trim(); // Obtiene el texto plano del editor
    characterCount.value = plainText.length;
    // console.log('editor',editor.history)
    if (characterCount.value > props.maxLength) {
      editor.history.undo(); // Deshace la última operación
      characterCount.value = props.maxLength;
    } else {
      isValid.value = (plainText !== '');
      emptyEditor();
      emit('update:modelValue', editor.root.innerHTML); // Actualiza el valor del modelo con el HTML
      emit('validation', isValid.value);
    }
  };

  
  const emptyEditor = () => {
    if (content.value === "<p><br></p>") {
      characterCount.value = 0;
      isValid.value = false;
    }
  }

  const onFocus = () => {
    isFocused.value = true;
  }

  const onBlur = () => {
    isFocused.value = false;
  }
  
  
  watch(() => props.modelValue, (newValue) => {
      content.value = newValue;
      emptyEditor()
      // console.log('content.value',content.value)
    });

  </script>
  <style lang="scss">
  #editor-quill{
    .ql-container.ql-snow, .ql-toolbar.ql-snow{
      border: 0;
    }
    .ql-toolbar.ql-snow{
      background-color: #f2f2f2;
    }
  }
    
    .editor-is-empty {
      border: 2px solid #ccc;
    }
    
    .editor-is-focused {
      border: 2px solid var(--h-green-600);
    }
    
    .editor-is-invalid {
      border: 2px solid #FF6666;
    }
    
    .padding-with-counter .ql-editor {
      padding: 12px 52px 12px 12px;
    }
    
    .padding-without-counter .ql-editor {
      padding: 12px;
    }
    
    .character-count {
      position: absolute;
      top: 52px;
      right: 12px;
      color: #333;
      font-size: 14px;
    }
    
    .character-count-static {
      position: static;
      text-align: right;
      margin-top: 8px;
      font-size: 12px;
      line-height: 90%;
      color: #A0A0A0;
    }

    .quill-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}


  .ql-editor {
  overflow-y: hidden; /* Evita el scroll vertical */
}

#editor-quill  .ql-editor.ql-blank::before {
  padding: 12px;
  top: 0px;
  left: 0px;
  right: 0px;
  color: var(--font-secondary);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 21px */
}

#editor-quill .ql-container > .ql-editor {
  min-height: var(--editorMinHeight);
}

#editor-quill .ql-container:focus{
  background-color: navy;
}

#editor-quill .ql-editor p{
  color: var(--h-black-100);
  font-size: 14px;
  font-weight: 500;
  line-height: 150%; /* 19.6px */
}
  </style>
  