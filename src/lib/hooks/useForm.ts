import { useState } from "react";

// Define types for better code quality and maintainability

type ValidationRules<T> = {
    [K in keyof T]?: (value: T[K], formState: T) => string;
};

type Errors<T> = {
    [K in keyof T]?: string;
};

/**
 * A custom hook for handling form state and validation with TypeScript.
 *
 * @param initialState - The initial state of the form.
 * @param validationRules - An object where keys are field names
 *   and values are functions that return a validation error message or an empty string.
 * @returns {object} - { form, errors, handleInputChange }
 */
export function useForm<T extends Record<string, any>>(
    initialState: T,
    validationRules?: ValidationRules<T>
) {
    const [form, setForm] = useState<T>(initialState);
    const [errors, setErrors] = useState<Errors<T>>(() => {
        const initialErrors: Errors<T> = {};
        for (const key in initialState) {
            initialErrors[key as keyof T] = "";
        }
        return initialErrors;
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

        if (validationRules && validationRules[name as keyof T]) {
            const validator = validationRules[name as keyof T];
            if (validator) {
                const error = validator(value as T[keyof T], form as T);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: error,
                }));
            }
        }
    };

    return {
        form,
        errors,
        handleInputChange,
    };
}