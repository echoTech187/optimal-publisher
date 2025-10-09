import React from 'react';

const Address = () => (
    <>
        <div className="col-span-full" id="form-customer-address">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Alamat pengiriman buku fisik</label>
            <textarea className="textarea" name="address" id="address" placeholder="Alamat" required aria-placeholder="Masukan Alamat Pengiriman"></textarea>
        </div>
    </>
);

export default Address;