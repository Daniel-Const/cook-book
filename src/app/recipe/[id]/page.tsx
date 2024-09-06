/**
 * Recipe page
 */

export default function Page({ params }: { params: { id: string } }) {
    // TODO: Fetch recipe from server by id
    const recipe = {
        title: 'Ravioli',
        description:
            'Easy to cook! Simple and effective. Ravioli with some tomato sauce will always be a great option',
        ingredients: ['ravioli-pasta 500g', 'Tomato & Basil Sauce (1 jar)'],
        steps: [
            'Boil a large pot of water',
            'Add a bit of salt',
            'Add raw pasta to the pot',
            'Boil as per instructions',
            'Strain water from pasta',
            'Add pasta back into pot',
            'Pour sauce into pot and stir well'
        ]
    };

    return (
        <div className="">
            <h1 className="text-6xl">{recipe.title}</h1>
            <p className="pt-10">{recipe.description}</p>
            <h2 className="text-4xl pt-10">Ingredients</h2>
            <ul className="p-4">
                {recipe.ingredients.map((ingredient, i) => (
                    <li key={`ingredient-${i}`}>{ingredient}</li>
                ))}
            </ul>

            <h2 className=" text-4xl pt-10">Steps</h2>
            <ul className="list-decimal p-4">
                {recipe.steps.map((steps, i) => (
                    <li key={`steps-${i}`}>{steps}</li>
                ))}
            </ul>
        </div>
    );
}
