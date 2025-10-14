"use client";
import React from 'react';
import { User } from '@/types/user';

const UserInfoMonograf = ({ user, memberCount }: { user: User | null, memberCount: number | 1 }) => {

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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Judul Monograf</label>
            <input type="text" name="title" id="title" className="input" autoFocus />
        </div>
        <div className="mb-2 col-span-2 md:col-span-1" id="form-chief-writer">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chief_writer">Nama Lengkap beserta Gelar (Penulis Utama)</label>
            <input type="text" name="chief_writer" id="chief_writer" className="input" />
        </div>
        <div className="col-span-2 md:col-span-1" id="form-chief-phone">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="writter_phone">No. Telepon</label>
            <input type="text" name="writter_phone" id="writter_phone" className="input" />
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`members_name_${i}`}>
                                Nama Lengkap beserta Gelar (Anggota {i + 1})
                            </label>
                            <input type="text" name="members_name[]" id={`members_name_${i}`} className="input" placeholder="Masukan Nama Anggota" />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`members_phone_${i}`}>
                                No. Telepon
                            </label>
                            <input type="text" name="members_phone[]" id={`members_phone_${i}`} className="input" placeholder="Masukan No. Telepon Anggota" />
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