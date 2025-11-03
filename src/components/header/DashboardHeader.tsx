'use client';
import { Icon } from "@iconify/react/dist/iconify.js";

const DashboardHeader = ({ onMenuClick }: { onMenuClick: () => void }) => {

    return (
        <header className="w-full p-8 hidden  lg:bg-[#F4F7FE] lg:rounded-t-lg">
            <div className="flex items-center justify-between w-full">
                <button className="lg:hidden p-2" onClick={onMenuClick}>
                    <Icon icon="ic:round-menu" className="w-6 h-6 text-gray-500" />
                </button>
                <div className="hidden lg:flex items-center gap-4">
                    <button className="flex items-center gap-2 bg-white p-2 lg:p-3 rounded-lg shadow-sm">
                        <Icon icon="ic:round-calendar-today" className="w-5 h-5 text-gray-500" />
                        <span className="font-semibold text-sm lg:text-base text-gray-700">This Month</span>
                        <Icon icon="ic:round-keyboard-arrow-down" className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                <div className="max-lg:hidden flex items-center space-x-2 lg:space-x-4">
                    <button className="flex items-center gap-2 bg-white p-2 lg:p-3 rounded-lg shadow-sm font-semibold text-gray-700">
                        <Icon icon="ic:round-widgets" className="w-5 h-5" />
                        <span className="text-xs lg:text-base">Daftar Program Penerbitan</span>
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 text-white p-2 lg:p-3 rounded-lg shadow-sm font-semibold">
                        <Icon icon="ic:round-add" className="w-5 h-5" />
                        <span className="text-xs lg:text-base">Daftar Hak Kekayaan Intelektual</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default DashboardHeader;
