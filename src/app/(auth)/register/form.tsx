import { useEffect, useState, FC, ChangeEvent } from "react";
import { validationPersonal, validationInstitution } from "@/features/auth/validation";
import { useForm } from "@/lib/hooks/useForm";

// Define interfaces for props
interface PersonalInformationProps {
    onValidationChange: (isValid: boolean) => void;
}

interface InstitutionProps {
    type: string | null;
    onValidationChange: (isValid: boolean) => void;
    institution: { id: number; name: string }[];
    major: { id: number; major_name: string }[];
}

const PersonalInformation: FC<PersonalInformationProps> = ({ onValidationChange }) => {

    const { form, errors, handleInputChange } = useForm({
        fullname: "",
        phone: "",
        password: "",
        confirm_password: "",
    }, validationPersonal);

    useEffect(() => {
        const validate = () => {
            const { fullname, phone, password, confirm_password } = form;
            const hasErrors = Object.values(errors).some(error => error !== "");

            if (fullname && phone && password && confirm_password && !hasErrors) {
                onValidationChange(true);
            } else {
                onValidationChange(false);
            }
        };

        validate();
    }, [form, errors, onValidationChange]);
    return (<>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">Nama Lengkap Beserta Gelar</label>
            <input type="text" name="fullname" id="fullname" value={form.fullname} onChange={handleInputChange} className="input rounded-md bg-white/50 border-white/40 hover:border-white/45 hover:shadow-outline focus:border-white/50 focus:shadow-outline outline-none" />
            {errors.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>}
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">No. Telepon</label>
            <input type="tel" pattern={`${form.phone.length <= 10 ? "[0-8]{3}-[0-9]{3}-[0-9]{4}" : "[0-8]{4}-[0-9]{4}-[0-9]{4}"}`} name="phone" id="phone" value={form.phone} onChange={handleInputChange} className="input rounded-md bg-white/50 border-white/40 hover:border-white/45 hover:shadow-outline focus:border-white/50 focus:shadow-outline outline-none" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={form.password} onChange={handleInputChange} className="input rounded-md bg-white/50 border-white/40 hover:border-white/45 hover:shadow-outline focus:border-white/50 focus:shadow-outline outline-none" />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm_password">Konfirmasi Password</label>
            <input type="password" name="confirm_password" id="confirm_password" value={form.confirm_password} onChange={handleInputChange} className="input rounded-md bg-white/50 border-white/40 hover:border-white/45 hover:shadow-outline focus:border-white/50 focus:shadow-outline outline-none" />
            {errors.confirm_password && <p className="text-red-500 text-xs mt-1">{errors.confirm_password}</p>}
        </div>
    </>);
}
const Institution: FC<InstitutionProps> = ({ type, onValidationChange, institution, major }) => {
    const [wrote, setWrote] = useState<boolean>(false);
    const { form, errors, handleInputChange } = useForm({
        institution: "",
        major: "",
        position: "",
        aggreement: false,
        location: "",
    }, validationInstitution);

    useEffect(() => {
        const validate = () => {
            const { location, institution, major, position, aggreement } = form;
            const hasErrors = Object.values(errors).some(error => error !== "");
            if (type === "event") {
                if (location && institution && major && position && aggreement && !hasErrors) {
                    onValidationChange(true);
                } else {
                    onValidationChange(false);
                }
            } else {
                if (institution && major && position && aggreement && !hasErrors) {
                    onValidationChange(true);
                } else {
                    onValidationChange(false);
                }
            }
        };
        validate();
    }, [form, errors, onValidationChange, type]);

    const wroteHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setWrote(e.target.checked);
    }

    return (<>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="institution">Asal Kampus/Institusi</label>
            <select className="select" name="institution" id="institution" value={form.institution} onChange={handleInputChange}>
                <option value="">Pilih Asal Kampus/Institusi</option>
                {
                    institution.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                }
            </select>
            {errors.institution && <p className="text-red-500 text-xs mt-1">{errors.institution}</p>}
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="major">{(type === "event") ? "Homebase Mengajar" : "Jurusan"} </label>
            <select className="select" name="major" id="major" value={form.major} onChange={handleInputChange}>
                <option value="">Pilih {(type === "event") ? "Homebase Mengajar" : "Jurusan"}</option>
                {
                    major.map((item) => (
                        <option key={item.id} value={item.id}>{item.major_name}</option>
                    ))
                }
            </select>
            {errors.major && <p className="text-red-500 text-xs mt-1">{errors.major}</p>}
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">Jabatan Struktural di kampus/Institusi</label>
            <input type="text" name="position" id="position" value={form.position} onChange={handleInputChange} className="input rounded-md bg-white/50 border-white/40 hover:border-white/45 hover:shadow-outline focus:border-white/50 focus:shadow-outline outline-none" />
            {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
        </div>
        {
            (type === "event") ?
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Kota/Provinsi/Kabupaten</label>
                    <input id="location" name="location" value={form.location} onChange={handleInputChange} className="input rounded-md bg-white/50 border-white/40 hover:border-white/45 hover:shadow-outline focus:border-white/50 focus:shadow-outline outline-none" />
                    {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                </div> : null
        }
        {
            (type === "isbn") ?
                <div className="mb-4 join gap-2 flex items-start flex-wrap">
                    <input type="checkbox" name="already_wrote" id="already_wrote" checked={wrote} className="checkbox" onChange={wroteHandler} />
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="already_wrote">Apakah Bapak/Ibu pernah mengikuti program menulis buku di Optimal?</label>
                </div> : null
        }
        <div className="mb-4 join gap-2 flex items-start flex-nowrap">
            <input type="checkbox" name="aggreement" id="aggreement" checked={form.aggreement} className="checkbox" required onChange={handleInputChange} />
            <label className="block text-gray-700 max-md:text-xs text-sm font-light" htmlFor="aggreement">Dengan ini saya menyatakan bahwa data yang saya masukan adalah benar dan dapat dipertanggung jawabkan. Serta saya telah membaca dan menyetujui Syarat dan Ketentuan yang berlaku.</label>
            {errors.aggreement && <p className="text-red-500 text-xs mt-1">{errors.aggreement}</p>}
        </div>
    </>);
}

const TermsAndConditions: FC = () => {
    return (<>
        <div className="mb-0">
            <h1 className="text-lg text-gray-700 dark:text-gray-100 leading-tight capitalize">Silahkan dibaca Prosedur, Pedoman dan Template Penulisan Buku Ajar Terbit November 2025</h1>
            <button type="button" onClick={() => window.open("https://drive.google.com/drive/folders/1JbarddGhTZ3l9JBaFEbawRAmzSBc3Pks", "_parent")} className="text-lg dark:text-gray-100 leading-tight text-primary my-4 inter font-bold">Download</button>
        </div>
        <div className="mb-4 join gap-2 flex items-start flex-wrap">
            <input type="checkbox" name="terms_conditions" id="terms_conditions" value={1} className="checkbox" />
            <label className="block text-gray-700 text-sm font-bold" htmlFor="terms_conditions">Dengan mendaftar, Anda menyetujui Syarat dan Ketentuan Optimal.</label>
        </div>
    </>);
}

export { PersonalInformation, Institution, TermsAndConditions };