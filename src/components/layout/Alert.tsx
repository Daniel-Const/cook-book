'use client';

import { AlertType } from '@/context/AlertContext';
import { useContext } from 'react';
import { AlertContext } from '@/context/AlertContext';

export function Alert() {
    const alertCtx = useContext(AlertContext);

    let alertStyle = '';
    switch (alertCtx?.type) {
        case AlertType.Info:
            alertStyle = 'bg-green-50 dark:bg-gray-800 dark:text-green-400';
            break;
    }

    return alertCtx?.show ? (
        <div className={'p-4 text-sm rounded-lg ' + alertStyle}>{alertCtx?.message}</div>
    ) : (
        ''
    );
}
