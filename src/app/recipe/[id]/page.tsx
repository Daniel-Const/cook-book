/**
 * Recipe page
 */

import { getRecipeById } from '@/pages/api/recipe';
import Recipe from './Recipe';

export default async function Page({ params }: { params: { id: string } }) {
    const fetchRecipe = async (id: number) => {
        return await getRecipeById(id);
    };

    let recipe = await fetchRecipe(Number(params.id));

    if (!recipe) {
        return <h1 className="text-2xl">Error! Recipe not found...</h1>;
    }

    return (
        <div className="">
            <Recipe recipe={recipe}></Recipe>
        </div>
    );
}
