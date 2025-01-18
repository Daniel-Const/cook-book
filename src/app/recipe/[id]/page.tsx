/**
 * Recipe page
 */

import { getRecipeById } from '@/pages/api/recipe';
import RecipeView from '@/components/recipe/RecipeView';

export default async function Page({ params }: { params: { id: string } }) {
    const recipe = await getRecipeById(Number(params.id));
    if (!recipe) {
        return <h1 className="text-2xl">Error! Recipe not found...</h1>;
    }

    return (
        <div className="">
            <RecipeView recipe={recipe}></RecipeView>
        </div>
    );
}
