import { AlertType } from "@/context/AlertContext";

export function Alert({ type, message }: { type: AlertType, message: string }) {
    let alertStyle = ""
    switch (type) {
        case AlertType.Info:
            alertStyle = "bg-green-50 dark:bg-gray-800 dark:text-green-400"
            break;
    }

    return (
        <div className={"p-4 text-sm rounded-lg " + alertStyle}>
            {message}
        </div>
    )
}

