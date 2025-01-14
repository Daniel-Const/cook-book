import RecipeDashboard from '@/components/recipe/RecipeDashboard';
import { getRecipes } from '@/pages/api/recipe';

export default async function Home() {
    const recipes = await getRecipes();

    return (
        <>
            <RecipeDashboard recipes={recipes} />
        </>
    );
}
