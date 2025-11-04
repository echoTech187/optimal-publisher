'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function CopyableTransactionCode({ transactionCode }: { transactionCode: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset "Copied!" message after 2 seconds
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <div className="flex items-center gap-2">
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{transactionCode}</p>
            <button
                onClick={() => handleCopy(transactionCode)}
                className="text-gray-400 hover:text-gray-600 transition-colors relative group"
                title="Copy to clipboard"
            >
                <Icon icon="ic:round-content-copy" className="w-4 h-4" />
                {copied && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap">Copied!</span>
                )}
            </button>
        </div>
    );
}
