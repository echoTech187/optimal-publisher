
import React from 'react';

const Address = ({title}: {title?: string}) => (
    <>
        <div className="mb-4 max-md:col-span-1 md:col-span-2" id="form-customer-address">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">{title ? title :"Alamat pengiriman Buku Fisik"}</label>
            <textarea className="textarea rounded-md" name="address" id="address" placeholder="Alamat" required aria-placeholder="Masukan Alamat Pengiriman"></textarea>
        </div>
    </>
);

export default Address;
