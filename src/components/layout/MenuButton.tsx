import Link from 'next/link';

export function MenuButton({
    children,
    link
}: Readonly<{ children: React.ReactNode; link: string }>) {
    return (
        <Link href={link}>
            <button className="bg-blue-500 rounded-full px-2 py-2 mr-4">
                {children}
            </button>
        </Link>
    );
}
