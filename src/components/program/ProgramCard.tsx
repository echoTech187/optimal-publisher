'use client';

import { getImageUrl } from "@/lib/utils/image";
import { Program } from "@/types/program";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

const ProgramCard = ({ program }: { program: Program }) => {
    const [selected, setSelected] = useState(false);
    const router = useRouter(); // Initialize useRouter

    const handleClick = () => {
        setSelected(!selected);
        // Assuming the old program page URL is /program/[id]
        // You might need to adjust this URL based on your actual routing
        router.push(`/pack?key=${program.id}`);
    };

    return (
        <>
            <div
                className={`max-md:hidden program-card bg-white dark:bg-gray-800 rounded-lg hover:shadow-2xl p-6 mb-6 flex flex-col items-center justify-center text-left cursor-pointer group ${selected ? 'selected' : ''}`}
                onClick={handleClick} // Use the new handleClick function
            >
                <Image src={getImageUrl(program.images)} loading="lazy" alt={program.program_name} width={150} height={150} className="mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{program.program_name}</h3>
                <p className="text-center text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {program.program_description}
                </p>
            </div>

            <div className="md:hidden program-card bg-white dark:bg-gray-800 rounded-lg hover:shadow-2xl p-4 flex items-center justify-center text-left cursor-pointer group gap-4" onClick={handleClick} >
                <div className="w-1/3 h-24">
                <Image src={getImageUrl(program.images)} loading="lazy" alt={program.program_name} width={150} height={150} className="object-cover" />
                </div>
                <div className="w-2/3 flex flex-col justify-start items-start h-full">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white h-12 line-clamp-2 overflow-hidden">{program.program_name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 overflow-hidden">
                        {program.program_description}
                    </p>
                </div>
            </div>
        </>
    )
}

export default ProgramCard;