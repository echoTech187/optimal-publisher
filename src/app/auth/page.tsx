"use client";
import { useEffect } from "react";
import SignIn from "./signin";

export default function SignInPage() {
    useEffect(() => {
        document.title = "Sign In";
        
    }, []);
    return (
        <SignIn />
    );
}