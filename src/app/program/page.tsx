"use client";

import { useState, useEffect, useRef } from "react";
import { imageUrl, baseUrl } from "../constants/api";

export default function ProgramList() {
    const [programs, setPrograms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const isFetched = useRef(false);
    useEffect(() => {
        if (isFetched.current) return;
        isFetched.current = true;
        const fetchPrograms = async () => {
            try {
                const response = await fetch(baseUrl + '/programs', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                console.log(data);
                setPrograms(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching programs:', error);
                setIsLoading(false);
            }
        };

        fetchPrograms();
    }, []);

    return (<>
        <section className="w-full h-auto py-[150px] px-4 max-w-[1300px] mx-auto 2xl:px-0" id="program">
            <header className="relative mb-24 text-center">
                <h1 className="text-4xl anton mb-4 z-10 text-gray-700 dark:text-gray-50 leading-tight">Program Unggulan</h1>
                <p>Pilih program yang sesuai dengan kebutuhanmu</p>
            </header>
            {
                isLoading ? (
                    <div className="w-full h-full text-lg font-bold text-gray-600  flex items-center justify-center text-center bg-white z-50 dark:bg-gray-800 dark:text-gray-50 ">Memuat data...</div>
                ) :
                    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                        {
                            programs.map((program: any) => {
                                return (
                                    <div className="card w-full bg-base-100 shadow-xl" key={program.id}>
                                        <figure><img src={`${imageUrl}/` + program.images} alt={program.program_name} className="image-full" /></figure>
                                        <div className="card-body">
                                            <h2 className="card-title">{program.program_name}</h2>
                                            <p>{program.program_description}</p>
                                            <div className="card-actions justify-center">
                                                <button onClick={() => window.location.href = program.program_redirect} className="block w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">Lanjutkan</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })

                        }

                    </main>
            }

        </section>
    </>)
}