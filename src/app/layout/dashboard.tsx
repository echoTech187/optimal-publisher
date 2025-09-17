import FlyonuiScript from "../components/FlyonuiScript";
import { DashboardHeader } from "../components/header/page";
import { DashboardSidebar } from "../components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (<>
        <div className="flex h-full w-full">
            <DashboardSidebar />
            <div className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto">
                <div className="flex flex-col h-full">
                <DashboardHeader />
                {children}
                </div>
            </div>
        </div>
        <FlyonuiScript />
    </>);
}