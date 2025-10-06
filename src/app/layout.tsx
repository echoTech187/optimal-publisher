"use client";
import { useEffect } from "react";
import WebLayout from "./layout/web";
import AuthLayout from "@/app/auth/layout";
import { usePathname} from "next/navigation";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  useEffect(() => {
    setTimeout(() => {
      if (window.HSStaticMethods) {
        window.HSStaticMethods.autoInit();
        
      }
    }, 100);

  }, []);
  return pathname.includes("auth") ? (<AuthLayout>{children}</AuthLayout>) : (<WebLayout>{children}</WebLayout>) ;

  
}

