
"use client";

import FormProgramPrivate from "@/components/forms/FormProgramPrivate";
import { User } from "@/types/user";

export default function SinglePack(props: { data: any, user: User }) {
    const { data, user } = props;

    return (
        <section className="w-full h-full py-[150px]">
            <FormProgramPrivate data={data[0]} user={user} />
        </section>
    )
}
