/**
 * Recipe page
 */

import { getRecipeById } from '@/pages/api/recipe';

export default async function Page({ params }: { params: { id: string } }) {
    const recipe = await getRecipeById(Number(params.id));
    if (!recipe) {
        return <h1 className="text-2xl">Error! Recipe not found...</h1>;
    }

    return (
        <div className="">
            <h1 className="text-6xl">{recipe.name}</h1>
            <p className="pt-10">{recipe.description}</p>
            <h2 className="text-4xl pt-10">Ingredients</h2>
            <ul className="p-4">
                {recipe.ingredients.map((ingredient, i) => (
                    <li key={`ingredient-${i}`}>
                        {ingredient.ingredient.name}: {ingredient.quantity}
                    </li>
                ))}
            </ul>

            <h2 className=" text-4xl pt-10">Steps</h2>
            <ul className="list-decimal p-4">
                {recipe.method.split('||').map((step, i) => (
                    <li key={`steps-${i}`}>{step}</li>
                ))}
            </ul>
        </div>
    );
}
