
import React from 'react';
import { User } from '@/types/user';

const UserInfo = ({ user }: { user: User | null }) => (
    <>
        <div className="mb-2" id="form-customer-name">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">Nama Lengkap beserta Gelar</label>
            <input type="text" name="fullname" id="fullname" className="input" readOnly value={user?.full_name || ''} />
        </div>
        <div className="mb-2" id="form-customer-phone">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">No. Telepon</label>
            <input type="number" name="phone" id="phone" className="input" readOnly value={user?.phone_number || ''} />
        </div>
    </>
);

export default UserInfo;
