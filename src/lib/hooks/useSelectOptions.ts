// src/lib/hooks/useSelectOptions.ts
'use client';

import { FormField } from '@/types/program';
import { useState, useEffect } from 'react';

interface SelectOption {
    value: string;
    label: string;
}

export const useSelectOptions = (field: FormField, formData: any, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void) => {
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [loading, setLoading] = useState(false);

    const parentValue = field.depends_on_field ? formData[field.depends_on_field] : null;

    // Effect for fetching options from an API
    useEffect(() => {
        if (!field.source_url) return;

        if (field.depends_on_field && !parentValue) {
            setOptions([]);
            return;
        }

        const fetchOptions = async () => {
            setLoading(true);
            let url = field.source_url!;

            if (field.depends_on_field && field.depends_on_param && parentValue) {
                url += `/${parentValue}`;
            }

            try {
                const response = await fetch(url);
                const data = await response.json();
                const mappedOptions = data.map((item: any) => ({
                    value: item[field.source_value_field || 'id'],
                    label: item[field.source_label_field || 'name']
                }));
                setOptions(mappedOptions);
            } catch (e) {
                console.error("Failed to fetch options:", e);
                setOptions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, [field.source_url, field.depends_on_field, field.depends_on_param, field.source_value_field, field.source_label_field, parentValue]);

    // Effect for handling options from a static JSON string
    useEffect(() => {
        if (field.options) {
            try {
                const parsedOptions = JSON.parse(field.options);
                const mappedOptions = parsedOptions.map((item: any) => ({
                    value: item[field.source_value_field || 'id'],
                    label: item[field.source_label_field || 'name']
                }));
                setOptions(mappedOptions);
            } catch (e) {
                console.error("Failed to parse static options JSON:", e);
                setOptions([]);
            }
        }
    }, [field.options, field.source_value_field, field.source_label_field]);


    // Effect for resetting the current field's value if the parent dependency changes
    useEffect(() => {
        // Ensure this runs only when a parent value changes, not on initial load
        if (field.depends_on_field && formData[field.name] !== '') {
            // Create a synthetic event to clear the value
            const syntheticEvent = {
                target: {
                    name: field.name,
                    value: ''
                }
            } as React.ChangeEvent<HTMLSelectElement>;
            onChange(syntheticEvent);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parentValue]);


    const isDisabled = loading || (field.depends_on_field && !parentValue);

    return { options, loading, isDisabled };
};
