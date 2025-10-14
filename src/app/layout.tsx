"use client";
import { useEffect } from "react";
import WebLayout from "@/app/(main)/layout";
import AuthLayout from "@/app/(auth)/layout";
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
  return (children) ;

  
}

