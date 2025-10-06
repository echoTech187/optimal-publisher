'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

// --- BAGIAN 1: DEFINISI TIPE ---

type AlertPosition = 'center' | 'top' | 'bottom';
type AlertType = 'success' | 'error' | 'warning' | 'info' | 'custom';

/**
 * Konfigurasi untuk menampilkan sebuah alert.
 * Digunakan saat memanggil fungsi `showAlert`.
 */
export type AlertConfig = {
    type: AlertType;
    title: string;
    message: React.ReactNode;
    icon?: string;
    primaryButtonText?: string;
    onPrimaryClick?: () => void;
    secondaryButtonText?: string;
    onSecondaryClick?: () => void;
    onCloseCallback?: () => void;
    duration?: number; // Durasi dalam milidetik
    position?: AlertPosition;
};

/**
 * Tipe untuk props internal komponen Alert.
 */
interface AlertProps extends AlertConfig {
    isOpen: boolean;
    onClose: () => void;
}

// --- BAGIAN 2: KONFIGURASI STYLE & ANIMASI ---

const alertConfigStyles: Record<AlertType, object> = {
    success: { icon: 'mdi:check-circle-outline', iconColor: 'text-green-600', iconBg: 'bg-green-100', primaryButton: 'bg-green-600 hover:bg-green-700 focus:ring-green-500' },
    error: { icon: 'mdi:alert-circle-outline', iconColor: 'text-red-600', iconBg: 'bg-red-100', primaryButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500' },
    warning: { icon: 'mdi:alert-outline', iconColor: 'text-yellow-600', iconBg: 'bg-yellow-100', primaryButton: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400' },
    info: { icon: 'mdi:information-outline', iconColor: 'text-blue-600', iconBg: 'bg-blue-100', primaryButton: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' },
    custom: { icon: 'mdi:help-circle-outline', iconColor: 'text-gray-600', iconBg: 'bg-gray-100', primaryButton: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500' },
};

const positionStyles: Record<AlertPosition, string> = {
    center: 'items-center justify-center',
    top: 'items-start justify-center pt-12',
    bottom: 'items-end justify-center pb-12',
};

const animationStyles: Record<AlertPosition, string> = {
    center: 'animate-in fade-in zoom-in-95',
    top: 'animate-in fade-in slide-in-from-top',
    bottom: 'animate-in fade-in slide-in-from-bottom',
};


// --- BAGIAN 3: CUSTOM HOOK `useAlert` (LOGIKA UTAMA) ---

export const useAlert = () => {
    const [alertState, setAlertState] = useState<Partial<AlertProps>>({ isOpen: false });

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // PERBAIKAN KUNCI: Buat fungsi close yang stabil dan tidak bergantung pada state
    const closeAlert = useCallback(() => {
        setAlertState((currentState) => {
            // Jika sudah ditutup, jangan lakukan apa-apa
            if (!currentState.isOpen) {
                return currentState;
            }
            // Jalankan callback jika ada di state saat ini
            if (currentState.onCloseCallback) {
                currentState.onCloseCallback();
            }
            // Kembalikan state baru untuk menutup alert
            return { ...currentState, isOpen: false };
        });
    }, []);

    // useEffect sekarang menjadi satu-satunya yang bertanggung jawab atas timer
    useEffect(() => {
        // Hapus timer lama setiap kali state berubah
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        // Jika alert terbuka dan punya durasi, set timer baru
        if (alertState.isOpen && alertState.duration) {
            timerRef.current = setTimeout(() => {
                // Panggil fungsi close yang stabil
                closeAlert();
            }, alertState.duration);
        }

        // Fungsi cleanup untuk saat komponen unmount
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [alertState, closeAlert]); // Bergantung pada seluruh objek state

    // Fungsi showAlert sekarang hanya fokus untuk mengatur state
    const showAlert = useCallback((config: AlertConfig) => {
        setAlertState({ ...config, isOpen: true, onClose: closeAlert });
    }, [closeAlert]);

    return { alertProps: alertState as AlertProps, showAlert, closeAlert };
};


// --- BAGIAN 4: KOMPONEN REACT `Alert` (HANYA UNTUK TAMPILAN) ---

const Alert: React.FC<Partial<AlertProps>> = ({
    isOpen,
    onClose,
    type = 'info',
    title,
    message,
    icon,
    primaryButtonText,
    onPrimaryClick,
    secondaryButtonText,
    onSecondaryClick,
    position = 'center',
}) => {
    if (!isOpen || !onClose) {
        return null;
    }

    const config = alertConfigStyles[type] as any;
    const displayIcon = icon || config.icon;
    const posStyles = positionStyles[position];
    const animStyles = animationStyles[position];

    return (
        <div
            className={`fixed inset-0 z-50 flex p-4 transition-opacity duration-300 bg-black/60 ${posStyles}`}
            onClick={onClose}
        >
            <div
                className={`relative flex w-full max-w-sm flex-col items-center rounded-xl bg-white p-6 text-center shadow-xl transition-transform duration-300 ${animStyles}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                    <Icon icon="mdi:close" className="h-6 w-6" />
                </button>
                <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${config.iconBg}`}>
                    <Icon icon={displayIcon} className={`h-10 w-10 ${config.iconColor}`} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <p className="mt-2 text-sm text-gray-600">{message}</p>
                <div className="mt-6 flex w-full flex-col space-y-2">
                    {primaryButtonText && onPrimaryClick && (
                        <button
                            onClick={onPrimaryClick}
                            className={`w-full rounded-lg px-4 py-2.5 font-semibold text-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${config.primaryButton}`}
                        >
                            {primaryButtonText}
                        </button>
                    )}
                    {secondaryButtonText && onSecondaryClick && (
                        <button onClick={onSecondaryClick} className="w-full rounded-lg px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-100">
                            {secondaryButtonText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Alert;