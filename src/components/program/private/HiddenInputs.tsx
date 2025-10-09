import { User } from '@/types/user';
import React from 'react';

const HiddenInputs = ({ data, user }: { data: any, user: User }) => (
    <>
        <input type="hidden" name="user_id" value={user.id} id="user_id" />
        <input type="hidden" name="type" value={data.isbn_program_id} />
        <input type="hidden" name="package_id" value={data.id} />
        <input type="hidden" name="package_name" value={data.name} />
        <input type="hidden" name="price" value={Number(data.price)} />
    </>
);

export default HiddenInputs;