// File: @/src/components/forms/GenerateFormFields.tsx
// Deskripsi: Komponen tingkat tinggi untuk menampilkan pilihan paket dan formulir dinamis.
// Semua sub-komponen dan logika form telah diekstrak ke file terpisah.

"use client";

import React, { useState, useEffect } from 'react';
import { ProgramPackage } from "@/types/program";
import { User } from "@/types/user";

// Impor komponen-komponen yang relevan
import FormHeader from "./program/FormHeader";
import Packages from "../pack/Packages";
import DynamicFormFields from '@/components/pack/DynamicFormFields'; // Komponen utama yang sudah di-refactor

export default function GenerateFormFields({ packages, user }: { packages: ProgramPackage[], user: User }) {
    const [selectedPackage, setSelectedPackage] = useState<ProgramPackage | null>(null);

    useEffect(() => {
        // Secara otomatis memilih paket jika hanya ada satu
        if (packages && packages.length === 1) {
            setSelectedPackage(packages[0]);
        }
    }, [packages]);

    const handlePackageSelect = (pkg: ProgramPackage) => {
        setSelectedPackage(pkg);
    };

    if (!packages || packages.length === 0) {
        return <div className="text-center p-12">Tidak ada paket yang tersedia.</div>;
    }

    return (
        <section className="w-full h-full py-24 lg:py-32">
            <div className="bg-white">
                {/* Tampilkan pilihan paket hanya jika ada lebih dari satu */}
                {packages.length > 1 && (
                    <Packages
                        packages={packages}
                        user={user}
                        onSelect={handlePackageSelect}
                        selectedSlug={selectedPackage ? selectedPackage.slug : null}
                    />
                )}
            </div>

            {/* Render form dinamis untuk paket yang dipilih */}
            {selectedPackage && (
                <div className="container mx-auto">
                    <div id="informasi-pemesanan">
                        <FormHeader
                            title="Informasi Pemesanan"
                            description={selectedPackage.description}
                        />
                    </div>
                    <div className="bg-white p-6">
                        <DynamicFormFields
                            user={user}
                            formClassName={selectedPackage.form_class_name}
                            selectedPackage={selectedPackage}
                            formFields={selectedPackage.form_fields || []}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}

