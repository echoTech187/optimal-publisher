import React from 'react';
import StyledTextareaField from './StyledTextareaField';

const Address = ({title, value, onChange, error}: {title?: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, error?: string}) => (
    <div className="mb-4 max-md:col-span-1 md:col-span-2" id="form-customer-address">
        <StyledTextareaField
            label={title ? title :"Alamat pengiriman Buku Fisik"}
            name="address"
            placeholder="Alamat"
            required
            value={value}
            onChange={onChange}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

export default Address;