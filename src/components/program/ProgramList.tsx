
import ProgramCard from "./ProgramCard";

interface Program {
    id: number;
    program_name: string;
    program_description: string;
    images: string;
}

const ProgramList = ({ programs }: { programs: Program[] }) => {
    return (
        <section className="w-full h-auto py-[150px] px-4 max-w-[1300px] mx-auto">
            <header className="relative mb-24 text-center">
                <h1 className="text-4xl anton mb-4 z-10 text-gray-700 dark:text-gray-50 leading-tight">Program Unggulan</h1>
                <p>Pilih program yang sesuai dengan kebutuhanmu</p>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                {programs.length > 0 ? (
                    programs.map((program) => (
                        <ProgramCard key={program.id} program={program} />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        <p>Tidak ada program yang tersedia saat ini.</p>
                    </div>
                )}
            </main>
        </section>
    );
}

export default ProgramList;
