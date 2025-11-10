
import { User } from '@/types/user';
import React from 'react';

const HiddenInputs = ({ data, user, manuscript }: { data: any, user: User, manuscript?: string | null }) => (
    <>
        <input type="hidden" name="user_id" value={user.id} id="user_id" />
        <input type="hidden" name="type" value={data.isbn_program_id} />
        <input type="hidden" name="package_id" value={data.id} />
        <input type="hidden" name="package_name" value={data.description} />
        <input type="hidden" name="price" value={Number(data.price)} />
        <input type="hidden" name="manuscript" value={manuscript || ''} />
    </>
);

export default HiddenInputs;
