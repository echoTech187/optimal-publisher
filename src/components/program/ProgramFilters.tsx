'use client';

const ProgramFilters = () => {
    return (
        <div className="flex flex-wrap items-center gap-4 mb-6">
            <select className="p-2 rounded-lg border">
                <option>Time</option>
            </select>
            <select className="p-2 rounded-lg border">
                <option>Level</option>
            </select>
            <select className="p-2 rounded-lg border">
                <option>Language</option>
            </select>
            <select className="p-2 rounded-lg border">
                <option>Type</option>
            </select>
        </div>
    );
}

export default ProgramFilters;
