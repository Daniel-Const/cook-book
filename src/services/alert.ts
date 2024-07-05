import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators'

const alertSubject = new Subject()
const defaultId = 'alert'

enum AlertType {
    Info = 1,
    Warning = 2,
    Error = 3
}


export const alertService = {
    onAlert,
    AlertType,
    info,
    clear
}

interface Alert {
    id?: string,
    type: AlertType,
    autoClose?: boolean,
    message: string
}

function onAlert(id = defaultId) {
    return alertSubject.asObservable().pipe(filter(x => x && x.id === id));
}

function info(message: string) {
    alert({type: AlertType.Info, message})
}

function alert(alert: Alert) {
    alert.id = alert.id || defaultId;
    alert.autoClose = (alert.autoClose === undefined ? true : alert.autoClose);
    alertSubject.next(alert)
}

function clear(id = defaultId) {
    alertSubject.next({id})
}
