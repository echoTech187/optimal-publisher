
import React from 'react';
import type { Major, BookTitle, BookTopic } from '@/types/form';

interface ProgramSelectionProps {
    majors: Major[];
    bookTitles: BookTitle[];
    bookTopics: BookTopic[];
    selectedMajor: string;
    selectedBookTitle: string;
    selectedBookTopic: string;
    loading: boolean;
    handleMajorChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleBookTitleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleBookTopicChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ProgramSelection: React.FC<ProgramSelectionProps> = ({
    majors,
    bookTitles,
    bookTopics,
    selectedMajor,
    selectedBookTitle,
    selectedBookTopic,
    loading,
    handleMajorChange,
    handleBookTitleChange,
    handleBookTopicChange,
}) => (
    <>
        <div id="form-major" className="mb-4 max-md:col-span-2 md:col-span-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="major">Jurusan</label>
            <select className="select rounded-md" name="major" id="major" onChange={handleMajorChange} value={selectedMajor} disabled={loading}>
                <option value="">Pilih Jurusan</option>
                {majors.map((item) => (
                    <option key={item.id} value={item.id}>{item.major_name}</option>
                ))}
            </select>
        </div>
        <div id="form-customer-book_title" className="mb-4 max-md:col-span-2 md:col-span-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="book_title">Judul Buku</label>
            <select className="select rounded-md" name="book_title" id="book_title" onChange={handleBookTitleChange} value={selectedBookTitle} disabled={!selectedMajor || loading}>
                <option value="">Pilih Judul Buku</option>
                {bookTitles.map((item) => (
                    <option key={item.id} value={item.id}>{item.title}</option>
                ))}
            </select>
        </div>
        <div className="col-span-2" id="form-customer-book_topic">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="book_topic">Topik</label>
            <select className="select rounded-md" name="book_topic" id="book_topic" onChange={handleBookTopicChange} value={selectedBookTopic} disabled={!selectedBookTitle || loading}>
                <option value="">Pilih Topik</option>
                {bookTopics.map((item) => (
                    <option key={item.id} value={item.id}>{item.topic_name}</option>
                ))}
            </select>
        </div>
    </>
);

export default ProgramSelection;
