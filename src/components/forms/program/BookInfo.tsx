
import { Major } from "@/types/form";
import StyledInputField from "./StyledInputField";
import StyledSelectField from "./StyledSelectField";

interface BookInfoProps {
    majors: Major[];
    bookTitles: string ;
    selectedMajor: string;
    loading: boolean;
    handleMajorChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    setBookTitle: (e: any) => void;
    error?: string;
}
const bookInfo: React.FC<BookInfoProps> = ({ majors, bookTitles, selectedMajor, loading, handleMajorChange, setBookTitle, error }) => {
    return (
        <>
            <div id="form-major" className="mb-4 max-md:col-span-2 md:col-span-1">
                <StyledSelectField
                    label="Jurusan"
                    name="major"
                    value={selectedMajor}
                    onChange={handleMajorChange}
                    disabled={loading}
                >
                    <option value="">Pilih Jurusan</option>
                    {majors.map((item) => (
                        <option key={item.id} value={item.id}>{item.major_name}</option>
                    ))}
                </StyledSelectField>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div id="form-book-title" className="mb-4 max-md:col-span-2 md:col-span-1">
                <StyledInputField
                    label="Judul Buku yang Bapak/Ibu Tulis"
                    name="book_title"
                    placeholder="Masukan Judul Buku"
                    value={bookTitles}
                    onChange={setBookTitle}
                    required
                />
                <small className="text-xs text-gray-500">Contoh: Buku Ajar, Buku Bunga Rampai, Buku Referensi, dll (Disertai Judul)</small>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
        </>
    );
}

export default bookInfo;
