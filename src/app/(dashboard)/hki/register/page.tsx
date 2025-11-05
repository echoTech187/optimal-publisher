"use client";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { postRegister } from "@/features/hki/actions/actions";


// --- Helper Functions ---

// Real file upload function
const uploadFileToServer = async (file: string | Blob, onProgress: { (progress: any): void; (arg0: number): void; }) => {
    const formData = new FormData();
    formData.append('file', file); // 'file' must match the name your backend expects

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
                    resolve(response.fileId); // Assumes backend returns { fileId: '...' }
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

            // IMPORTANT: Replace with your actual backend endpoint URL
            xhr.open('POST', 'http://localhost:8000/api/v1/upload-file'); 
            
            // If you use authentication, set the header here
            // xhr.setRequestHeader('Authorization', `Bearer ${yourAuthToken}`);
            
            xhr.send(formData);
        });

    } catch (error) {
        console.error('Upload error:', error);
        throw error; // Re-throw the error to be caught by handleFileChange
    }
};

// --- Child Components ---

const InputField = ({ label, placeholder, required = false, name, value, onChange } : { label: string; placeholder: string; required?: boolean; name: string; value: string; onChange: (arg0: React.ChangeEvent<HTMLInputElement>) => void; }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type="text"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-gray-100 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
);

