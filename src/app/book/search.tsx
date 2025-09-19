import React from "react";
interface SearchBookProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}
const SearchBook: React.FC<SearchBookProps> = ({ search, setSearch }) => {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value);
    }
    return (
        <div className="mb-4 relative">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Cari Buku
            </label>

            <input
                type="text"
                id="search"
                name="search"
                placeholder="Judul Buku..."
                value={search}
                onInput={handleSearch}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {
                (search !== '') ?
                    <span className="absolute inset-y-0 top-1/2 right-0 flex items-center pr-8 pb-1">
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" onClick={() => setSearch('')}>
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                    </span>
                    : ''

            }
            <span className="absolute inset-y-0 top-1/2 right-0 flex items-center pr-3 pb-1">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </span>
        </div>
    )
}

export { SearchBook }