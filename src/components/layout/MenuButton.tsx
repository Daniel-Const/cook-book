import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function MenuButton({
    children,
    link
}: Readonly<{ children: React.ReactNode; link: string }>) {
    const router = useRouter();

    return (
        <Link href={link}>
            <button className="bg-blue-500 rounded-full px-2">{children}</button>
        </Link>
    );
}
