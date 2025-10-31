
"use client";

import { User } from "@/types/user";
import SinglePack from "./SinglePack";
import MultiPack from "./MultiPack";
import MonografPack from "./MonografPack";

interface ProgramPackage {
    id: number;
    name: string;
    category_id: number;
    // ... other properties
}

export default function PackView({ packages, user }: { packages: ProgramPackage[], user: User }) {
    if (packages.length === 0) {
        // This can be a more user-friendly component
        return <div className="text-center py-40 text-lg text-gray-600 dark:text-gray-300">Paket tidak ditemukan.</div>;
    }

    const categoryId = packages[0].category_id;

    if (categoryId === 2) {
        return <MultiPack data={packages} user={user} />;
    }

    if (categoryId === 3) {
        return <MonografPack data={packages} user={user} />;
    }

    return <SinglePack data={packages} user={user} />;
}
