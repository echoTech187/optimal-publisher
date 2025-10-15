'use client';

import { getImageUrl } from "@/lib/utils/image";
import { Program } from "@/types/program";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

const ProgramCard = ({ program }: { program: Program }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 flex flex-col sm:flex-row items-center sm:justify-between">
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left mb-4 sm:mb-0 flex-1">
                <Image src={getImageUrl(program.images)} loading="lazy" alt={program.program_name} width={80} height={80} className="rounded-lg mb-4 sm:mb-0 sim:w-20 sm:h-20" />
                <div className="sm:ml-6 flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{program.program_name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{program.program_description}</p>
                    <button className="text-indigo-600 hover:text-indigo-800 self-center mt-4 sm:mt-0 flex items-center gap-2 justify-end w-full">
                        <Icon icon="lineicons:chevron-right-circle" width="42" height="42" />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ProgramCard;