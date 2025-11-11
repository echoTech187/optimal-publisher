'use client';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FullPageLoader from '@/components/ui/FullPageLoader';
import { getImageUrl } from '@/lib/utils/image';

const InputField = ({ label, placeholder, required = false, name, value, onChange, type = 'text', readOnly = false }: { label: string; placeholder: string; required?: boolean; name: string; value: string; onChange: (arg0: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; type?: string; readOnly?: boolean; }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className="w-full bg-gray-100 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
);

const FileInput = ({ label, description, required, uploadState, onFileChange, inputName, onReset, avatar }: { label: string; description: string; required: boolean; uploadState: any; onFileChange: (arg0: string, arg1: File) => void; inputName: string; onReset: (arg0: string) => void; avatar: string | null; }) => {

    const { file, progress, uploadedId, error } = uploadState;



    const handleFileSelect = (event: any) => {

        const selectedFile = event.target.files[0];

        if (selectedFile) {

            onFileChange(inputName, selectedFile);

        }

    };



    return (

        <div className="flex flex-col items-center">

            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

            <div className="relative">

                <img src={file ? URL.createObjectURL(file) : (avatar || '/images/placeholder.png')} alt="Avatar" className="w-32 h-32 rounded-full object-cover" />

                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700">

                    <Icon icon="ic:round-edit" className="w-6 h-6" />

                </label>

                <input id="avatar-upload" type="file" className="hidden" onChange={handleFileSelect} accept="image/*" />

            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            {file && !uploadedId && !error && (

                <div className="w-full bg-gray-100 border border-gray-200 rounded-lg p-4 mt-4">

                    <div className="flex items-center justify-between mb-1">

                        <span className="font-semibold text-sm truncate">{file.name}</span>

                        <span className="text-sm text-gray-600">{progress}%</span>

                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2.5">

                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>

                    </div>

                </div>

            )}

            {uploadedId && (

                <div className="fixed top-12 right-6 w-fit bg-green-100 border border-green-200 text-green-800 rounded-lg py-3 px-4 flex items-center justify-between gap-4 mt-4">

                    <span className="font-semibold truncate">Foto berhasil diupload</span>

                    <Icon icon="ion:checkmark-circle" className="text-2xl" />

                </div>

            )}

        </div>

    );

};

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [upload, setUpload] = useState<{ file: File | null; progress: number; uploadedId: string | null; error: string | null; }>({ file: null, progress: 0, uploadedId: null, error: null });


    const [institutions, setInstitutions] = useState([]);
    const [majors, setMajors] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            const [userResponse, institutionsResponse, majorsResponse] = await Promise.all([
                fetch('/api/profile'),
                fetch('/api/institutions'),
                fetch('/api/majors'),
            ]);

            const [userData, institutionsData, majorsData] = await Promise.all([
                userResponse.json(),
                institutionsResponse.json(),
                majorsResponse.json(),
            ]);

            setUser(userData.data);
            setInstitutions(institutionsData);
            setMajors(majorsData);
            setIsLoading(false);
        };

        fetchInitialData();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setUser((prev: any) => ({ ...prev, [name]: value }));
    };

    const resetUpload = (inputName: any) => {
        setUpload({ file: null, progress: 0, uploadedId: null, error: null });
    };

    const handleFileChange = (inputName: string, file: File) => {
        setUpload({ file, progress: 0, uploadedId: null, error: null });

        uploadFileToServer(file, (progress: any) => {
            setUpload(prev => ({ ...prev, file: file, progress: progress, uploadedId: null, error: null }));
        })
            .then(filePath => {
                setUpload(prev => ({ ...prev, file: file, uploadedId: filePath as string, progress: 100 }));
            }).catch(err => {
                console.error(`Error uploading ${inputName}:`, err.message);
                setUpload(prev => ({ ...prev, file: file, error: err.message || "Upload failed. Please try again." }));
            });
    };

    const updateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitError("");

        const formData = new FormData();
        formData.append('full_name', user.full_name);
        formData.append('institution_id', user.institution_id);
        formData.append('major_id', user.major_id);
        formData.append('position', user.position);
        if (upload.uploadedId) {
            formData.append('avatar', 'user/profile/'+upload.uploadedId);
        }

        try {
            const response = await fetch('/api/profile/update', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                window.location.reload();
            } else {
                const error = await response.json();
                setSubmitError(error.message);
            }
        } catch (error: any) {
            setSubmitError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <FullPageLoader />;
    return (
        <form onSubmit={updateProfile}>
            <div className="bg-gray-50 min-h-screen">
                <div className="w-full">
                    <div className=" p-6 flex items-center ">
                        <div>
                            <FileInput label="" avatar={getImageUrl(user?.avatar)} description="Upload your avatar (Max 2MB)" required={false} inputName="avatar" uploadState={upload} onFileChange={handleFileChange} onReset={resetUpload} />
                        </div>
                        <div className="mx-4">
                            <h2 className="text-xl font-bold">Informasi Pengguna</h2>
                            <p>Perbarui informasi pribadi anda.</p>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="lg:col-span-2">

                            <div className="space-y-6">
                                <InputField label="Nama Lengkap & Gelar" placeholder="Masukan Nama Lengkap dan Gelar Anda" name="full_name" value={user?.full_name || ''} onChange={handleInputChange} required />
                                <InputField label="Nomor Telepon" placeholder="08xxxxxxxxxx" name="phone_number" value={user?.phone_number || ''} onChange={handleInputChange} required readOnly />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kampus/Institusi</label>
                                    <select name="institution_id" value={user?.institution_id || ''} onChange={handleInputChange} className="w-full bg-gray-100 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="">Pilih Kampus/Institusi</option>
                                        {institutions.map((institution: any) => (
                                            <option key={institution.id} value={institution.id}>{institution.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Jurusan</label>
                                    <select name="major_id" value={user?.major_id || ''} onChange={handleInputChange} className="w-full bg-gray-100 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="">Pilih Jurusan</option>
                                        {majors.map((major: any) => (
                                            <option key={major.id} value={major.id}>{major.major_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <InputField label="Jabatan" placeholder="Masukan Jabatan Anda" name="position" value={user?.position || ''} onChange={handleInputChange} required />
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

const uploadFileToServer = async (file: string | Blob, onProgress: { (progress: any): void; (arg0: number): void; }) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        return await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const percentCompleted = Math.round((event.loaded * 100) / event.total);
                    onProgress(percentCompleted);
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response.fileId);
                } else {
                    try {
                        const errorResponse = JSON.parse(xhr.responseText);
                        reject(new Error(errorResponse.message || 'Failed to upload file.'));
                    } catch (e) {
                        reject(new Error('An unknown error occurred during upload.'));
                    }
                }
            });

            xhr.addEventListener('error', () => {
                reject(new Error('A network or server error occurred.'));
            });

            xhr.open('POST', 'http://localhost:8000/api/v1/profile/upload-file');

            xhr.send(formData);
        });

    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
};