const FileInput = ({ label, description, required, uploadState, onFileChange, inputName, onReset } : { label: string; description: string; required: boolean; uploadState: any; onFileChange: (arg0: string, arg1: File) => void; inputName: string; onReset: (arg0: string) => void; }) => {
    const { file, progress, uploadedId, error } = uploadState;

    const handleFileSelect = (event: any) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            onFileChange(inputName, selectedFile);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <p className="text-xs text-gray-500 mb-2">{description}</p>
            
            {error ? (
                <div className="w-full bg-red-100 border border-red-200 text-red-800 rounded-lg py-3 px-4 flex items-center justify-between">
                    <span className="font-semibold truncate">{file?.name || 'Upload failed'}</span>
                    <button type="button" onClick={() => onReset(inputName)} className="text-red-600 hover:text-red-800">
                        <Icon icon="ion:close-circle" className="text-2xl" />
                    </button>
                </div>
            ) : uploadedId ? (
                <div className="w-full bg-green-100 border border-green-200 text-green-800 rounded-lg py-3 px-4 flex items-center justify-between">
                    <span className="font-semibold truncate">{file.name}</span>
                    <Icon icon="ion:checkmark-circle" className="text-2xl" />
                </div>
            ) : file ? (
                <div className="w-full bg-gray-100 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm truncate">{file.name}</span>
                        <span className="text-sm text-gray-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            ) : (
                <div className="w-full bg-gray-100 border border-gray-200 rounded-lg py-3 px-4">
                    <input type="file" className="text-sm" onChange={handleFileSelect} />
                </div>
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

// --- Main Page Component ---

export default function HKIRegisterPage() {
    const [creators, setCreators] = useState([
        { fullName: '', email: '', phone: '', address: '' },
    ]);

    const [otherFields, setOtherFields] = useState({
        jenisKarya: '',
    });

    const [uploads, setUploads] = useState({
        ktp: { file: null, progress: 0, uploadedId: null, error: null },
        suratPernyataan: { file: null, progress: 0, uploadedId: null, error: null },
        suratPengalihan: { file: null, progress: 0, uploadedId: null, error: null },
        berkasKarya: { file: null, progress: 0, uploadedId: null, error: null },
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const router = useRouter();

    const addCreator = () => {
        setCreators([...creators, { fullName: '', email: '', phone: '', address: '' }]);
    };

    const removeCreator = (index: number) => {
        const newCreators = creators.filter((_, i) => i !== index);
        setCreators(newCreators);
    };

    const handleCreatorChange = (index: number, event: { target: { name: string | number; value: any; }; }) => {
        const newCreators = [...creators];
        newCreators[index][event.target.name as keyof typeof newCreators[number]] = event.target.value;
        setCreators(newCreators);
    };

    const handleOtherFieldChange = (event: { target: { name: any; value: any; }; }) => {
        setOtherFields({ ...otherFields, [event.target.name]: event.target.value });
    };

    const resetUpload = (inputName: any) => {
        setUploads(prev => ({
            ...prev,
            [inputName]: { file: null, progress: 0, uploadedId: null, error: null }
        }));
    };

    const handleFileChange = (inputName : string , file : File) => {
        setUploads(prev => ({ ...prev, [inputName]: { file, progress: 0, uploadedId: null, error: null } }));

        uploadFileToServer(file, (progress: any) => {
            setUploads(prev => ({ ...prev, [inputName]: { ...prev[inputName as keyof typeof prev], file: file, progress } }));
        })
        .then(fileId => {
            setUploads(prev => ({ ...prev, [inputName]: { ...prev[inputName as keyof typeof prev], file: file, uploadedId: fileId, progress: 100 } }));
        })
        .catch(err => {
            console.error(`Error uploading ${inputName}:`, err.message);
            setUploads(prev => ({ ...prev, [inputName]: { ...prev[inputName as keyof typeof prev], file: file, error: err.message || "Upload failed. Please try again." } }));
        });
    };

    const registerHandler = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitError("");
        
        const finalData = {
            creators,
            otherFields,
            uploadedFileIds: {
                ktp: uploads.ktp.uploadedId,
                suratPernyataan: uploads.suratPernyataan.uploadedId,
                suratPengalihan: uploads.suratPengalihan.uploadedId,
                berkasKarya: uploads.berkasKarya.uploadedId,
            }
        };

        try {
            const result = await postRegister(finalData);
            if (result.registration_id === 0 || result.code_transaction === "") {
                setSubmitError("Registrasi gagal. Silakan coba lagi.");
                return;
            }else{
                setSubmitError("");
                router.push(`/hki/pricing?code_transaction=${result.code_transaction}`);
            }
            
        } catch (error) {
            if (error instanceof Error) {
                setSubmitError(error.message || "Registrasi gagal. Silakan coba lagi.");
                return;
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="w-full">
                <div className="w-full">
                    <div className="bg-indigo-600 text-white p-6">
                        <h2 className="text-xl font-bold">Formulir Pendaftaran Hak Cipta</h2>
                        <p>Lengkapi semua data yang diperlukan untuk proses pendaftaran</p>
                    </div>

                    <div className="p-8">
                        <form onSubmit={registerHandler}>
                            {/* --- Creator Repeater Section --- */}
                            <div className="flex justify-between items-center border-b pb-4 mb-6">
                                <h3 className="text-lg font-bold text-gray-800">Data Pencipta</h3>
                                <button type="button" onClick={addCreator} className="text-sm text-indigo-600 font-semibold flex items-center">
                                    <Icon icon="ion:add-outline" className="mr-1" />
                                    Tambah Pencipta
                                </button>
                            </div>
                            <div className="space-y-8">
                                {creators.map((creator, index) => (
                                    <div key={index} className="space-y-6 border-b pb-8">
                                        {creators.length > 1 && (
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-semibold">Pencipta {index + 1}</h4>
                                                <button type="button" onClick={() => removeCreator(index)} className="text-sm text-red-500 font-semibold flex items-center">
                                                    <Icon icon="ion:trash-outline" className="mr-1" />
                                                    Hapus
                                                </button>
                                            </div>
                                        )}
                                        <InputField label="Nama Lengkap" placeholder="Masukkan nama lengkap beserta gelar" name="fullName" value={creator.fullName} onChange={(e: any) => handleCreatorChange(index, e)} required />
                                        <InputField label="Alamat Email" placeholder="contoh@gmail.com" name="email" value={creator.email} onChange={(e: any) => handleCreatorChange(index, e)} required />
                                        <InputField label="No Telpon/ WhatsApp" placeholder="08xxxxxxxxxx" name="phone" value={creator.phone} onChange={(e: any) => handleCreatorChange(index, e)} required />
                                        <InputField label="Alamat Lengkap" placeholder="Masukkan alamat lengkap (Jalan, RT/RW, Kelurahan, Kecamatan, Kota, Provinsi, Kode Pos)" name="address" value={creator.address} onChange={(e: any) => handleCreatorChange(index, e)} required />
                                    </div>
                                ))}
                            </div>

                            {/* --- Tip Box --- */}
                            <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm p-4 rounded-lg mt-6 flex items-start">
                                <Icon icon="ion:bulb-outline" className="text-xl mr-3 flex-shrink-0" />
                                <p>Tip: Jika karya memiliki lebih dari satu pencipta, klik tombol &quot;Tambah Pencipta&quot; untuk menambahkan data pencipta lainnya.</p>
                            </div>

                            {/* --- Supporting Documents Section --- */}
                            <div className="border-t pt-6 mt-8">
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Dokumen Pendukung</h3>
                                <p className="text-sm text-gray-500 mb-6">Format file yang diterima: PDF, JPG, JPEG, PNG (Max 5Mb Per File)</p>
                                <div className="space-y-6">
                                    <FileInput label="Upload KTP" description="Scan atau foto KTP yang masih berlaku" required inputName="ktp" uploadState={uploads.ktp} onFileChange={handleFileChange} onReset={resetUpload} />
                                    <FileInput label="Upload Surat Pernyataan" description="Scan atau foto Surat Pernyataan yang sudah diberi materai dan tanda tangan" required inputName="suratPernyataan" uploadState={uploads.suratPernyataan} onFileChange={handleFileChange} onReset={resetUpload} />
                                    <FileInput label="Upload Surat Pengalihan" description="Scan atau foto Surat Pengalihan yang sudah diberi materai dan tanda tangan" required inputName="suratPengalihan" uploadState={uploads.suratPengalihan} onFileChange={handleFileChange} onReset={resetUpload} />
                                    <InputField label="Jenis Karya atau Ciptaan" placeholder="Masukkan sub jenis ciptaan (Buku, Poster, Booklet, Karya Rekaman Video)" required name="jenisKarya" value={otherFields.jenisKarya} onChange={handleOtherFieldChange} />
                                    <FileInput label="Upload Berkas yang ingin Didaftarkan Hak Ciptanya" description="File Karya yang akan didaftarkan (Buku, Poster, Karya Ilmiah dll)" required inputName="berkasKarya" uploadState={uploads.berkasKarya} onFileChange={handleFileChange} onReset={resetUpload} />
                                </div>
                            </div>

                            {/* --- Submission Section --- */}
                            <div className="border-t pt-6 mt-8 flex justify-between items-center">
                                <p className="text-xs text-gray-500">Dengan Mengirimkan formulir ini, Anda menyetujui bahwa semua informasi yang diberikan adalah benar dan akurat</p>
                                <button type="submit" className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors" disabled={isSubmitting}>
                                    {isSubmitting ? 'Mengirim...' : 'Kirim Pendaftaran'}
                                </button>
                            </div>
                            {submitError && <p className="text-red-500 mt-4 text-center">Error: {submitError}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
