import React from 'react';
import type { Major, BookTitle, BookTopic } from '@/types/form';
import StyledSelectField from './StyledSelectField';

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
    error?: string;
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
    error,
}) => (
    <>
        <div id="form-major" className="mb-4 max-md:col-span-2 md:col-span-1">
            <StyledSelectField
            required
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
        <div id="form-customer-book_title" className="mb-4 max-md:col-span-2 md:col-span-1">
            <StyledSelectField
            required
                label="Judul Buku"
                name="book_title"
                value={selectedBookTitle}
                onChange={handleBookTitleChange}
                disabled={!selectedMajor || loading}
            >
                <option value="">Pilih Judul Buku</option>
                {bookTitles.map((item) => (
                    <option key={item.id} value={item.id}>{item.title}</option>
                ))}
            </StyledSelectField>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div className="col-span-2" id="form-customer-book_topic">
            <StyledSelectField
            required
                label="Topik"
                name="book_topic"
                value={selectedBookTopic}
                onChange={handleBookTopicChange}
                disabled={!selectedBookTitle || loading}
            >
                <option value="">Pilih Topik</option>
                {bookTopics.map((item) => (
                    <option key={item.id} value={item.id}>{item.topic_name}</option>
                ))}
            </StyledSelectField>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    </>
);

export default ProgramSelection;