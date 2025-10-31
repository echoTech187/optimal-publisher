
import React from 'react';
import { User } from '@/types/user';

const UserInfo = ({ user }: { user?: User | null }) => (
    <>
        <div id="form-customer-name" className='mb-4 max-md:col-span-2 md:col-span-1'>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">Nama Lengkap beserta Gelar</label>
            <input type="text" name="fullname" id="fullname" className="input rounded-md" readOnly={user ? true : false} value={user?.full_name || ''} />
        </div>
        <div id="form-customer-phone" className='mb-4 max-md:col-span-2 md:col-span-1'>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">No. Telepon</label>
            <input type="number" name="phone" id="phone" className="input rounded-md" readOnly={user ? true : false} value={user?.phone_number || ''} />
        </div>
    </>
);

export default UserInfo;
