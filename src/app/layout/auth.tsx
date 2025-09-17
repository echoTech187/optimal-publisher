import FlyonuiScript from "../components/FlyonuiScript";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (<>
        {children}
        <FlyonuiScript />
    </>);
}