'use client';
import UserProfile from "@/components/user/profile";
import { User } from "@/types/user";
import { Icon } from "@iconify/react/dist/iconify.js";

const DashboardHeader = ({ user, onMenuClick }: { user: User, onMenuClick: () => void }) => {

    if (!user) {
        return null; // Or a loading state
    }

    return (
        <header className="w-full py-4 transition-all bg-white dark:bg-black/20 backdrop-blur-md border-b border-black/5">
            <div className="flex items-center justify-between w-full px-8">
                <button className="lg:hidden" onClick={onMenuClick}>
                    <Icon icon="tabler:menu-2" className="h-6 w-6" />
                </button>
                <div className="flex items-center space-x-6">
                    <button>
                        <Icon icon="tabler:search" className="h-6 w-6 text-gray-500" />
                    </button>
                    <button>
                        <Icon icon="tabler:bell" className="h-6 w-6 text-gray-500" />
                    </button>
                    <UserProfile user={user} />
                </div>
            </div>
        </header>
    );
}

export default DashboardHeader;
