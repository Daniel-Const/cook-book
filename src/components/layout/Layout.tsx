import { BackButton } from "./BackButton"

export default function Layout({ children }: Readonly<{ children: React.ReactNode;}>) {
    return (
        <div>
            <div className="m-8">
                <BackButton></BackButton>
            </div>
            <main className="flex min-h-screen flex-col items-center p-20">
                {children}
            </main>
        </div>
    )
}
