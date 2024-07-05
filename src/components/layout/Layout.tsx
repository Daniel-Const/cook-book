import { Alert, AlertType } from "./Alert";
import { BackButton } from "./BackButton"

export default function Layout({ children, showBack = true }: Readonly<{ children: React.ReactNode; showBack?: boolean }>) {
/*            <div className="bg-green-100 flex">
                <div className=""><button className="text-black rounded-full bg-blue-400 p-2">back</button></div>
                <div className="flex mx-auto items-center"><p className="bg-slate-500">Potato!</p></div>
            </div>
            */
    return (
        <div>
           <div className="m-8 flex">
                <div className="flex items-center">
                    {showBack ? <BackButton></BackButton> : ""}
                </div>
                <div className="flex mx-auto items-center">
                    <Alert type={AlertType.Info}></Alert>
                </div>
            </div>

            <main className="flex min-h-screen flex-col items-center p-8">
                {children}
            </main>
        </div>
    )
}


