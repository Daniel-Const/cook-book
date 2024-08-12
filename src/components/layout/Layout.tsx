'use client';

import { useContext } from 'react';
import { Alert } from './Alert';
import { MenuButton } from './MenuButton';
import { AlertContext } from '@/context/AlertContext';

export default function Layout({
    children,
    showBack = true
}: Readonly<{ children: React.ReactNode; showBack?: boolean }>) {
    const alertCtx = useContext(AlertContext);
    return (
        <div>
            <div className="flex">
                <div className="absolute top-0 right-0 mt-8 mr-8 flex mx-auto items-center">
                    {alertCtx?.show ? (
                        <Alert type={alertCtx.type} message={alertCtx.message} />
                    ) : (
                        ''
                    )}
                </div>
            </div>

            <div className="flex justify-between py-2 bg-slate-200">
                <MenuButton link="/recipe">Recipes</MenuButton>
            </div>

            <main className="flex min-h-screen flex-col items-center mt-8">
                {children}
            </main>
        </div>
    );
}
