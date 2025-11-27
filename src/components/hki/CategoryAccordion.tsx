// src/components/hki/CategoryAccordion.tsx
"use client";

import { useState } from 'react';
import { Icon } from '@iconify/react';

interface CategoryAccordionProps {
    category: {
        icon: string;
        name: string;
        color: string;
        items: string[];
    };
}

export default function CategoryAccordion({ category }: CategoryAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const count = category.items.length;

    return (
        <div className="bg-white rounded-lg border border-gray-100">
            <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${category.color} mr-4`}>
                        <Icon icon={category.icon} className="text-xl" />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">{category.name}</p>
                        <p className="text-sm text-gray-500">{count} jenis karya</p>
                    </div>
                </div>
                <div className="flex items-center text-gray-500">
                    <span className="mr-2">{count}</span>
                    <Icon icon={isOpen ? "ion:chevron-up-outline" : "ion:chevron-down-outline"} />
                </div>
            </div>
            {isOpen && (
                <div className="p-4 border-t border-gray-200">
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                        {category.items.map((item, index) => (
                            <li key={index} className="p-2 font-semibold rounded-md">{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
