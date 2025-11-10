
import React from 'react';
import { User } from '@/types/user';
import StyledInputField from './StyledInputField';

const UserInfo = ({ user }: { user?: User | null }) => (
    <>
        <div id="form-customer-name" className='mb-4 max-md:col-span-2 md:col-span-1'>
            <StyledInputField
                required={true}
                label="Nama Lengkap beserta Gelar"
                name="fullname"
                placeholder="Nama Lengkap"
                readOnly={!!user}
                value={user?.full_name || ''}
            />
        </div>
        <div id="form-customer-phone" className='mb-4 max-md:col-span-2 md:col-span-1'>
            <StyledInputField
                required={true}
                label="No. Telepon"
                name="phone"
                placeholder="No. Telepon"
                type="number"
                readOnly={!!user}
                value={user?.phone_number || ''}
            />
        </div>
    </>
);

export default UserInfo;
