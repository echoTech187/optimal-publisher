import { useState } from "react";

/**
 * A custom hook for handling form state and validation.
 *
 * @param {object} initialState - The initial state of the form.
 * @param {object} validationRules - An object where keys are field names
 *   and values are functions that return a validation error message or an empty string.
 * @returns {object} - { form, errors, handleInputChange }
 */
export function useForm(initialState, validationRules) {
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState(() => {
        const initialErrors = {};
        for (const key in initialState) {
            initialErrors[key] = "";
        }
        return initialErrors;
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));

        if (value === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "",
            }));
            return;
        }

        if (validationRules && validationRules[name]) {
            const error = validationRules[name](value, form);
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: error,
            }));
        }
    };

    return {
        form,
        errors,
        handleInputChange,
    };
}
