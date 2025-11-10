'use client';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { fetchHkiTransaction, fetchPaymentMethods } from '@/features/payment/data';
import { useSearchParams } from 'next/navigation';
import { getImageUrl } from '@/lib/utils/image';
import FullPageLoader from '@/components/ui/FullPageLoader';
import { uploadPaymentProofHki } from '@/features/payment/actions';

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

const FileInput = ({ label, description, required, uploadState, onFileChange, inputName, onReset }: { label: string; description: string; required: boolean; uploadState: any; onFileChange: (arg0: string, arg1: File) => void; inputName: string; onReset: (arg0: string) => void; }) => {
    const { file, progress, uploadedId, error } = uploadState;

    const handleFileSelect = (event: any) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            onFileChange(inputName, selectedFile);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
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
                    <input type="file" className="text-sm" onChange={handleFileSelect} accept="image/*,application/pdf" required />
                </div>
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default function HKIPaymentPage() {
    const searchParams = useSearchParams();
    const code_transaction = searchParams.get('code_transaction');
    const [hkiData, setHkiData] = useState<any>(null);
    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(1);
    const [upload, setUpload] = useState<{ file: File | null; progress: number; uploadedId: string | null; error: string | null; }>({ file: null, progress: 0, uploadedId: null, error: null });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchHkiData = async () => {
            if (code_transaction) {
                const response = await fetchHkiTransaction(code_transaction);
                const response2 = await fetchPaymentMethods();
                setPaymentMethods(response2);
                setHkiData(response);
                setIsLoading(false);
            }
        };

        fetchHkiData();
    }, [code_transaction]);

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

    const paymentHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError(null);
        setIsLoading(true);

        if (!selectedPaymentMethod || !upload.uploadedId) {
            setError('Please select a payment method and upload the transaction proof.');
            return;
        }

        const formData = new FormData();
        formData.append('registration_id', hkiData.registration_id);
        formData.append('package_id', hkiData.package.id);
        formData.append('amount', hkiData.package.price);
        formData.append('payment_method', selectedPaymentMethod.toString());
        formData.append('transaction_proof_path', 'documents/hki/' + upload.uploadedId);

        try {
            const response = await uploadPaymentProofHki(formData);

            if (response.status === 'success') {
                window.location.href = `/hki/payment/${code_transaction}?status=waiting_confirmation`;
            } else {
                if (typeof response.message === 'object') {
                    setError(JSON.stringify(response.message));
                } else {
                    setError(response.message);
                }
                setIsLoading(false);
            }
        } catch (error: any) {
            if (typeof error.message === 'object') {
                setError(JSON.stringify(error.message));
            } else {
                setError(error.message);
            }
            setIsLoading(false);
        }
    };
    if(isLoading) return <FullPageLoader />
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="">
                <div className="w-full">
                    <div className="bg-blue-600 text-white p-6 flex items-center">
                        <Icon icon="ion:card-outline" className="size-14 mr-3" />
                        <div>
                            <h2 className="text-xl font-bold">Informasi Pembayaran</h2>
                            <p>{hkiData?.package.name} - {parseInt(hkiData?.package.price).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                        </div>
                    </div>
                    {
                        error && <p className="text-red-500 text-sm mt-1">{error}</p>
                    }
                    <div className="p-8">
                        <form onSubmit={paymentHandler} encType="multipart/form-data">
                            <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm p-4 rounded-lg mb-6 flex items-start">
                                <Icon icon="ion:checkmark-circle-outline" className="text-xl mr-3 flex-shrink-0" />
                                <p>
                                    Anda telah memilih paket <span className="font-bold">{hkiData?.package.name} </span>
                                    dengan waktu penerbitan dalam <span className="font-bold">{hkiData?.package.duration_days} Hari </span>
                                    Total yang harus dibayar: <span className="font-bold">{parseInt(hkiData?.package.price).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })} </span>
                                    sebelum <span className="font-bold">{new Date(hkiData?.expires_at).toLocaleDateString('id-ID', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' , hour: 'numeric', minute: 'numeric'})}</span>
                                </p>
                            </div>

                            <h3 className="text-lg font-bold text-gray-800 mb-4">Silakan transfer ke salah satu rekening berikut</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {paymentMethods.map((method, index) => (
                                    <div key={method.id} onClick={() => setSelectedPaymentMethod(method.id)} className={`p-4 rounded-lg border-4 cursor-pointer flex items-center ${selectedPaymentMethod === method.id ? 'bg-gray-100 border-blue-500' : 'border-transparent bg-blue-50'}`}>
                                        <input
                                            type="radio"
                                            id={`payment_method_${index}`}
                                            name="payment_method"
                                            value={method.id}
                                            checked={selectedPaymentMethod === method.id}
                                            onChange={() => setSelectedPaymentMethod(method.id)}
                                            className="mr-3 hidden"
                                        />
                                        <img src={getImageUrl(method.icon)} alt={method.name} className="w-16 h-auto mr-4" />
                                        <div>
                                            <p className="font-semibold text-gray-800">{method.name}</p>
                                            <p className="text-gray-600">{method.code}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h3 className="text-lg font-bold text-gray-800 mb-4">Upload Bukti Transfer</h3>
                           

                            <div className="mb-8">
                                <FileInput label="Upload Screenshot atau foto bukti transfer pembayaran [Format: JPG, PNG, atau PDF - Max 5MB]" description="" required inputName="transactionProof" uploadState={upload} onFileChange={handleFileChange} onReset={resetUpload} />
                            </div>

                            <button className="w-full bg-fuchsia-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-fuchsia-950 transition-colors flex items-center justify-center">
                                <Icon icon="ion:checkmark-circle-outline" className="text-xl mr-2" />
                                Konfirmasi Pembayaran & Lanjutkan
                            </button>

                            <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm p-4 rounded-lg mt-8">
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Pastikan jumlah transfer sesuai dengan harga paket yang dipilih</li>
                                    <li>Bukti transfer akan diverifikasi maksimal 2 jam kerja</li>
                                    <li>Untuk bantuan, Hubungi team Optimal</li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
