'use client';
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Breadcrumb = () => {
    const pathname = usePathname();
    // Split the pathname and remove empty strings from the start
    const pathSegments = pathname.split('/').filter(segment => segment);

    const breadcrumbLabels: { [key: string]: string } = {
        'dashboard': 'Dashboard',
        'transactions': 'Daftar Transaksi',
        'hki': 'Daftar Hak Kekayaan Intelektual',
        'repository': 'Repository',
        'profile': 'Profile',
        'settings': 'Settings',
        // Add other mappings as needed for sub-pages if they exist
    };

    const getLabel = (segment: string) => {
        return breadcrumbLabels[segment] || (segment.charAt(0).toUpperCase() + segment.slice(1));
    };

    return (
        <nav aria-label="breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
                <li>
                    <Link href="/dashboard" className="hover:text-gray-700 transition-colors">
                        <Icon icon="ic:round-home" className="w-5 h-5" />
                    </Link>
                </li>
                {pathSegments.map((segment, index) => {
                    const href = '/' + pathSegments.slice(0, index + 1).join('/');
                    const isLast = index === pathSegments.length - 1;

                    return (
                        <li key={href} className="flex items-center gap-2">
                            <Icon icon="ic:round-keyboard-arrow-right" className="w-4 h-4 text-gray-400" />
                            {
                                isLast ? (
                                    <span className="font-semibold text-gray-800">{getLabel(segment)}</span>
                                ) : (
                                    <Link href={href} className="hover:text-gray-700 transition-colors">
                                        {getLabel(segment)}
                                    </Link>
                                )
                            }
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

const DashboardHeader = ({ onMenuClick }: { onMenuClick: () => void }) => {

    return (
        <header className="w-full py-8 px-4 lg:bg-[#F4F7FE] lg:rounded-t-lg">
            <div className="flex items-center justify-start w-full">
                <button className="lg:hidden p-2" onClick={onMenuClick}>
                    <Icon icon="ic:round-menu" className="w-6 h-6 text-gray-500" />
                </button>
                <Breadcrumb />
            </div>
        </header>
    );
}

export default DashboardHeader;
