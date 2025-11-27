// src/lib/utils/validation.ts

/**
 * Validates a single field value against a set of rules.
 * @param value The value to validate.
 * @param rulesString The rules, separated by newlines (e.g., "required\nmax:255").
 * @returns A string with the error message if validation fails, otherwise null.
 */
export const validateField = (value: any, rulesString: string | undefined): string | null => {
    if (!rulesString) return null;
    const rules = rulesString.split('\n');

    for (const rule of rules) {
        if (rule === 'required' && (!value || (Array.isArray(value) && value.length === 0))) {
            return "Kolom ini tidak boleh kosong.";
        }
        if (value && rule.startsWith('max:')) {
            const max = parseInt(rule.split(':')[1], 10);
            if (typeof value === 'string' && value.length > max) {
                return `Tidak boleh lebih dari ${max} karakter.`;
            }
        }
        if (value && rule === 'number' && isNaN(Number(value))) {
            return "Kolom ini harus berupa angka.";
        }
        // Add more validation rules here as needed
    }
    return null;
};
