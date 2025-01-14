import { Alert } from './Alert';
import { MenuButton } from './MenuButton';

export default function Layout({
    children,
    showBack = true
}: Readonly<{ children: React.ReactNode; showBack?: boolean }>) {
    return (
        <div>
            <div className="flex">
                <div className="absolute top-0 right-0 mt-8 mr-8 flex mx-auto items-center">
                    <Alert />
                </div>
            </div>

            <div className="flex py-2 bg-slate-800">
                <MenuButton link="/">Home</MenuButton>
                <MenuButton link="/recipe">Recipes</MenuButton>
            </div>

            <main className="flex min-h-screen flex-col items-center mt-8">
                {children}
            </main>
        </div>
    );
}
