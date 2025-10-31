
import React from 'react';
import type { Major, Institution} from '@/types/form';

interface ProgramSelectionProps {
    institution: Institution[];
    majors: Major[];
    loading: boolean;
}
const InfoOther: React.FC<ProgramSelectionProps> = ({
    institution,
    majors,
    loading,
}) => {
    return (
    <>
        <div id="form-institution" className="mb-4 max-md:col-span-2 md:col-span-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="institution">Asal Kampus/Institusi</label>
            <select className="select rounded-md" name="institution" id="institution" disabled={loading}>
                <option value="">Pilih Asal Kampus/Institusi</option>
                {institution.map((inst) => (
                    <option key={inst.id} value={inst.id}>
                        {inst.name}
                    </option>
                ))}
            </select>
        </div>
        <div id="form-major" className="mb-4 max-md:col-span-2 md:col-span-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="major">Jurusan</label>
            <select className="select rounded-md" name="major" id="major" disabled={loading}>
                <option value="">Pilih Jurusan</option>
                {majors.map((major) => (
                    <option key={major.id} value={major.id}>
                        {major.major_name}
                    </option>
                ))}
            </select>
        </div>
        <div id="form-city" className="mb-4 max-md:col-span-2 md:col-span-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">Kota/Provinsi/Kabupaten</label>
            <input type="text" name="city" id="city" className="input rounded-md" />
        </div>
    </>
    )
}

export default InfoOther;
