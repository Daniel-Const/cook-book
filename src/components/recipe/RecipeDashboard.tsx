'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import RecipeCard from '@/components/recipe/RecipeCard';
import { Recipe } from '@prisma/client';

export default function RecipeDashboard({ recipes }: { recipes: Recipe[] }) {
    const currentPath = usePathname();
    return (
        <>
            <div className="flex flex-row items-center">
                <div className="text-center">
                    <h1 className="text-5xl">Recipes</h1>
                </div>
                <div className="pl-8">
                    <Link href={`${currentPath}/create`}>
                        <button className="bg-blue-500 hover:bg-blue-300 rounded-full p-2">
                            Add Recipe
                        </button>
                    </Link>
                </div>
            </div>
            <div className="z-10 w-full max-w-5xl items-center font-mono text-sm mt-8">
                <div className="grid p-2">
                    {recipes.map((recipe) => (
                        <RecipeCard
                            id={recipe.id}
                            key={recipe.id}
                            title={recipe.name}
                            description={recipe.description || ''}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
