// src/components/book/DetailItem.tsx

interface DetailItemProps {
    label: string;
    value: string | number | null | undefined;
}

export default function DetailItem({ label, value }: DetailItemProps) {
    if (!value) return null;
    
    return (
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-base font-semibold text-gray-800">{value}</p>
        </div>
    );
};
