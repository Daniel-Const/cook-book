'use client';

/**
 * Recipe page
 */

export default function Page({ params }: { params: { id: string } }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <div className="grid p-2">
                    <p> You're on the {params.id} recipe</p>
                </div>
            </div>
        </main>
    );
}
