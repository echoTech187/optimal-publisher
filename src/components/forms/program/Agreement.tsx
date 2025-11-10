
import React from 'react';

const Agreement = ({required = true, description, checked, onChange}: {required?: boolean; description?: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) => (
    <div className="mb-2 col-span-2 join items-center gap-4" id="form-customer-address">
        <input type="checkbox" name="aggrement" id="aggrement" value="1" className="checkbox" required={required} checked={checked} onChange={onChange} />
        <label className="block text-gray-700 text-sm" htmlFor="aggrement">{required && <span className="text-red-500">*)</span>} {description || "Dengan ini saya menyatakan bahwa data yang saya masukan adalah benar dan dapat dipertanggung jawabkan. Serta saya telah membaca dan menyetujui Syarat dan Ketentuan yang berlaku."}</label>
    </div>
);

export default Agreement;
