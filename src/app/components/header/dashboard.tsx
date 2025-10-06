import { useEffect, useState } from "react";
import UserProfile from "../user/profile/page";

const DashboardHeader = () => {
    const [user, setUser ] = useState({});

    useEffect(() => {
        const user = localStorage.getItem('user');
        if(user) {
            setUser(JSON.parse(user));
        }else{
            setUser({});
        }
    },[]);
    return (
        <header className="w-full py-4 transition-all bg-white dark:bg-black/20 backdrop-blur-md border-b border-black/5">
            <div className="flex items-center justify-between lg:justify-end w-full px-4">
                <UserProfile data={user} />
            </div>
        </header>
    );
}

export default DashboardHeader