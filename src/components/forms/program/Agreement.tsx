
import React from 'react';

const Agreement = () => (
    <div className="mb-2 col-span-2 join items-center gap-4" id="form-customer-address">
        <input type="checkbox" name="aggrement" id="aggrement" value="1" className="checkbox" required />
        <label className="block text-gray-700 text-sm" htmlFor="aggrement">Dengan ini saya menyatakan bahwa data yang saya masukan adalah benar dan dapat dipertanggung jawabkan. Serta saya telah membaca dan menyetujui Syarat dan Ketentuan yang berlaku.</label>
    </div>
);

export default Agreement;
