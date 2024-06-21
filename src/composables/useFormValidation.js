import { ref, computed } from 'vue';

export function useFormValidation(form, rules) {
  const errors = ref({});

  const validateField = (field) => {
    errors.value[field] = ''; // Limpiar errores anteriores
    const fieldRules = rules[field];
    if (fieldRules) {
      for (let rule of fieldRules) {
        const validationResult = rule(form[field]);
        if (validationResult !== true) {
          errors.value[field] = validationResult;
          break; // Detener la validación en el primer error
        } else {
            errors.value[field] = true;
        }
      }
    }
  };

  const validateForm = () => {
    errors.value = {}; // Limpiar errores anteriores
    Object.keys(rules).forEach(field => validateField(field));
    return Object.keys(errors.value).every(field => errors.value[field] === '');
  };

  const formInvalid = computed(() => {
      let error = Object.keys(errors.value).some(field => typeof errors.value?.[field] === 'string')
      return error
  })

//   const submitForm = (onSuccess, onFail) => {
//     if (validateForm()) {
//       onSuccess(form.value); // Pasar el formulario validado a la función de éxito
//     } else {
//       onFail(errors.value); // Pasar los errores a la función de fallo
//     }
//   };

  return { errors, validateField, formInvalid };
}