'use client'

import { useRouter } from 'next/navigation'

export function BackButton() {

    const router = useRouter();

    return (
        <button className="bg-blue-500 rounded-full px-4" onClick={() => router.back()}>Back</button>
    )
}
