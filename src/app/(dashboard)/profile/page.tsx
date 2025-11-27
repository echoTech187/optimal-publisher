'use client';

import { useProfile } from '@/features/profile/hooks/useProfile';
import FullPageLoader from '@/components/ui/FullPageLoader';
import { getImageUrl } from '@/lib/utils/image';

// Import the extracted components
import InputField from '@/components/forms/InputField';
import ProfileFileInput from '@/components/forms/ProfileFileInput';

export default function ProfilePage() {
    const {
        user,
        isLoading,
        isSubmitting,
        submitError,
        institutions,
        majors,
        avatarUploadState,
        handleInputChange,
        handleFileChange,
        resetUpload,
        updateProfile,
    } = useProfile();

    if (isLoading) {
        return <FullPageLoader />;
    }

    if (!user) {
        return <div className="p-8 text-center">Gagal memuat data pengguna.</div>;
    }

    return (
        <form onSubmit={updateProfile}>
            <div className="bg-gray-50 min-h-screen">
                <div className="w-full">
                    <div className=" p-6 flex items-center ">
                        <div>
                            <ProfileFileInput
                                label=""
                                avatar={getImageUrl(user.avatar)}
                                description="Upload your avatar (Max 2MB)"
                                required={false}
                                inputName="avatar"
                                uploadState={avatarUploadState}
                                onFileChange={handleFileChange}
                                onReset={() => resetUpload('avatar')}
                            />
                        </div>
                        <div className="mx-4">
                            <h2 className="text-xl font-bold">Informasi Pengguna</h2>
                            <p>Perbarui informasi pribadi anda.</p>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="lg:col-span-2">
                            <div className="space-y-6">
                                <InputField label="Nama Lengkap & Gelar" placeholder="Masukan Nama Lengkap dan Gelar Anda" name="full_name" value={user.full_name || ''} onChange={handleInputChange} required />
                                <InputField label="Nomor Telepon" placeholder="08xxxxxxxxxx" name="phone_number" value={user.phone_number || ''} onChange={handleInputChange} required readOnly />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kampus/Institusi</label>
                                    <select name="institution_id" value={user.institution_id || ''} onChange={handleInputChange} className="w-full bg-gray-100 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="">Pilih Kampus/Institusi</option>
                                        {institutions.map((institution: any) => (
                                            <option key={institution.id} value={institution.id}>{institution.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Jurusan</label>
                                    <select name="major_id" value={user.major_id || ''} onChange={handleInputChange} className="w-full bg-gray-100 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="">Pilih Jurusan</option>
                                        {majors.map((major: any) => (
                                            <option key={major.id} value={major.id}>{major.major_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <InputField label="Jabatan" placeholder="Masukan Jabatan Anda" name="position" value={user.position || ''} onChange={handleInputChange} required />
                            </div>

                            <div className="border-t pt-6 mt-8 flex justify-end">
                                <button type="submit" className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors" disabled={isSubmitting}>
                                    {isSubmitting ? 'Updating...' : 'Update Profile'}
                                </button>
                            </div>
                            {submitError && <p className="text-red-500 mt-4 text-center">Error: {submitError}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}