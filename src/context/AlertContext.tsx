'use client';

import { createContext, useState } from 'react';

export enum AlertType {
    Info = 1,
    Warning = 2,
    Error = 3
}

interface AlertValue {
    show: boolean;
    message: string;
    type: AlertType;
    trigger: (type: AlertType, msg: string) => void;
}

const AlertDurationSeconds = 4000;

export const AlertContext = createContext<null | AlertValue>(null);

export const AlertContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [alertState, setAlertState] = useState({
        show: false,
        type: AlertType.Info,
        message: ''
    });

    const triggerAlert = (type: AlertType, message: string) => {
        setAlertState({ show: true, type, message });
        setTimeout(() => {
            setAlertState({ ...alertState, show: false });
        }, AlertDurationSeconds);
    };

    const value = {
        show: alertState.show,
        type: alertState.type,
        message: alertState.message,
        trigger: triggerAlert
    };

    return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
};
