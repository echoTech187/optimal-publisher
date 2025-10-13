import { useEffect, useState } from "react";
import { validationPersonal, validationInstitution } from "@/lib/utils/validation";
import { useForm } from "@/lib/hooks/useForm";

const PersonalInformation = ({ onValidationChange }) => {

    const { form, errors: errros, handleInputChange } = useForm({
        fullname: "",
        phone: "",
        password: "",
        confirm_password: "",
    }, validationPersonal);

    useEffect(() => {
        document.title = "Registrasi | Optimal Untuk Negeri";
        const validate = () => {
            const { fullname, phone, password, confirm_password } = form;
            const hasErrors = Object.values(errros).some(error => error !== "");

            if (fullname && phone && password && confirm_password && !hasErrors) {
                onValidationChange(true);
            } else {
                onValidationChange(false);
            }
        };

        validate();
    }, [form, errros, onValidationChange]);
    return (<>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">Nama Lengkap Beserta Gelar</label>
            <input type="text" name="fullname" id="fullname" value={form.fullname} onChange={handleInputChange} autoFocus className="input rounded-md bg-white/50 border-white/40 hover:border-white/45  hover:shadow-outline hover:outline-none active:border-white/50 focus:border-white/50 focus:outline-none focus:shadow-outline focus-within:border-white/50 in-focus:border-white/50" />
            {errros.fullname && <p className="text-red-500 text-xs mt-1">{errros.fullname}</p>}
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">No. Telepon</label>
            <input type="tel" pattern={`${form.phone.length <= 10 ? "[0-8]{3}-[0-9]{3}-[0-9]{4}" : "[0-8]{4}-[0-9]{4}-[0-9]{4}"}`} name="phone" id="phone" value={form.phone} onChange={handleInputChange} className="input rounded-md bg-white/50 border-white/40 hover:border-white/45  hover:shadow-outline hover:outline-none active:border-white/50 focus:border-white/50 focus:outline-none focus:shadow-outline focus-within:border-white/50 in-focus:border-white/50" />
            {errros.phone && <p className="text-red-500 text-xs mt-1">{errros.phone}</p>}
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={form.password} onChange={handleInputChange} className="input rounded-md bg-white/50 border-white/40 hover:border-white/45  hover:shadow-outline hover:outline-none active:border-white/50 focus:border-white/50 focus:outline-none focus:shadow-outline focus-within:border-white/50 in-focus:border-white/50" />
            {errros.password && <p className="text-red-500 text-xs mt-1">{errros.password}</p>}
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm_password">Konfirmasi Password</label>
            <input type="password" name="confirm_password" id="confirm_password" value={form.confirm_password} onChange={handleInputChange} className="input rounded-md bg-white/50 border-white/40 hover:border-white/45  hover:shadow-outline hover:outline-none active:border-white/50 focus:border-white/50 focus:outline-none focus:shadow-outline focus-within:border-white/50 in-focus:border-white/50" />
            {errros.confirm_password && <p className="text-red-500 text-xs mt-1">{errros.confirm_password}</p>}
        </div>
    </>);
}
const Institution = ({ type, onValidationChange, institution, major }) => {
    const [wrote, setWrote] = useState(false);
    const { form, errors: errros, handleInputChange } = useForm({
        institution: "",
        major: "",
        position: "",
        aggreement: false,
    }, validationInstitution);
    useEffect(() => {
        const validate = () => {
            const { location, institution, major, position, aggreement } = form;
            const hasErrors = Object.values(errros).some(error => error !== "");
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
    }, [form, errros, onValidationChange]);
    const wroteHandler = (e) => {
        setWrote(e.target.checked);
    }

    return (<>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="institution">Asal Kampus/Institusi</label>
            <select className="select" name="institution" id="institution" value={form.institution} onChange={handleInputChange}>
                <option value="">Pilih Asal Kampus/Institusi</option>
                {
                    institution.map((item, index) => {
                        return (
                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    })
                }
            </select>
            {errros.institution && <p className="text-red-500 text-xs mt-1">{errros.institution}</p>}
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="major">{(type === "event") ? "Homebase Mengajar" : "Jurusan"} </label>
            <select className="select" name="major" id="major" value={form.major} onChange={handleInputChange}>
                <option value="">Pilih {(type === "event") ? "Homebase Mengajar" : "Jurusan"}</option>
                {
                    major.map((item, index) => {
                        return (
                            <option key={index} value={item.id}>{item.major_name}</option>
                        )
                    })
                }
            </select>
            {errros.major && <p className="text-red-500 text-xs mt-1">{errros.major}</p>}
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">Jabatan Struktural di kampus/Institusi</label>
            <input type="text" name="position" id="position" value={form.position} onChange={handleInputChange} className="input rounded-md bg-white/50 border-white/40 hover:border-white/45  hover:shadow-outline hover:outline-none active:border-white/50 focus:border-white/50 focus:outline-none focus:shadow-outline focus-within:border-white/50 in-focus:border-white/50" />
            {errros.position && <p className="text-red-500 text-xs mt-1">{errros.position}</p>}
        </div>
        {
            (type === "event") ?
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Kota/Provinsi/Kabupaten</label>
                    <input id="location" name="location" value={form.location} onChange={handleInputChange} className="input rounded-md bg-white/50 border-white/40 hover:border-white/45  hover:shadow-outline hover:outline-none active:border-white/50 focus:border-white/50 focus:outline-none focus:shadow-outline focus-within:border-white/50 in-focus:border-white/50" />
                    {errros.location && <p className="text-red-500 text-xs mt-1">{errros.location}</p>}
                </div> : null
        }
        {
            (type === "isbn") ?
                <div className="mb-4 join gap-2">
                    <input type="checkbox" name="already_wrote" id="already_wrote" checked={wrote} className="checkbox" onChange={wroteHandler} />
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="already_wrote">Apakah Bapak/Ibu pernah mengikuti program menulis buku di Optimal?</label>
                </div> : null
        }
        <div className="mb-4 join gap-2">
            <input type="checkbox" name="aggreement" id="aggreement" checked={form.aggreement} className="checkbox" required onChange={handleInputChange} />
            <label className="block text-gray-700 text-sm font-bold" htmlFor="aggreement">Dengan ini saya menyatakan bahwa data yang saya masukan adalah benar dan dapat dipertanggung jawabkan. Serta saya telah membaca dan menyetujui Syarat dan Ketentuan yang berlaku.</label>
            {errros.aggreement && <p className="text-red-500 text-xs mt-1">{errros.aggreement}</p>}
        </div>
    </>);
}

const TermsAndConditions = () => {
    return (<>
        <div className="mb-0">
            <h1 className="text-lg text-gray-700 dark:text-gray-100 leading-tight capitalize">Silahkan dibaca Prosedur, Pedoman dan Template Penulisan Buku Ajar Terbit November 2025</h1>
            <button type="button" onClick={() => window.open("https://drive.google.com/drive/folders/1JbarddGhTZ3l9JBaFEbawRAmzSBc3Pks", "_parent")} className="text-lg dark:text-gray-100 leading-tight text-primary my-4 inter font-bold">Download</button>
        </div>
        <div className="mb-4 join gap-2">
            <input type="checkbox" name="terms_conditions" id="terms_conditions" value={1} className="checkbox" />
            <label className="block text-gray-700 text-sm font-bold" htmlFor="terms_conditions">Dengan mendaftar, Anda menyetujui Syarat dan Ketentuan Optimal.</label>
        </div>
    </>);
}

export { PersonalInformation, Institution, TermsAndConditions };