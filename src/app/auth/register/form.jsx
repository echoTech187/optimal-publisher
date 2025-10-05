const PersonalInformation = () => {
    return (<>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">Nama Lengkap Beserta Gelar</label>
            <input type="text" name="fullname" autoFocus className="input rounded-md bg-white/50 border-white/40 hover:border-white/45  hover:shadow-outline hover:outline-none active:border-white/50 focus:border-white/50 focus:outline-none focus:shadow-outline focus-within:border-white/50 in-focus:border-white/50" />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">No. Telepon</label>
            <input type="number" name="phone" className="input rounded-md bg-white/50 border-white/40 hover:border-white/45  hover:shadow-outline hover:outline-none active:border-white/50 focus:border-white/50 focus:outline-none focus:shadow-outline focus-within:border-white/50 in-focus:border-white/50" />
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input type="password" name="password" className="input rounded-md bg-white/50 border-white/40 hover:border-white/45  hover:shadow-outline hover:outline-none active:border-white/50 focus:border-white/50 focus:outline-none focus:shadow-outline focus-within:border-white/50 in-focus:border-white/50" />
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm_password">Konfirmasi Password</label>
            <input type="password" name="confirm_password" className="input rounded-md bg-white/50 border-white/40 hover:border-white/45  hover:shadow-outline hover:outline-none active:border-white/50 focus:border-white/50 focus:outline-none focus:shadow-outline focus-within:border-white/50 in-focus:border-white/50" />
        </div>
    </>);
}
const Institution = (props) => {
    const { type, aggreement, setAgreement } = props
    return (<>
        {
            (type === "event") ?
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Kota/Provinsi/Kabupaten</label>
                    <input id="location" name="location" className="input rounded-md bg-white/50 border-white/40 hover:border-white/45  hover:shadow-outline hover:outline-none active:border-white/50 focus:border-white/50 focus:outline-none focus:shadow-outline focus-within:border-white/50 in-focus:border-white/50" />
                </div> : null
        }
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="institution">Asal Kampus/Institusi</label>
            <select className="select" name="institution" id="institution">
                <option value="">Pilih Asal Kampus/Institusi</option>
                <option value="1">Institut Teknologi Bandung</option>
                <option value="2">Institut Teknologi Sumatera</option>
                <option value="3">Institut Teknologi Kalimantan</option>
            </select>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="major">{(type === "event") ? "Homebase Mengajar" : "Jurusan"} </label>
            <select className="select" name="major" id="major">
                <option value="">Pilih {(type === "event") ? "Homebase Mengajar" : "Jurusan"}</option>
                <option value="1">Kebidanan</option>
                <option value="2">Keperawatan</option>
            </select>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">Jabatan Struktural di kampus/Institusi</label>
            <input type="text" name="position" id="position" className="input rounded-md bg-white/50 border-white/40 hover:border-white/45  hover:shadow-outline hover:outline-none active:border-white/50 focus:border-white/50 focus:outline-none focus:shadow-outline focus-within:border-white/50 in-focus:border-white/50" />
        </div>
        {
            (type === "isbn") ?
                <div className="mb-4 join gap-2">
                    <input type="checkbox" name="already_wrote" id="already_wrote" value={true} className="checkbox" />
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="already_wrote">Apakah Bapak/Ibu pernah mengikuti program menulis buku di Optimal?</label>
                </div> : null
        }
        <div className="mb-4 join gap-2">
            <input type="checkbox" name="aggreement" id="aggreement" value={aggreement} className="checkbox" required onChange={(e) => setAgreement(e.target.checked)} />
            <label className="block text-gray-700 text-sm font-bold" htmlFor="aggreement">Dengan ini saya menyatakan bahwa data yang saya masukan adalah benar dan dapat dipertanggung jawabkan. Serta saya telah membaca dan menyetujui Syarat dan Ketentuan yang berlaku.</label>
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