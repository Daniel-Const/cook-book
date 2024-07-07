import { useState } from "react"

export default function ListInput() {

    const [inputs, setInputs] = useState(["1"])

    function extendList() {
        setInputs((currInputs) => [
            ...currInputs,
            (currInputs.length + 1).toString()
        ])
    }

    return (
        <>
            <ul>
                {inputs.map((key, index) => (
                    <li key={index}>
                        <div className="pb-2">
                            <input className="pl-2 text-black" type="text" name={"list-" + index} id={key} placeholder={key} />
                        </div>
                    </li>
                ))}
            </ul>
            <br />
            <button className="rounded-full outline p-2" type="button" onClick={extendList}>Add</button>
        </>
    )
}
