
"use client";
import React from 'react';
import { User } from '@/types/user';
import StyledInputField from './StyledInputField';

const UserInfoMonograf = ({ user, memberCount, form, onChange, error }: { user: User | null, memberCount: number | 1, form: any, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, error: any }) => {

    const changeWritter = (checked: boolean) => {
        if (checked) {
            const chiefName = (document.getElementById('chief_writer') as HTMLInputElement).value;
            const chiefPhone = (document.getElementById('writter_phone') as HTMLInputElement).value;
            (document.getElementById('members_name_0') as HTMLInputElement).value = chiefName;
            (document.getElementById('members_phone_0') as HTMLInputElement).value = chiefPhone;
        } else {
            (document.getElementById('members_name_0') as HTMLInputElement).value = "";
            (document.getElementById('members_phone_0') as HTMLInputElement).value = "";
        }
    }
    return (<>
        <div className="mb-2 col-span-2" id="form-title">
            <StyledInputField
                label="Judul Monograf"
                name="title"
                placeholder="Judul Monograf"
                value={form.title}
                onChange={onChange}
                required
            />
            {error.title && <p className="text-red-500 text-sm mt-1">{error.title}</p>}
        </div>
        <div className="mb-2 col-span-2 md:col-span-1" id="form-chief-writer">
            <StyledInputField
                label="Nama Lengkap beserta Gelar (Penulis Utama)"
                name="chief_writer"
                placeholder="Nama Lengkap"
                value={form.chief_writer}
                onChange={onChange}
                required
            />
            {error.chief_writer && <p className="text-red-500 text-sm mt-1">{error.chief_writer}</p>}
        </div>
        <div className="col-span-2 md:col-span-1" id="form-chief-phone">
            <StyledInputField
                label="No. Telepon"
                name="writter_phone"
                placeholder="No. Telepon"
                value={form.writter_phone}
                onChange={onChange}
                required
            />
            {error.writter_phone && <p className="text-red-500 text-sm mt-1">{error.writter_phone}</p>}
        </div>
        <div className="mb-2 col-span-2 join items-center gap-4 -mt-4" id="form-members-too">
            <input type="checkbox" name="members_too" id="members_too" className="checkbox checkbox-sm" value={"true"} onChange={(e) => changeWritter(e.target.checked)} />
            <label className="block text-gray-700 text-sm" htmlFor="members_too">Termasuk Anggota? Klik untuk menempatkan anggota ke dalam anggota utama</label>
        </div>

        <div className="mb-2 border border-gray-300 rounded-md col-span-2 p-4">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <label className="block text-gray-700 text-lg font-bold" htmlFor="members_name_0">Daftar Anggota <small className="text-sxs text-gray-500 font-normal">(Opsional)</small></label>
                    <p className="text-sm text-gray-500">Masukan anggota penulis dengan nama lengkap beserta gelar dan no. telepon yang sesuai</p>
                </div>
                {/* <button type="button" className="bg-fuchsia-800 flex items-center hover:bg-fuchsia-700 text-sm text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" id="add-member">
                                    <Icon icon="material-symbols:add" width="24" height="24" className="size-5" /> Tambah Anggota
                                </button> */}
            </div>
            <div className="mb-2" id="members">
            {
                Array.from({ length: memberCount }, (_, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full member-item mb-4">
                        <div className="mb-2 w-full">
                            <StyledInputField
                                label={`Nama Lengkap beserta Gelar (Anggota ${i + 1})`}
                                name={`members_name_${i}`}
                                placeholder="Masukan Nama Anggota"
                                value={form[`members_name_${i}`]}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-2">
                            <StyledInputField
                                label="No. Telepon"
                                name={`members_phone_${i}`}
                                placeholder="Masukan No. Telepon Anggota"
                                value={form[`members_phone_${i}`]}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                ))
            }
            </div>
            
        </div>
        
    </>
    )
};

export default UserInfoMonograf;
