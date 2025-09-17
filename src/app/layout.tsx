"use client";
import { useEffect, useState } from "react";
import WebLayout from "./layout/web";
import AuthLayout from "./layout/auth";
import DashboardLayout from "./layout/dashboard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isBrowser = typeof window !== "undefined";
  const isMobile = isBrowser ? window.innerWidth <= 1023 : false;
  const [layout, setLayout] = useState("web");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const pathname = window.location.pathname;
    console.log(pathname.search("auth"));
    const session = localStorage.getItem("session");
    if (pathname.search("auth") !== -1) {
      if (session) {
        setLayout("dashboard");
        setIsLoading(false);
      }else{
        setLayout("auth");
        setIsLoading(false);
      }
    }else{
      setLayout("web");
      setIsLoading(false);
    }
  },[]);
  if(isLoading) return (<>
  <html lang="en">
    <body>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-white z-50 dark:bg-gray-800 dark:text-gray-50 overflow-hidden">Loading...</div>
    </body>
  </html>
  
  </>);
return (layout === "dashboard") ?  (<DashboardLayout>{children}</DashboardLayout>) : (layout === "auth") ?  (<AuthLayout>{children}</AuthLayout>) : (<WebLayout>{children}</WebLayout>);}
