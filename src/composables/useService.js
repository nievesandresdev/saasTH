export const useService = () => {

    const validCharacteristics = (form) => {
        let inputsValidate = {
            price: {
                validator: (value, inputActive) => {
                    if (!inputActive) {
                        return !!value;
                    }
                    return true;
                },
                isValidated: false
            },
            duration: {
                validator: (value, inputActive) => {
                    return !inputActive || !!value;
                },
                isValidated: false
            },
            address: {
                validator: (value, inputActive) => {
                    return !inputActive || !!value;
                },
                isValidated: false
            },
            requeriment: {
                validator: (value, inputActive) => {    
                    return !inputActive || !!value;
                },
                isValidated: false
            },
            availability: {
                validator: (value, inputActive) => {
                    return !inputActive || !!value;
                },
                isValidated: false
            },
            languages: {
                validator: (value, inputActive) => {
                    return !inputActive || value.length > 0;
                },
                isValidated: false
            }
        };

        const validationResults = {};

        for (let input of Object.keys(inputsValidate)) {
            const isFieldVisible = form.fields_visibles.includes(input.toUpperCase());
            const value = form[input];
            const validationResult = inputsValidate[input].validator(value, isFieldVisible);
            
            validationResults[input] = {
                isVisible: isFieldVisible,
                value: value,
                isValid: validationResult
            };

            inputsValidate[input].isValidated = validationResult;

        }
        
        let isValidate = Object.values(inputsValidate).every(input => input.isValidated);
        return !isValidate;
    }

    const resetPriceFree = (form) => {
        if (form.fields_visibles.includes('PRICE')) {
            form.price = null;
        }
    }

    return {
        validCharacteristics,
        resetPriceFree
    }
}