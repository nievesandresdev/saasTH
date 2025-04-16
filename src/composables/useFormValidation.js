import { ref, computed } from 'vue';

export function useFormValidation(form, rules) {
  const errors = ref({});
  const requiredFields = ref({});

  const processRule = (rule) => {
    if (!rule) return null;

    if (typeof rule === 'object' && !Array.isArray(rule)) {
      return {
        required: rule.required ?? false,
        validator: rule.validator,
        message: rule.message
      };
    }
    if (typeof rule === 'function') {
      return {
        required: false,
        validator: rule,
        message: ''
      };
    }
    return null;
  };

  // Inicializar los campos requeridos
  Object.entries(rules).forEach(([field, fieldRules]) => {
    if (Array.isArray(fieldRules)) {
      const firstRule = processRule(fieldRules[0]);
      if (firstRule) {
        requiredFields.value[field] = firstRule.required;
      }
    }
  });

  const validateField = (field) => {
    errors.value[field] = '';
    const fieldRules = rules[field];

    if (Array.isArray(fieldRules)) {
      const firstRule = processRule(fieldRules[0]);
      if (firstRule?.required || form[field]) {
        for (let rule of fieldRules) {
          const processedRule = processRule(rule);
          if (processedRule) {
            const validationResult = processedRule.validator(form[field]);
            if (validationResult !== true) {
              errors.value[field] = processedRule.message || validationResult;
              break;
            } else {
              errors.value[field] = true;
            }
          }
        }
      } else {
        errors.value[field] = true;
      }
    }
  };

  const formInvalid = computed(() => {
    let hasErrors = false;
    
    Object.entries(rules).forEach(([field, fieldRules]) => {
      if (Array.isArray(fieldRules)) {
        const firstRule = processRule(fieldRules[0]);
        if (firstRule?.required || form[field]) {
          for (let rule of fieldRules) {
            const processedRule = processRule(rule);
            if (processedRule) {
              const validationResult = processedRule.validator(form[field]);
              if (validationResult !== true) {
                hasErrors = true;
                break;
              }
            }
          }
        }
      }
    });

    return hasErrors;
  });

  const formIsFull = computed(() => {
    let isComplete = true;
    
    Object.entries(rules).forEach(([field, fieldRules]) => {
      if (Array.isArray(fieldRules)) {
        const firstRule = processRule(fieldRules[0]);
        if (firstRule?.required) {
          for (let rule of fieldRules) {
            const processedRule = processRule(rule);
            if (processedRule) {
              const validationResult = processedRule.validator(form[field]);
              if (validationResult !== true) {
                isComplete = false;
                break;
              }
            }
          }
        }
      }
    });

    return isComplete;
  });

  const validateAllFields = () => {
    Object.keys(rules).forEach(field => {
      validateField(field);
    });
  };

  return {
    errors,
    validateField,
    formInvalid,
    formIsFull,
    validateAllFields,
    requiredFields
  };
}