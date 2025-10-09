import React from 'react';

const SubmitButton = ({ loading }: { loading: boolean }) => (
    <div className=" col-span-2" id="form-customer-address">
        <button type="submit" className="block w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400" disabled={loading}>
            {loading ? 'Memproses...' : 'Lanjutkan Pembayaran dan Kirim Naskah'}
        </button>
    </div>
);

export default SubmitButton;