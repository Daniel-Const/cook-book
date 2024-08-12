export function AddButton({ text }: { text: string }) {
    return (
        <button className="py-2 px-2 text-l bg-blue-500 hover:bg-blue-300">
            {text}
        </button>
    )
}
