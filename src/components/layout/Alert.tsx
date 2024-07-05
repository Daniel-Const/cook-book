export enum AlertType {
    Info = 1,
    Warning = 2,
    Error = 3
}

// TODO: Setup event to show / hide alert message
export function Alert({type}: {type: AlertType}) {
    let alertStyle =  "" 
    switch(type) {
        case AlertType.Info:
           alertStyle = "bg-green-50 dark:bg-gray-800 dark:text-green-400"
           break;
    }

    const showAlert = false 

    return (
        <>
        { showAlert ?
            <div className={"p-4 text-sm rounded-lg " + alertStyle}>
                This is an alert!
            </div> 
        : "" }

        </>
    )
}

