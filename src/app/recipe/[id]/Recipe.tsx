'use client';

import { RecipeData } from '@/pages/api/recipe';
import { useState } from 'react';
import RecipeEdit from '@/components/recipe/RecipeEdit';
import RecipeView from '@/components/recipe/RecipeView';

export default function Recipe({ recipe }: { recipe: RecipeData }) {
    const [isEditing, setIsEditing] = useState(false);

    // TODO: Best way to approach getting recipe from API...
    // After updating recipe does not refresh... Since recipe is obtained in parent

    const onRecipeUpdate = () => {
        setIsEditing(false);
    };

    return (
        <>
            <div>
                {isEditing ? (
                    <RecipeEdit
                        recipe={recipe}
                        onSubmit={() => onRecipeUpdate()}
                    ></RecipeEdit>
                ) : (
                    <RecipeView recipe={recipe} setIsEditing={setIsEditing}></RecipeView>
                )}
            </div>
        </>
    );
}
