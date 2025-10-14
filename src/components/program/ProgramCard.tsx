
import Image from "next/image";
import Link from "next/link";

interface Program {
    id: number;
    program_name: string;
    program_description: string;
    images: string;
}

import { getImageUrl } from "@/lib/utils/image";

const ProgramCard = ({ program }: { program: Program }) => {
    const imageUrl = getImageUrl(program.images);

    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <figure style={{ height: '400px', position: 'relative' }}>
                <Image
                    priority
                    src={imageUrl}
                    alt={program.program_name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{program.program_name}</h2>
                <p className="line-clamp-3">{program.program_description}</p>
                <div className="card-actions justify-center">
                    <Link href={`/pack?key=${program.id}`} className="block w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline text-center">
                        Lanjutkan
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProgramCard;
