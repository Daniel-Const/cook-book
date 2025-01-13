import { MouseEventHandler } from "react";

export function AddButton({
    text,
    className,
    clickAction
}: {
    text: string;
    className: string;
    clickAction: MouseEventHandler<HTMLElement>;
}) {
    return (
        <button className={`${className} bg-blue-500 hover:bg-blue-300 rounded-full`} onClick={clickAction}>
            {text}
        </button>
    );
}
