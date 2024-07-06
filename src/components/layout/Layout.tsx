'use client'

import { useContext } from "react";
import { Alert } from "./Alert";
import { BackButton } from "./BackButton"
import { AlertContext } from "@/context/AlertContext";

export default function Layout({ children, showBack = true }: Readonly<{ children: React.ReactNode; showBack?: boolean }>) {
    const alertCtx = useContext(AlertContext);
    return (
        <div>
            <div className="m-8 flex">
                <div className="flex items-center">
                    {showBack ? <BackButton></BackButton> : ""}
                </div>

                <div className="flex mx-auto items-center">
                    {
                        alertCtx?.show
                            ? <Alert type={alertCtx.type} message={alertCtx.message} />
                            : ""
                    }
                </div>
            </div>

            <main className="flex min-h-screen flex-col items-center p-8">
                {children}
            </main>
        </div>
    )
}

