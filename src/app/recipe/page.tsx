'use client'

import Link from "next/link"
import { usePathname } from "next/navigation";

import { AddButton } from "@/components/recipe/AddButton";
import RecipeCard from "@/components/recipe/RecipeCard";

export default function Home() {
    // TODO: Get recipes from API to server
    const currentPath = usePathname()
    return (
        <>
            <div className="flex flex-row items-center">
                <div><h1 className="text-5xl">Recipes</h1></div>
                <div className="pl-8">
                    <Link href={`${currentPath}/create`}>
                        <AddButton text="New" />
                    </Link>
                </div>
            </div>
            <div className="z-10 w-full max-w-5xl items-center font-mono text-sm">
                <div className="grid p-2">
                    <RecipeCard
                        title="Ravioli"
                        description="Some yummy ravioli"
                        id="123"
                        imgSrc="123"
                    ></RecipeCard>
                    <RecipeCard
                        title="Spinach and Mushrooms"
                        description="Fresh and delicious!"
                        id="124"
                        imgSrc="124"
                    ></RecipeCard>
                    <RecipeCard
                        title="Greek beans"
                        description="Tasy and healthy!"
                        id="125"
                        imgSrc="125"
                    ></RecipeCard>
                    <RecipeCard
                        title="Penne Pesto"
                        description="Easy and quick"
                        id="126"
                        imgSrc="126"
                    ></RecipeCard>
                </div>
            </div>
        </>
    );
}
