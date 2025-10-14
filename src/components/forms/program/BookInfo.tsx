
import { Major } from "@/types/form";

interface BookInfoProps {
    majors: Major[];
    bookTitles: string ;
    selectedMajor: string;
    loading: boolean;
    handleMajorChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    setBookTitle: (e: any) => void;

}
const bookInfo: React.FC<BookInfoProps> = ({ majors, bookTitles, selectedMajor, loading, handleMajorChange, setBookTitle }) => {
    return (
        <>
            <div className="mb-2" id="form-major">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="major">Jurusan</label>
                <select className="select" name="major" id="major" onChange={handleMajorChange} value={selectedMajor} disabled={loading}>
                    <option value="">Pilih Jurusan</option>
                    {majors.map((item) => (
                        <option key={item.id} value={item.id}>{item.major_name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-2" id="form-book-title">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="book_title">Judul Buku yang Bapak/Ibu Tulis</label>
                <input type="text" name="book_title" id="book_title" className="input" onInput={setBookTitle} required aria-placeholder="Masukan Judul Buku" value={bookTitles}/>
                <small className="text-sm text-gray-500">Contoh: Buku Ajar, Buku Bunga Rampai, Buku Referensi, dll (Disertai Judul)</small>
            </div>
        </>
    );
}

export default bookInfo;
