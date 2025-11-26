import React from "react";
import { FormField } from "@/types/program";
import StyledInputRepeaterField from "./StyledInputRepeaterField";
import { Icon } from '@iconify/react'; // Tambahkan Icon import jika digunakan

// --- Props Interface ---

interface StyledRepeaterFieldProps {

    field: FormField;

    required?: boolean;

    value: any[]; // Value sekarang adalah array of objects

    onChange: (e: { target: { name: string, value: any[] } }) => void; // onChange untuk array

    firstItemReadOnly?: boolean; // New prop for read-only status of the first item

}



const StyledRepeaterField: React.FC<StyledRepeaterFieldProps> = ({ field, value, onChange, firstItemReadOnly }) => {



    // Fungsi untuk mengubah nilai di dalam item repeater tertentu

    const handleItemChange = (itemIndex: number, subFieldName: string, subFieldValue: string) => {

        // Ensure that the value array has enough items to update

        const currentItems = value.length > itemIndex ? [...value] : Array(itemIndex + 1).fill({});

        const newValue = currentItems.map((item: any, idx: number) => {

            if (idx === itemIndex) {

                return { ...item, [subFieldName]: subFieldValue };

            }

            return item;

        });

        onChange({ target: { name: field.name, value: newValue } });

    };



    // Determine the fixed number of items to render

    const repeaterCount = field.repeater_count_field ? parseInt(field.repeater_count_field.toString(), 10) : 1;

    const itemsToRender = Array.from({ length: repeaterCount }, (_, i) => i);





    return (

        <div className="mb-2 border border-gray-100 rounded-lg col-span-2 p-4">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <label className="block text-gray-700 text-lg font-bold" htmlFor="members_name_0">Daftar Anggota <small className="text-sxs text-gray-500 font-normal">(Opsional)</small></label>
                    <p className="text-sm text-gray-500">Masukan anggota penulis dengan nama lengkap beserta gelar dan no. telepon yang sesuai</p>
                </div>
            </div>

            <div className="mb-2" id={field.name}>

                {itemsToRender.map((itemIndex: number) => {

                    const item = value[itemIndex] || {}; // Get existing item or an empty object

                    return (

                        <div key={itemIndex} className="w-full member-item mb-4">

                            <h4 className="font-semibold col-span-full mb-2">Daftar Anggota #{itemIndex + 1}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full member-item mb-4">
                                {(field.repeater_fields || []).map((subField: any, subFieldIndex: number) => (

                                    <div key={subFieldIndex} className={subField.field_class_name}>

                                        <StyledInputRepeaterField
                                            key={subFieldIndex}
                                            fieldKey={subFieldIndex}
                                            repeaterFields={subField}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleItemChange(itemIndex, subField.name, e.target.value)}
                                            value={item[subField.name] || ''} // Use value from the current item
                                            readOnly={itemIndex === 0 && firstItemReadOnly} // Pass readOnly prop conditionally
                                        />

                                    </div>

                                ))}
                            </div>
                        </div>

                    );

                })}

            </div>

            {/* Add button is not needed for fixed items */}

            {field.required_frontend && !value.length && <p className="text-red-500 text-xs mt-1">{field.label} wajib memiliki setidaknya satu anggota.</p>}

        </div>

    );

}

export default StyledRepeaterField;