import React from 'react';
import type { Major, Institution } from '@/types/form';
import StyledSelectField from './StyledSelectField'; // Corrected import to the simple, local component
import StyledInputField from './StyledInputField';

interface ProgramSelectionProps {
    institution: Institution[];
    majors: Major[];
    loading: boolean;
    form: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    error: any;
}
const InfoOther: React.FC<ProgramSelectionProps> = ({
    institution,
    majors,
    loading,
    form,
    onChange,
    error,
}) => {
    return (
        <>
            <div id="form-institution" className="mb-4 max-md:col-span-2 md:col-span-1">
                <StyledSelectField
                    label="Asal Kampus/Institusi"
                    name="institution"
                    value={form.institution}
                    onChange={onChange}
                    disabled={loading}
                    required
                >
                    <option value="">Pilih Asal Kampus/Institusi</option>
                    {institution.map((inst) => (
                        <option key={inst.id} value={inst.id}>
                            {inst.name}
                        </option>
                    ))}
                </StyledSelectField>
                {error.institution && <p className="text-red-500 text-sm mt-1">{error.institution}</p>}
            </div>
            <div id="form-major" className="mb-4 max-md:col-span-2 md:col-span-1">
                <StyledSelectField
                    label="Jurusan"
                    name="major"
                    value={form.major}
                    onChange={onChange}
                    disabled={loading}
                    required
                >
                    <option value="">Pilih Jurusan</option>
                    {majors.map((major) => (
                        <option key={major.id} value={major.id}>
                            {major.major_name}
                        </option>
                    ))}
                </StyledSelectField>
                {error.major && <p className="text-red-500 text-sm mt-1">{error.major}</p>}
            </div>
            <div id="form-city" className="mb-4 max-md:col-span-2 md:col-span-1">
                <StyledInputField
                    label="Kota/Provinsi/Kabupaten"
                    name="city"
                    placeholder="Kota/Provinsi/Kabupaten"
                    value={form.city}
                    onChange={onChange}
                    required
                />
                {error.city && <p className="text-red-500 text-sm mt-1">{error.city}</p>}
            </div>
        </>
    )
}

export default InfoOther;
